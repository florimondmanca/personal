import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ErrorStateMatcher, ShowOnDirtyErrorStateMatcher,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatSidenavModule,
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { markedOptionsFactory } from './markdown/options';
import { HttpsInterceptor } from './core';
import { AuthModule } from './auth';
import { AppUpdatesModule } from './app-updates';
import { ErrorInterceptor, ErrorsModule } from './errors';
import { CookieConsentModule } from './cookie-consent';
import { ThemingModule, ThemeService } from './theming';
import { SocialModule } from './social';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavModule } from './nav';
import { CoreModule } from './core';
import { BlogModule } from './blog/blog.module';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NotFoundComponent,
    MainComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'personal' }),
    BrowserTransferStateModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // required for Angular animations
    FontAwesomeModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
      // Deactivate page tracking initially/by default
      developerMode: true,
      ga: {
        anonymizeIp: true,
      },
    }),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      }
    }),
    CoreModule,
    AuthModule,
    BlogModule,
    AppRoutingModule,
    ErrorsModule,
    CookieConsentModule,
    AppUpdatesModule,
    SocialModule,
    NavModule,
    ThemingModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    // Service worker
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private themeService: ThemeService, overlayContainer: OverlayContainer) {
    // Set overlays CSS classes
    const el = overlayContainer.getContainerElement();
    el.classList.add('mat-typography');

    // Update overlay theme when theme changes.
    let currentThemeClass: string;
    this.themeService.getTheme().subscribe(
      (theme) => {
        if (currentThemeClass) {
          el.classList.remove(currentThemeClass);
        }
        const newThemeClass = `mat-${theme}-theme`;
        el.classList.add(newThemeClass);
        currentThemeClass = newThemeClass;
      }
    );
  }
}
