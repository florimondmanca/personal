import {
  Component, OnInit, OnDestroy, Input, Output,
  ElementRef, ViewChild, EventEmitter, ViewContainerRef,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { filter, tap, mergeMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import slugify from 'slugify';
import { Post, PostPayload, PostService } from '../core';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  @Input() post: Post;

  @Output() submitted: EventEmitter<PostPayload> = new EventEmitter();
  @Output() deleted: EventEmitter<void> = new EventEmitter();
  @Output() published: EventEmitter<void> = new EventEmitter();
  @Output() dirty: EventEmitter<void> = new EventEmitter();
  private isDirty = false;

  content: string;

  private sub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    const title = this.post ? this.post.title : '';
    const slug = this.post ? this.post.slug : slugify(title);
    const description = this.post ? this.post.description : '';
    const imageUrl = this.post ? (this.post.imageUrl || '') : '';
    const tags = this.post ? this.post.tags : [];
    this.content = this.post ? this.post.content : '';

    this.createForm(title, slug, description, imageUrl, this.content, tags);

    // Delay updates of slug as it is validated by the server
    this.sub.add(this.formGroup.controls.title.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(title => this.canUpdateSlug && this.slugControl.setValue(this.slugify(title))),
    ).subscribe());

    // Delay updates of content to reduce Markdown rendering frequency
    this.sub.add(this.formGroup.controls.content.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(content => this.content = content),
    ).subscribe());
  }

  @HostListener('window:beforeunload', ['$event'])
  onRefreshOrLeave(event: any) {
    // Ask for confirmation before refreshing (F5) or leaving the website.
    const message = this.isDirty ? 'Discard changes on this post?' : '';
    event.returnValue = message;
    return message;
  }

  private createForm(title: string, slug: string, description: string, imageUrl: string, content: string, tags: string[]) {
    // Regex from: https://www.regextester.com/94502
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.formGroup = this.fb.group({
      title,
      content,
      description,
      image_url: [imageUrl, [Validators.pattern(urlRegex)]],
      slug: [slug, null, this.validateSlugNotTaken.bind(this)],
      tags: [tags],
    });
  }

  get canUpdateSlug(): boolean {
    return !this.post || this.post.isDraft;
  }

  get slugControl() {
    return this.formGroup.controls.slug;
  }

  get contentControl() {
    return this.formGroup.controls.content;
  }

  get tagsControl() {
    return this.formGroup.controls.tags;
  }

  private slugify(s: string): string {
    const slug = slugify(s, { lower: true });
    // Must be 80 characters max (API limitation)
    return slug.substring(0, 80);
  }

  makeDirty() {
    this.dirty.emit();
    this.isDirty = true;
  }

  validateSlugNotTaken(control: AbstractControl) {
    const slug: string = control.value;
    const pk = this.post ? this.post.pk : null;
    return this.postService.slugExists(slug, pk).pipe(
      map((exists: boolean) => exists ? { exists: true } : null),
    );
  }

  submit() {
    this.submitted.emit(this.formGroup.value);
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { post: this.post },
    });
    dialogRef.afterClosed().pipe(
      filter(result => result)
    ).subscribe(
      () => this.deleted.emit()
    );
  }

  publish() {
    this.published.emit();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
