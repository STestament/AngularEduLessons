import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { edictItem, executedPerson } from '../classStore';
import { UserType, king, citizen } from '../../users';
import { EdictTemplateComponent } from '../edict-template/edict-template.component';
import { EdictComponent } from '../edict/edict.component';
import { TemplateFormComponent } from '../template-form/template-form.component';
import { EdictsService } from 'src/app/lessonServices/edicts.service';
import { UsersService } from 'src/app/lessonServices/users.service';


@Component({
  selector: 'app-edict-list',
  templateUrl: './edict-list.component.html',
  styleUrls: ['./edict-list.component.css']
})
export class EdictListComponent implements OnInit {
  @ViewChild("templateForm") templateForm!: TemplateFormComponent;
  @ViewChildren("edict") edictList!:QueryList<EdictComponent>
  //
  private login: UserType = king;
  public loginName: string = "Не авторизован";
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

  constructor(private edictService: EdictsService, 
              private usersService: UsersService, 
              private cdr: ChangeDetectorRef) { 
    this.edictService.getEdicts().pipe().subscribe({
      next: (data) => {
        this.edicts = data;
        this.cdr.markForCheck();
      },
      error: (e) => { console.log(e.message); },
      complete: () => { console.log('Success Data'); } 
    });
    // this.usersService.getUser(false).pipe().subscribe({
    //   next: (userData) => {
    //     this.login = userData;
    //     this.loginName = userData.login;
    //   },
    //   error: (e) => { console.log(e.message); },
    //   complete: () => { console.log('Success User'); } 
    // });
  }

  ngOnInit(): void {

  }

  // Установка пользователя
  setKingLogin(isKing: boolean) {
    this.usersService.getUser(isKing).pipe().subscribe({
      next: (userData) => {
        this.login = userData;
        this.loginName = userData.login;
      },
      error: (e) => { console.log(e.message); },
      complete: () => { console.log('Success User'); } 
    });
  };
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
    this.templateEdictItem = {
      id: edict.id, 
      header: edict.header, 
      description: edict.description, 
      dayOfComplete: edict.dayOfComplete, 
      isSelectEdictState: false,
      executedPerson: edict.executedPerson
    }
  }
  openTemplateForAddNewEdict() {
    this.setDefaultTemplateData();
    this.stateIndex = this.getMaxId();
    this.templateEdictItem.id = this.stateIndex;
    this.templateForm.showTemplateForm(true, "Добавить указ");
  }
  getMaxId() {
    let maxId =  this.edicts.length == 0 
      ? 1 
      : this.edicts[this.edicts.length-1].id++;
    return maxId;
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
      //alert("Исправлен указ: " + edict.header);
      //let indexItem = this.edicts.indexOf(edict);
      //this.edicts[indexItem] = $event;
    } else {
      this.edictService.addEdict($event);
      //alert("Добавлен указ: " + $event.header);
      //this.edicts.push($event);
    }
    this.templateForm.closeTemplate();
    this.edictList.forEach(x => x.checkEdict());
    this.setDefaultTemplateData();
  }  
  removeEdictFromList(edict: edictItem) {
    this.edictService.removeEdict(edict);
    // alert("Удален указ: " + edict.header);
    // let indexOfRemovedEdict = this.edicts.indexOf(edict);
    // this.edicts.splice(indexOfRemovedEdict, 1); 
  }
  deleteAllSelectedEdict() {
    let renewEdictList: edictItem[] = [];
    this.edicts.forEach(edict => { 
      if (!edict.isSelectEdictState) {
        renewEdictList.push(edict);
      }
    });
    this.edictService.removeEdictAllSelectedEdict(renewEdictList);
    // this.edicts = renewEdictList;
    this.isAnyEdictSelected = false;
  }
  // Работа с шаблоном
  setDefaultDataAndCloseTemplate() {    
    this.setDefaultTemplateData();
    this.templateForm.closeTemplate();
  }
  // 
  ngDoCheck(): void {
    console.log('Edict list ngDoCheck');
  } 
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Edict list ngOnChanges');
  }
  ngOnDestroy(): void {
    console.log('Edict list ngOnDestroy');
  }
}
