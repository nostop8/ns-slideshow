import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenFormComponent } from './pages/screen-form/screen-form.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ScreenComponent } from './pages/screen/screen.component';
import { TimeLeftPipe } from './pipes/time-left.pipe';
import { MediaComponent } from './components/media/media.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenFormComponent,
    SlideshowComponent,
    ScreenComponent,
    TimeLeftPipe,
    MediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,

    Angular2PromiseButtonModule
      .forRoot({
        spinnerTpl: '<span class="lds-dual-ring"></span>',
        disableBtn: true,
        btnLoadingClass: 'is-loading',
        handleCurrentBtnOnly: false,
      }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
