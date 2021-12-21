import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appStyles]'
})
export class StylesDirective {
  @HostBinding('style.color') divColor!: string;
  @HostListener('click', ['$event']) changeColor(event:any) {
    this.divColor = 'aqua';
    this.clickChange.emit(10);
  }
  @Input('appStyles') startColor: string = 'purple';
  @Output() clickChange = new EventEmitter<number>();
  constructor(private elementRef: ElementRef) { 
    console.log(elementRef);
  }

  ngOnInit() {
    //this.divColor = "red";
    this.divColor = this.startColor;
    setTimeout(() => {
      this.divColor = 'green'
    }, 3000);
  }
}
