import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogLayoutService } from 'app/blogging-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {

  public isHome: boolean = false;
  private sub: Subscription;

  constructor(private blogLayoutService: BlogLayoutService) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.blogLayoutService.isHome$.subscribe(
      (isHome: boolean) => this.isHome = isHome
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
