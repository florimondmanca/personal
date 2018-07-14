import {
  Component, OnInit, OnDestroy, Input, Output,
  ElementRef, ViewChild, EventEmitter, ViewContainerRef
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { filter, tap, mergeMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import slugify from 'slugify';
import { Post, PostPayload, PostService } from '../core';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  @Input() post: Post;

  @Output() submitted: EventEmitter<PostPayload> = new EventEmitter();
  @Output() deleted: EventEmitter<void> = new EventEmitter();
  @Output() published: EventEmitter<void> = new EventEmitter();

  faWarn = faExclamationTriangle;

  contentText: string;

  private sub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    const title = this.post ? this.post.title : '';
    this.contentText = this.post ? this.post.content : '';

    this.createForm(title, this.contentText);

    // Delay updates of slug as it is validated by the server
    this.sub.add(this.formGroup.controls.title.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(title => !this.post && this.slug.setValue(this.slugify(title))),
    ).subscribe());

    // Delay updates of content to reduce Markdown rendering frequency
    this.sub.add(this.formGroup.controls.content.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(content => this.contentText = content),
    ).subscribe());
  }

  private createForm(title: string, content: string) {
    this.formGroup = this.fb.group({
      title: title,
      content: content,
      slug: [this.slugify(title), null, this.validateSlugNotTaken.bind(this)],
    });
  }

  get title() {
    return this.formGroup.controls.title;
  }

  get slug() {
    return this.formGroup.controls.slug;
  }

  get content() {
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
