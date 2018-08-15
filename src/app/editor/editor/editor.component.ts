import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatTextareaAutosize } from '@angular/material';
import { ImageUploadDialogComponent } from '../image-upload-dialog/image-upload-dialog.component';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @Input() mdContent: string;
  @Input() control: FormControl;
  @ViewChild('autosize') autoSize: MatTextareaAutosize;
  previewActive = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    // HACK: Force auto resize after some time, otherwise it's not the correct autosize
    setTimeout(() => this.autoSize.resizeToFitContent(true), 100);
  }

  openUploadDialog() {
    this.dialog.open(ImageUploadDialogComponent, {
      minWidth: '50%',
    });
  }

  setPreview(active: boolean) {
    this.previewActive = active;
    // Force autoresize again
    this.autoSize.resizeToFitContent(true);
  }

}
