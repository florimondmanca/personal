import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';


@Component({
  selector: 'app-tags-field',
  templateUrl: './tags-field.component.html',
  styleUrls: ['./tags-field.component.scss']
})
export class TagsFieldComponent {

  // Chips config
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() control: FormControl;
  @Output() change: EventEmitter<void> = new EventEmitter();

  get tags(): string[] {
    return this.control.value || [];
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = (event.value || '').trim();

    // Add the tag
    if (value) {
      this.control.setValue(this.tags.concat(value));
      this.change.emit();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
      this.change.emit();
    }
  }

}
