import { Component, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';


interface EditorResult {
  title: string;
  content: string;
}


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  formGroup: FormGroup;

  @Input('title') iTitle = 'Type title…';
  @Input('content') iContent = '';

  @ViewChild('title') titleRef: ElementRef;

  @Output() submitted: EventEmitter<EditorResult> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.titleUpdates().subscribe(
      title => this.title.setValue(title),
    )
  }

  private createForm() {
    this.formGroup = this.fb.group({
      title: this.iTitle,
      content: this.iContent,
    });
  }

  private titleUpdates(): Observable<any> {
    let titleEl = this.titleRef.nativeElement;
    return fromEvent(titleEl, 'keyup').pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(() => titleEl.innerText),
    );
  }

  get title() {
    return this.formGroup.controls.title;
  }

  get content() {
    return this.formGroup.controls.content;
  }

  submit() {
    this.submitted.emit(this.formGroup.value);
  }

}
