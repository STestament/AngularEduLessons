import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, SimpleChanges } from '@angular/core';
import { edictItem, peopleRequest } from './classStore';

@Component({
  selector: 'app-lesson1',
  templateUrl: './lesson1.component.html',
  styleUrls: ['./lesson1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Lesson1Component implements OnInit {
  public edicts: edictItem[] = 
  [
      { id: 1, header: "Повысить налоги", description: "Мы вынуждены повысить налоги. В ближайшие пару месяцев сбор увеличится на 10%", dayOfComplete: 60, isSelectEdictState: false },
      { id: 2, header: "Построить город", description: "Нам нужен новый торговый центр - мы заложим новый город на границе королевства", dayOfComplete: 300, isSelectEdictState: false },
      { id: 3, header: "Собрать армию", description: "На нас нападают варвары! Собрать войско со всех земель!", dayOfComplete: 30, isSelectEdictState: false},
      { id: 4, header: "Устроить пир", description: "Устраиваем пир в честь заключения мирного договора", dayOfComplete: 20, isSelectEdictState: false },
      { id: 5, header: "Устроить турнир", description: "Созвать всех рыцарей! Награда - сундук золота", dayOfComplete: 50, isSelectEdictState: false },
  ];

  public stateIndex: number = -1;
  public isEditState: boolean = false;
  public editTemplateEdictItem = {
    id: this.stateIndex, 
    header: "", 
    description: "", 
    dayOfComplete: 10, 
    isSelectEdictState: false
  } 

  constructor() { }

  ngOnInit(): void {
    
  }

  removeEdictFromList(edict: edictItem) {
    alert("Удален указ: " + edict.header);
    let indexOfRemovedEdict = this.edicts.indexOf(edict);
    this.edicts.splice(indexOfRemovedEdict, 1); 
  }

  addEdictToList($event: edictItem) {
    let edict = this.edicts.find(item => item.id == $event.id);
    if (edict) {
      alert("Исправлен указ: " + edict.header);
      let indexItem = this.edicts.indexOf(edict);
      this.edicts[indexItem] = $event;
    } else {
      alert("Добавлен указ: " + $event.header);
      this.edicts.push($event);
    }    
    this.stateIndex = -1;
    this.isEditState = false;
    this.setDefaultTemplateData();
  }

  editEdictInList(edict: edictItem) {
    this.stateIndex = edict.id;
    this.isEditState = true;
    this.editTemplateEdictItem = {
      id: this.stateIndex, 
      header: edict.header, 
      description: edict.description, 
      dayOfComplete: edict.dayOfComplete, 
      isSelectEdictState: false
    }
  }

  setDefaultTemplateData() {
    this.editTemplateEdictItem = {
      id: -1, 
      header: "", 
      description: "", 
      dayOfComplete: 10, 
      isSelectEdictState: false
    }
  }

  addEdict() {
    this.stateIndex = this.getMaxId();
  }
  getMaxId() {
    let maxId =  this.edicts[this.edicts.length-1].id++;
    return maxId;
  }
  
  ngDoCheck(): void {
    console.log('Main Component ngDoCheck');
  } 
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Main Component ngOnChanges');
  }
  ngOnDestroy(): void {
    console.log('Main Component ngOnDestroy');
  }
}
