import { Component } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { ImageUploadService } from 'app/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html',
  styleUrls: ['./image-upload-dialog.component.scss']
})
export class ImageUploadDialogComponent {

  files: UploadFile[];
  imageCode: string;
  uploaded = false;

  constructor(private imageUploadService: ImageUploadService) {
    this.files = [];
  }

  dropped(event: UploadEvent) {
    this.files = event.files;
    console.log(this.files);
  }

  upload() {
    const droppedFile = this.files[0];
    if (!droppedFile) {
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

}
