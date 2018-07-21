import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ImageUploadDialogComponent } from '../image-upload-dialog/image-upload-dialog.component';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @Input() mdContent: string;
  @Input() control: FormControl;

  constructor(private dialog: MatDialog) { }

  openUploadDialog() {
    this.dialog.open(ImageUploadDialogComponent, {
      minWidth: '50%',
    });
  }

}
