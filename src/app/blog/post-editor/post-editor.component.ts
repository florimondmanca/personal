import {
  Component, OnInit, OnDestroy, Input, Output,
  ElementRef, ViewChild, EventEmitter, ViewContainerRef
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
    this.content = this.post ? this.post.content : '';

    this.createForm(title, slug, description, imageUrl, this.content);

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

  private createForm(title: string, slug: string, description: string, imageUrl: string, content: string) {
    const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.formGroup = this.fb.group({
      title,
      content,
      description,
      image_url: [imageUrl, [Validators.pattern(urlRegex)]],
      slug: [slug, null, this.validateSlugNotTaken.bind(this)],
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

  private slugify(s: string): string {
    const slug = slugify(s, { lower: true });
    // 80 characters max
    return slug.substring(0, 80);
  }

  validateSlugNotTaken(control: AbstractControl) {
    const slug: string = control.value;
    const pk = this.post ? this.post.pk : null;
    return this.postService.slugExists(slug, pk).pipe(
      map((exists: boolean) => exists ? { exists: true } : null),
    );
  }

  submit() {
    console.log(this.formGroup.value);
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
