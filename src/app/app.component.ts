import { Component, ElementRef, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Lesson3chComponent } from './lesson3ch/lesson3ch.component';
import { Lesson3pComponent } from './lesson3p/lesson3p.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'lesson1';
  isLoad: boolean = true;

  @ViewChild('contextMenuComponent', {read: Lesson3chComponent}) menuComponent!: Lesson3chComponent;
  @ViewChild('contextMenuComponent', {read: ElementRef/*, static: true*/}) menuComponentTemplate!: ElementRef;

  @ViewChild('title', {read: ElementRef}) title!: ElementRef<HTMLElement>;
  @ViewChild('titleTemp') titleTemp!: TemplateRef<HTMLElement>;
  @ViewChild('containerTemp', {read: ViewContainerRef}) containerTemp!: ViewContainerRef;
  @ViewChildren(Lesson3pComponent) parentComponent!: QueryList<Lesson3pComponent>;
  

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoad = true;
    // },3000)
    this.isLoad = false;
  }

  ngAfterViewInit() {
    //this.isLoad = false;
  }

  onShowParentTemplate() {
    this.parentComponent.forEach(item => {console.log(item)});
  }

  onShowButtonClick() {
    this.menuComponent.show({top: 300, left: 300});
    console.log(this.menuComponentTemplate); 
  }

  constructor(private renderer: Renderer2, private viewContainerRef: ViewContainerRef) {

  }

  isShow = true;
  onShowTemplate() {
    if (this.isShow) {
      this.viewContainerRef.createEmbeddedView(this.titleTemp);
      this.containerTemp.createEmbeddedView(this.titleTemp);
    } else {
      this.viewContainerRef.clear();
      this.containerTemp.clear();
    }
    this.isShow = !this.isShow;
  }

  onChangeColor(){
    let bColor = this.title.nativeElement.style.background;
    let text = "NewWOrder";


    switch(bColor) {
      case "yellowgreen": bColor = "red"; break;
      case "red": bColor = "yellowgreen"; break;
    }
    this.renderer.setStyle(this.title.nativeElement, 'background', bColor);
    this.renderer.setProperty(this.title.nativeElement, 'innerHTML', text + ' ' + bColor);
  }

}
