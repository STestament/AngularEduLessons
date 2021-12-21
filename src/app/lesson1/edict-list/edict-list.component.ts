import { Component, ElementRef, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { edictItem, executedPerson } from '../classStore';
import { UserType, king, citizen } from '../../users';
import { EdictTemplateComponent } from '../edict-template/edict-template.component';
import { EdictComponent } from '../edict/edict.component';
import { TemplateFormComponent } from '../template-form/template-form.component';

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
  public loginName: string = "Король";
  // 
  public stateIndex: number = -1;
  public isEditState: boolean = false;
  public isAnyEdictSelected: boolean = false;
  // Внутреннее меню
  public isVisibleInnerMenu: boolean = false;  
  public xMenu = 0;
  public yMenu = 0;
  // Данные
  public edicts: edictItem[] = 
  [
      { id: 1, header: "Повысить налоги", description: "Мы вынуждены повысить налоги. В ближайшие пару месяцев сбор увеличится на 10%", dayOfComplete: 60, 
        isSelectEdictState: false, dateCreate: new Date(), executedPerson: executedPerson.Advisor },
      { id: 2, header: "Построить город", description: "Нам нужен новый торговый центр - мы заложим новый город на границе королевства", dayOfComplete: 300, 
        isSelectEdictState: false, dateCreate: new Date(), executedPerson: executedPerson.CityBuilder },
      { id: 3, header: "Собрать армию", description: "На нас нападают варвары! Собрать войско со всех земель!", dayOfComplete: 30, 
        isSelectEdictState: false, dateCreate: new Date(), executedPerson: executedPerson.WarChief },
      { id: 4, header: "Устроить пир", description: "Устраиваем пир в честь заключения мирного договора", dayOfComplete: 20, 
        isSelectEdictState: false, dateCreate: new Date(), executedPerson: executedPerson.Advisor },
      { id: 5, header: "Устроить турнир", description: "Созвать всех рыцарей! Награда - сундук золота", dayOfComplete: 50, 
        isSelectEdictState: false, dateCreate: new Date(), executedPerson: executedPerson.Advisor },
  ];  
  public templateEdictItem: edictItem = {
    id: this.stateIndex, 
    header: "", 
    description: "", 
    dayOfComplete: 10, 
    isSelectEdictState: false,
    dateCreate: new Date(),
    executedPerson: executedPerson.Unassigned
  }

  constructor() { }
  ngOnInit(): void {

  }

  // Установка пользователя
  setKingLogin(isKing: boolean) {
    this.login = isKing ? king : citizen;
    this.loginName = isKing ? "Король" : "Горожанин";
  };
  //
  setDefaultTemplateData() {
    this.templateEdictItem = {
      id: -1, 
      header: "", 
      description: "", 
      dayOfComplete: 10, 
      isSelectEdictState: false,
      dateCreate: new Date(),
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
  openTemplateForEdit(edict: edictItem) { // openTemplateForEdit
    this.templateForm.showTemplateForm(true, "Изменить указ");
    this.templateEdictItem = {
      id: edict.id, 
      header: edict.header, 
      description: edict.description, 
      dayOfComplete: edict.dayOfComplete, 
      isSelectEdictState: false,
      dateCreate: edict.dateCreate,
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
      alert("Исправлен указ: " + edict.header);
      let indexItem = this.edicts.indexOf(edict);
      this.edicts[indexItem] = $event;
    } else {
      alert("Добавлен указ: " + $event.header);
      this.edicts.push($event);
    }
    this.templateForm.closeTemplate();
    this.edictList.forEach(x => x.checkEdict());
    this.setDefaultTemplateData();
  }  
  removeEdictFromList(edict: edictItem) {
    alert("Удален указ: " + edict.header);
    let indexOfRemovedEdict = this.edicts.indexOf(edict);
    this.edicts.splice(indexOfRemovedEdict, 1); 
  }
  deleteAllSelectedEdict() {
    let renewEdictList: edictItem[] = [];
    this.edicts.forEach(edict => { 
      if (!edict.isSelectEdictState) {
        renewEdictList.push(edict);
      }
    });
    this.edicts = renewEdictList;
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
