import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { ImageUploadService, ClipboardService } from 'app/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html',
  styleUrls: ['./image-upload-dialog.component.scss']
})
export class ImageUploadDialogComponent {

  @ViewChild('imageCodeRef') imageCodeRef: ElementRef;

  files: UploadFile[];
  imageCode: string;
  uploaded = false;

  constructor(
    private imageUploadService: ImageUploadService,
    private snackBar: MatSnackBar,
    private clipboard: ClipboardService,
  ) {
    this.files = [];
  }

  dropped(event: UploadEvent) {
    this.files = event.files;
  }

  upload() {
    const droppedFile = this.files[0];
    if (!droppedFile) {
      // Sanity check
      return;
    }
    if (droppedFile.fileEntry.isFile) {
      const fileEntry: any = droppedFile.fileEntry;
      fileEntry.file((file: File) => {
        // Access the real file
        this.imageUploadService.upload(file).pipe(
          tap((imageCode: string) => this.imageCode = imageCode),
          tap(() => this.uploaded = true)
        ).subscribe();
      });
    }
  }

  copy() {
    this.clipboard.copy(this.imageCodeRef);
  }

}
