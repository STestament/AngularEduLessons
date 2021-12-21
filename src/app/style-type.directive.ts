import { Directive, HostBinding, Input } from '@angular/core';
import { edictItem, executedPerson } from './lesson1/classStore';

@Directive({
  selector: '[appStyleType]'
})
export class StyleTypeDirective {
  @HostBinding('style.background-color') backgroundColor: string = "goldenrod";
  @Input('appStyleType') itemType!: string;
  constructor() { }

  ngOnInit() {
    this.backgroundColor = this.setColorByExecutorType(this.itemType);
  }
  setColorByExecutorType(itemType: string) {
    let colorResult = 'goldenrod';
    switch (itemType) {
      case executedPerson.Advisor: colorResult = "green"; break;
      case executedPerson.CityBuilder: colorResult = "gold"; break;
      case executedPerson.Spy: colorResult = "purple"; break;      
      case executedPerson.WarChief: colorResult = "red"; break;
      case executedPerson.Unassigned: colorResult = "goldenrod"; break;
    }
    return colorResult;
  }
}
