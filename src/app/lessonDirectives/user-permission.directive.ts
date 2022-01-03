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
    this.usersService.getUser("king").pipe().subscribe({
      next: (userData) => {
        this.isHasPermission = userData.hasPermissions;
        if (this.isHasPermission) {
          this.view.createEmbeddedView(this.template);       
        } else {
          this.view.clear();     
        }
      },
      error: (e) => { console.log(e.message); },
      complete: () => { console.log('Получен пользователь'); } 
    });    
  }
}
