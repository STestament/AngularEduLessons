import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { king, citizen, UserType } from './users';

@Directive({
  selector: '[appUserPermission]'
})
export class UserPermissionDirective {
  isHasPermission: boolean = true;
  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) { 
    
  }
  ngOnInit() {
    const login = king;
    if (login.hasPermissions) {
       this.view.createEmbeddedView(this.template);       
    }
  }
}
