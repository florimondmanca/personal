import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { MomentModule } from 'ngx-moment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ErrorStateMatcher, ShowOnDirtyErrorStateMatcher,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { markedOptionsFactory } from './markdown/options';
import { KeyInterceptor, TokenInterceptor, HttpsInterceptor } from './core';
import { AppUpdatesModule } from './app-updates';
import { ErrorInterceptor, ErrorsModule } from './errors';
import { CookieConsentModule } from './cookie-consent';
import { WidgetsModule } from './widgets';
import { ThemingModule } from './theming';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    LoginComponent,
    MainComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'florimondmanca-blog' }),
    BrowserTransferStateModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // required for Angular animations
    MomentModule,
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
    AppRoutingModule,
    ErrorsModule,
    CookieConsentModule,
    AppUpdatesModule,
    WidgetsModule,
    ThemingModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    // Service worker
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: KeyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('mat-theme', 'mat-typography');
  }
}
