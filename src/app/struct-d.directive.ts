import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Lesson3pComponent } from './lesson3p/lesson3p.component';

@Directive({
  selector: '[appStructD]'
})
export class StructDDirective {

  constructor(private template: TemplateRef<any>, private parentComp: Lesson3pComponent) { 
    this.parentComp.chComponentTemplate = this.template;
  }

  ngOnInit() {

    //this.view.createEmbeddedView(this.template);
  }
}
