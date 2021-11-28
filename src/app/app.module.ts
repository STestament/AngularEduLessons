import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Lesson1Component } from './lesson1/lesson1.component';
import { EdictComponent } from './lesson1/edict/edict.component';
import { EdictTemplateComponent } from './lesson1/edict-template/edict-template.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Lesson1Component,
    EdictComponent,
    EdictTemplateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
