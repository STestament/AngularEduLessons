import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Lesson1Component } from './lesson1/lesson1.component';
import { EdictComponent } from './lesson1/edict/edict.component';
import { EdictTemplateComponent } from './lesson1/edict-template/edict-template.component';
import { Lesson3pComponent } from './lesson3p/lesson3p.component';
import { Lesson3chComponent } from './lesson3ch/lesson3ch.component';
import { EdictListComponent } from './lesson1/edict-list/edict-list.component';
import { TemplateFormComponent } from './lesson1/template-form/template-form.component';
import { InnerMenuComponent } from './lesson1/inner-menu/inner-menu.component';
import { StylesDirective } from './styles.directive';
import { StructDDirective } from './struct-d.directive';
import { GenPipePipe } from './gen-pipe.pipe';
import { FilterManPipe } from './filter-man.pipe';
import { UppercasetitlePipePipe } from './uppercasetitle-pipe.pipe';
import { ExecutorTypePipePipe } from './executor-type-pipe.pipe';
import { StyleTypeDirective } from './style-type.directive';
import { UserPermissionDirective } from './user-permission.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Lesson1Component,
    EdictComponent,
    EdictTemplateComponent,
    Lesson3pComponent,
    Lesson3chComponent,
    EdictListComponent,
    TemplateFormComponent,
    InnerMenuComponent,
    StylesDirective,
    StructDDirective,
    GenPipePipe,
    FilterManPipe,
    UppercasetitlePipePipe,
    ExecutorTypePipePipe,
    StyleTypeDirective,
    UserPermissionDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
