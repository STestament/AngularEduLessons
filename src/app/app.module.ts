import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Lesson1Component } from './lesson1/lesson1.component';
import { EdictComponent } from './lesson1/edict/edict.component';
import { EdictTemplateComponent } from './lesson1/edict-template/edict-template.component';
import { EdictListComponent } from './lesson1/edict-list/edict-list.component';
import { TemplateFormComponent } from './lesson1/template-form/template-form.component';
import { InnerMenuComponent } from './lesson1/inner-menu/inner-menu.component';
import { UppercasetitlePipePipe } from './lessonPipes/uppercasetitle-pipe.pipe';
import { ExecutorTypePipePipe } from './lessonPipes/executor-type-pipe.pipe';
import { StyleTypeDirective } from './lessonDirectives/style-type.directive';
import { UserPermissionDirective } from './lessonDirectives/user-permission.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './lessonServices/http-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExecutorTypeComponent } from './lesson1/executor-type/executor-type.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './lesson1/profile/profile.component';
import { LoginFormComponent } from './lesson1/login-form/login-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects/index';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Lesson1Component,
    EdictComponent,
    EdictTemplateComponent,
    EdictListComponent,
    TemplateFormComponent,
    InnerMenuComponent,
    UppercasetitlePipePipe,
    ExecutorTypePipePipe,
    StyleTypeDirective,
    UserPermissionDirective,
    ExecutorTypeComponent,
    ProfileComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
