import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      title: '',
      content: '',
    });
  }

  get title() {
    return this.formGroup.controls['title'];
  }

  get content() {
    return this.formGroup.controls['content'];
  }

}
