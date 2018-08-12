import { Component, OnInit } from '@angular/core';
import { Error } from '../error.model';
import { ErrorService } from '../error.service';


@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent implements OnInit {

  errors: Error[];

  constructor(private errorService: ErrorService) {
    this.errors = [];
  }

  ngOnInit() {
    this.errorService.onError().subscribe(
      error => this.errors.push(error),
    );
  }

  remove(error: Error) {
    this.errors = this.errors.filter(e => e.id !== error.id);
  }

}
