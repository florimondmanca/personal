import {
  Component, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth';
import { SidenavService } from 'app/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post, SeoService } from 'app/blogging-core';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: Post;
  canEdit: boolean;
  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private seo: SeoService,
    private sidenavService: SidenavService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      map(data => data.post),
      tap((post) => this.post = post),
      tap(() => this.cd.markForCheck()),
      tap(() => this.seo.setUp(this.post)),
    ).subscribe();
    this.sub.add(this.auth.getUser().pipe(
      tap((user) => this.canEdit = user.permissions.canEditPost),
      tap(() => this.cd.markForCheck()),
    ).subscribe());
    // Close sidenav on opening post detail
    this.sidenavService.sidenav.close();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.seo.tearDown();
  }

}
