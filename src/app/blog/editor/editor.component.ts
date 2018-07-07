import { Component, OnInit, OnDestroy, Input, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { tap, mergeMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import slugify from 'slugify';
import { Post, PostPayload, PostService } from '../core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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

  faWarn = faExclamationTriangle;

  initialTitleText: string;
  titleText: string;
  contentText: string;

  private sub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.titleText = this.post ? this.post.title : this.iTitle;
    this.contentText = this.post ? this.post.content : this.iContent;
    this.initialTitleText = this.titleText;

    this.createForm();

    this.sub.add(
      this.titleUpdates().pipe(
        tap(title => this.title.setValue(title)),
        tap(title => !this.post && this.slug.setValue(this.slugify(title))),
      ).subscribe()
    );

    this.sub.add(
      this.contentUpdates().pipe(
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

  private titleUpdates(): Observable<string> {
    let titleEl = this.titleRef.nativeElement;
    return fromEvent(titleEl, 'keyup').pipe(
      tap(() => this.titleText = titleEl.innerText),
      debounceTime(500),  // sensible debounce to reduce server load
      distinctUntilChanged(),
      map(() => titleEl.innerText),
    );
  }

  private contentUpdates(): Observable<string> {
    let contentEl = this.contentRef.nativeElement;
    return fromEvent(contentEl, 'keyup').pipe(
      debounceTime(300),  // reduce markdown rendering frequency
      distinctUntilChanged(),
      map(() => contentEl.value),
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
    this.postService.destroy(this.post.pk).subscribe(
      () => this.router.navigate(['/']),
      (e) => console.log(e),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
