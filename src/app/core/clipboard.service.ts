import { Injectable, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ClipboardService {

  private CONFIRM_DURATION_MS = 2000;

  constructor(private snackBar: MatSnackBar) { }

  copy(element: ElementRef) {
    element.nativeElement.select();
    document.execCommand('copy');
    this.confirm('Copied to clipboard! 🎉');
  }

  private confirm(text: string) {
    this.snackBar.open(text, 'OK', { duration: this.CONFIRM_DURATION_MS });
  }
}
