import { Component, ElementRef, ViewChild } from '@angular/core';
import { UploadEvent } from 'ngx-file-drop';
import { ImageUploadService, ClipboardService } from 'app/core';
import { of } from 'rxjs';
import { mergeMap, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html',
  styleUrls: ['./image-upload-dialog.component.scss']
})
export class ImageUploadDialogComponent {

  @ViewChild('imageCodeRef') imageCodeRef: ElementRef;

  file: File;
  imageCode: string;
  uploaded = false;
  uploading = false;

  constructor(
    private imageUploadService: ImageUploadService,
    private clipboard: ClipboardService,
  ) { }

  dropped(event: UploadEvent) {
    this.file = null;
    const file = event.files[0];
    if (file && file.fileEntry.isFile) {
      const fileEntry: any = file.fileEntry;
      fileEntry.file((file: File) => this.file = file);
    }
  }

  get ready(): boolean {
    return !!this.file;
  }

  get fileTableData(): File[] {
    return [this.file].filter(Boolean);
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.file = file;
  }

  clickItem(id: string) {
    document.getElementById(id).click();
  }

  upload() {
    of(this.file).pipe(
      filter(Boolean),  // only if file given
      tap(() => this.uploading = true),
      mergeMap((file: File) => this.imageUploadService.upload(file)),
      tap((imageCode: string) => this.imageCode = imageCode),
      tap(() => this.uploaded = true),
      tap(() => this.uploading = false),
    ).subscribe();
  }

  copy() {
    this.clipboard.copy(this.imageCodeRef);
  }

}
