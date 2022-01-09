import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { edictItem, executedPerson } from '../classStore';
import { EdictComponent } from '../edict/edict.component';
import { TemplateFormComponent } from '../template-form/template-form.component';
import { EdictsService } from 'src/app/lessonServices/edicts.service';
import { UsersService } from 'src/app/lessonServices/users.service';
import { Subject, takeUntil } from 'rxjs';
import { EdictTemplateComponent } from '../edict-template/edict-template.component';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs';
import { map } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edict-list',
  templateUrl: './edict-list.component.html',
  styleUrls: ['./edict-list.component.css']
})
export class EdictListComponent implements OnInit {
  @ViewChild("templateForm") templateForm!: TemplateFormComponent;
  @ViewChild("templateEdict") templateEdict!: EdictTemplateComponent;
  @ViewChildren("edict") edictList!:QueryList<EdictComponent>;
  @ViewChild("inputFilter") inputFilter!: ElementRef
  //
  public loginName: string = "";
  public isHasPermission: boolean = false;
  // 
  public stateIndex: number = -1;
  public isEditState: boolean = false;
  public isAnyEdictSelected: boolean = false;
  // Внутреннее меню
  public isVisibleInnerMenu: boolean = false;  
  public xMenu = 0;
  public yMenu = 0;
  // Данные
  public edicts: edictItem[] = [];
  public templateEdictItem: edictItem = {
    id: this.stateIndex, 
    header: "", 
    description: "", 
    dayOfComplete: 10, 
    isSelectEdictState: false,
    executedPerson: executedPerson.Unassigned
  }
  // Контрол фильтрации данных
  searchControl!: FormControl;
  searchValue: string = "";
  // наблюдатель для отписки
  private unSubscribe!: Subject<void>

  constructor(private edictService: EdictsService, 
              private userService: UsersService,
              private cdr: ChangeDetectorRef) { 
                this.loginName = this.userService.currentUser?.login;
  }

  ngOnInit(): void {
    this.unSubscribe = new Subject();   
    this.edictService.getEdicts().pipe(
      takeUntil(this.unSubscribe)
    ).subscribe({
      next: (data) => {
        this.edicts = data;
        this.cdr.markForCheck();
      },
      error: (e) => { console.log(e.message); },
      complete: () => { console.log('Данные получены'); } 
    }); 

    this.searchControl = new FormControl(this.searchValue);
    this.searchControl.valueChanges
    .pipe(
      debounceTime(3000),
      distinctUntilChanged((previousValue: string, currentValue: string)=> previousValue === currentValue),
    )
    .subscribe((value) => {
      this.edictService.searchEdicts(value);
    });
  }

  ngAfterViewInit() {
    this.loginName = this.userService.currentUser?.login;
  }

  //
  setKingLogin(login: string) {
    this.loginName = this.userService.currentUser?.login;
    this.cdr.markForCheck();
  }
  //
  setDefaultTemplateData() {
    this.templateEdictItem = {
      id: -1, 
      header: "", 
      description: "", 
      dayOfComplete: 10, 
      isSelectEdictState: false,
      executedPerson: executedPerson.Unassigned
    }
  }
  selectEdict() {  
    this.isAnyEdictSelected = false;
    this.edicts.forEach(edicts => {
      if (edicts.isSelectEdictState) {
        this.isAnyEdictSelected = true;
        return;
      }
    });
  }
  // Работа с модальной формой  
  openTemplateForEdit(edict: edictItem) {
    this.templateForm.showTemplateForm(true, "Изменить указ");
    this.templateEdict.openTemplate(edict);
  }
  openTemplateForAddNewEdict() {
    this.setDefaultTemplateData();
    this.templateEdict.openTemplate(this.templateEdictItem);
    this.templateForm.showTemplateForm(true, "Добавить указ");
  }
  // Операции связанные с контекстным меню
  openInnerMenu(event:any) : boolean {
    var html = document.documentElement;
    var body = document.body;
    var scrollTop = html.scrollTop || body && body.scrollTop || 0;

    this.xMenu=event.clientX;
    this.yMenu=event.clientY + scrollTop;
    this.isVisibleInnerMenu = true;
    return false;
  }
  closeInnerMenu() {
    this.isVisibleInnerMenu = false;
  }
  selectAllEdict() {    
    this.edicts.forEach(edict => {
      edict.isSelectEdictState = true
    });
    this.isAnyEdictSelected = true;
    this.isVisibleInnerMenu = false;
    this.edictList.forEach(x => x.checkEdict());
  }
  // Операции с массивом данным
  saveEdictToList($event: edictItem) {
    let edict = this.edicts.find(item => item.id == $event.id);
    if (edict) {
      this.edictService.updateEdict($event);
    } else {
      this.edictService.addEdict($event);
    }
    this.templateForm.closeTemplate();
    this.edictList.forEach(x => x.checkEdict());
    this.setDefaultTemplateData();
  }  
  removeEdictFromList(edict: edictItem) {
    this.edictService.removeEdict(edict);
  }
  deleteAllSelectedEdict() {
    let renewEdictList: edictItem[] = [];
    this.edicts.forEach(edict => { 
      if (!edict.isSelectEdictState) {
        renewEdictList.push(edict);
      }
    });
    this.edictService.removeEdicts(renewEdictList);
    this.isAnyEdictSelected = false;
  }
  // Работа с шаблоном
  setDefaultDataAndCloseTemplate() {    
    this.setDefaultTemplateData();
    this.templateForm.closeTemplate();
  }
  // 
  ngDoCheck(): void {
    //console.log('Edict list ngDoCheck');
  } 
  ngOnChanges(changes: SimpleChanges): void {
    //console.log('Edict list ngOnChanges');
  }
  ngOnDestroy(): void {
    //console.log('Edict list ngOnDestroy');
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
