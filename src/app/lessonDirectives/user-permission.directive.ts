import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UsersService } from '../lessonServices/users.service';
@Directive({
  selector: '[appUserPermission]'
})
export class UserPermissionDirective {
  @Input('appUserPermission') isHasPermission: boolean = false;
  constructor(private template: TemplateRef<any>, 
              private view: ViewContainerRef,
              private usersService: UsersService) { }

  ngOnInit() {
    let userData = this.usersService.currentUser;
    this.isHasPermission = userData.hasPermissions;
    if (this.isHasPermission) {
      this.view.createEmbeddedView(this.template);       
    } else {
      this.view.clear();     
    }

  }
}
