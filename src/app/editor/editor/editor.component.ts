import {
  Component, Input, Output, EventEmitter,
  ViewChild, Inject, PLATFORM_ID, HostListener,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  @Input() imageUrl: string;
  @Input() imageCaption: string;
  @Input() control: FormControl;
  @ViewChild('autosize') autoSize: MatTextareaAutosize;
  @Output() dirty: EventEmitter<void> = new EventEmitter();
  private isDirty = false;
  previewActive = false;
  mobile = false;

  constructor(private dialog: MatDialog, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    // HACK: Force auto resize after some time, otherwise it's not the correct autosize
    const force = true;
    setTimeout(() => this.autoSize.resizeToFitContent(force), 100);
    this.setMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setMobile();
  }

  setMobile() {
    if (isPlatformBrowser(this.platformId)) {
      this.mobile = window.screen.width < 768;
    }
    if (!this.mobile) {
      // Always show preview on desktops
      this.previewActive = true;
    }
  }

  openUploadDialog() {
    this.dialog.open(ImageUploadDialogComponent, {
      minWidth: '50%',
    });
  }

  onTextChange() {
    if (!this.isDirty) {
      this.isDirty = true;
      this.dirty.emit();
    }
  }

  setPreview(active: boolean) {
    this.previewActive = active;
    // Force autoresize again
    this.autoSize.resizeToFitContent(true);
  }

}
