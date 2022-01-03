import { Component, ElementRef, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { fromEvent, interval, Observable, Subscription, timer } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/internal/operators/map';
import { ObjUser } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titleApp = 'lesson1';
  counter = 0;
  isLoad: boolean = true;
  someDate = 1311346453064;
  userReq: ObjUser = { name: 'Richard', gender: 0 }
  users: ObjUser[] = 
  [
    { name: 'Richard', gender: 0 },
    { name: 'Fredd', gender: 0 },
    { name: 'Mika', gender: 1 },
    { name: 'Sara', gender: 1 }
  ]

   @ViewChild('contextMenuComponent', {read: ElementRef/*, static: true*/}) menuComponentTemplate!: ElementRef;

  @ViewChild('title', {read: ElementRef}) title!: ElementRef<HTMLElement>;
  @ViewChild('titleTemp') titleTemp!: TemplateRef<HTMLElement>;
  @ViewChild('containerTemp', {read: ViewContainerRef}) containerTemp!: ViewContainerRef;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoad = true;
    // },3000)
    //this.isLoad = false;
  }
  changeValue(value: 0|1) {
    //console.log(value);
    return value ? "M" : "D";
  }

  @ViewChild('newUser') newUser!: ElementRef;
  o$!: Observable<any>;
  sub1! : Subscription;
  sub2! : Subscription;
  addUser(val: string) {
    this.users.push({
      name: val,
      gender: 1
    });

    this.o$ = fromEvent(this.newUser.nativeElement, 'keyup').pipe(
      debounceTime(2000), // delay(2000)
      map((event: any) => event.target.value.split('') as Array<number>)
    );
    
    //const o$: Observable<any> = of('123', '00', ['1','2']);
    //const o$: Observable<any> = from(['1','2','4']);
    //const o$: Observable<any> = interval(100);
    //const o$: Observable<any> = range(2,10);
    //const o$: Observable<any> = empty();
    //const o$: Observable<any> = throwError('Err');
    
    //const o$: Observable<any> = timer(0,100);
    // this.o$ = fromEvent(this.newUser.nativeElement, 'keyup');
    // this.sub1 = this.o$.subscribe({
    //   next: (value:any) => console.log('Next: ', value),
    //   complete: () => console.log('Complete'),
    //   error: (error: any) => console.log('Error: ', error)
    // });
    // setTimeout(()=> {
    //   this.sub2 =this.o$.subscribe({
    //     next: (value:any) => console.log('Next2: ', value),
    //     complete: () => console.log('Complete2'),
    //     error: (error: any) => console.log('Error2: ', error)
    //   })
    // }, 5000);
  }

  clickUnsub() {
    //this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }

  ngAfterViewInit() {
    //this.isLoad = false;
  }

  onShowParentTemplate() {
    //this.parentComponent.forEach(item => {console.log(item)});
  }

  onShowButtonClick() {
    //this.menuComponent.show({top: 300, left: 300});
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
