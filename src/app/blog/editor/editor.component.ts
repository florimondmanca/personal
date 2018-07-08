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
  @Input('title') iTitle = '';
  @Input('content') iContent = '';

  @ViewChild('titleEl') titleRef: ElementRef;
  @ViewChild('contentEl') contentRef: ElementRef;

  @Output() submitted: EventEmitter<PostPayload> = new EventEmitter();
  @Output() deleted: EventEmitter<void> = new EventEmitter();

  faWarn = faExclamationTriangle;

  initialTitleText: string;
  titleText: string;
  contentText: string;

  private sub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.titleText = this.post ? this.post.title : this.iTitle;
    this.contentText = this.post ? this.post.content : this.iContent;
    this.initialTitleText = this.titleText;

    this.createForm();

    this.sub.add(
      this.inputUpdates(this.titleRef, 500).pipe(
        tap(title => this.title.setValue(title)),
        tap(title => !this.post && this.slug.setValue(this.slugify(title))),
      ).subscribe()
    );

    this.sub.add(
      this.inputUpdates(this.titleRef).pipe(
        tap(title => this.titleText = title),
      ).subscribe()
    );

    this.sub.add(
      this.inputUpdates(this.contentRef, 300).pipe(
        tap((text: string) => this.contentText = text),
      ).subscribe()
    );
  }

  private createForm() {
    this.formGroup = this.fb.group({
      title: this.titleText,
      content: this.contentText,
      slug: [this.slugify(this.titleText), Validators.required, this.validateSlugNotTaken.bind(this)],
    });
  }

  private inputUpdates(ref: ElementRef, debounce?: number): Observable<string> {
    const element = ref.nativeElement;
    return fromEvent(element, 'keyup').pipe(
      debounceTime(debounce || 0),
      distinctUntilChanged(),
      map(() => element.innerText),
    )
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
    return slugify(s, { lower: true });
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
