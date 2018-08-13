import { NgModule, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { KeyInterceptor, TokenInterceptor } from './core';
import { ErrorInterceptor, ErrorsModule } from './errors';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    LoginComponent,
    AboutComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'florimondmanca-blog' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    FontAwesomeModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      }
    }),
    AppRoutingModule,
    ErrorsModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: KeyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    overlayContainer: OverlayContainer,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
  ) {
    overlayContainer.getContainerElement().classList.add('mat-theme', 'mat-typography');
    const platform = isPlatformBrowser(platformId) ?
    'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
