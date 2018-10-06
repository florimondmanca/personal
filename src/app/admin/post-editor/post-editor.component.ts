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
import { Post, PostPayload, PostService } from 'app/blogging-core';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'app/widgets';


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
  imageUrl: string;
  imageCaption: string;

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
    const content = this.post ? this.post.content : '';
    const description = this.post ? this.post.description : null;
    const imageUrl = this.post ? (this.post.imageUrl || null) : null;
    const imageCaption = this.post ? (this.post.imageCaption || null) : null;
    const tags = this.post ? this.post.tags : [];

    this.content = content;
    this.imageUrl = imageUrl;
    this.imageCaption = imageCaption;

    this.createForm(title, slug, description, imageUrl, imageCaption, this.content, tags);
    this.updateOnChanges();
  }

  private updateOnChanges(): void {
    [
      this.onDelayedUpdate('title', { delay: 500 }).pipe(
        tap(title => this.canUpdateSlug && this.slugControl.setValue(this.slugify(title))),
      ),
      this.onDelayedUpdate('content').pipe(
        tap(content => this.content = content),
      ),
      this.onDelayedUpdate('image_url').pipe(
        tap(imageUrl => this.imageUrl = imageUrl),
      ),
      this.onDelayedUpdate('image_caption').pipe(
        tap(imageCaption => this.imageCaption = imageCaption),
      ),
    ].forEach(observable => this.sub.add(observable.subscribe()));
  }

  private onDelayedUpdate(controlName: string, opts = { delay: 300 }) {
    const control = this.formGroup.controls[controlName];
    return control.valueChanges.pipe(
      debounceTime(opts.delay),
      distinctUntilChanged(),
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  onRefreshOrLeave(event: any) {
    // Ask for confirmation before refreshing (F5) or leaving the website.
    const message = this.isDirty ? 'Discard changes on this post?' : '';
    event.returnValue = message;
    return message;
  }

  private createForm(title: string, slug: string, description: string, imageUrl: string, imageCaption: string, content: string, tags: string[]) {
    // Regex from: https://www.regextester.com/94502
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.formGroup = this.fb.group({
      title,
      content,
      description,
      image_url: [imageUrl, [Validators.pattern(urlRegex)]],
      image_caption: imageCaption,
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

  /** Delete the post being edited. */
  delete() {
    this.onConfirm({
      messages: {
        title: `Delete "${this.post.title}?"`,
        content: 'This cannot be undone.',
        dismiss: 'No, do not delete this post.',
        confirm: 'Yes, delete this post.',
      },
      colors: {
        confirmButton: 'warn',
      },
    }).subscribe(
      () => this.deleted.emit(),
    );
  }

  /** Publish the post being edited. */
  publish() {
    this.onConfirm({
      messages: {
        title: `Publish "${this.post.title}?"`,
        content: 'People and systems subscribed to new posts will be notified.',
        dismiss: 'No, do not publish this post yet.',
        confirm: 'Yes, publish this post.',
      },
      colors: {
        confirmButton: 'accent',
      },
    }).subscribe(
      () => this.published.emit()
    )
  }

  /** Open a confirmation dialog
  @returns Observable that contains an event only if user has confirmed.
  */
  private onConfirm(config: ConfirmDialogConfig): Observable<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: config });
    return dialogRef.afterClosed().pipe(filter(confirm => confirm));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
