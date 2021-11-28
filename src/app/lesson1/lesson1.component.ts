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
      { id: 1, header: "Повысить налоги", description: "Мы вынуждены повысить налоги. В ближайшие пару месяцев сбор увеличится на 10%", dayOfComplete: 60, state: false },
      { id: 2, header: "Построить город", description: "Нам нужен новый торговый центр - мы заложим новый город на границе королевства", dayOfComplete: 300, state: false },
      { id: 3, header: "Собрать армию", description: "На нас нападают варвары! Собрать войско со всех земель!", dayOfComplete: 30, state: false},
      { id: 4, header: "Устроить пир", description: "Устраиваем пир в честь заключения мирного договора", dayOfComplete: 20, state: false },
      { id: 5, header: "Устроить турнир", description: "Созвать всех рыцарей! Награда - сундук золота", dayOfComplete: 50, state: false },
  ];
  public stateIndex: number = -1;
  public isEditState: boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }

  removeEdictFromList(edict: edictItem) {
    alert("Удален указ: " + edict.header);
    let indexOfRemovedEdict = this.edicts.indexOf(edict);
    this.edicts.splice(indexOfRemovedEdict, 1); 
  }

  addEdictToList($event: edictItem) {
    let hasEdict = this.edicts.find(item => item.id == $event.id);
    if (hasEdict) {
      let item = this.edicts[$event.id-1];
      alert("Исправлен указ: " + item.header);
      item = $event;
      this.edicts[$event.id-1] = $event;
    } else {
      alert("Добавлен указ: " + $event.header);
      this.edicts.push($event);
    }    
    this.stateIndex = -1;
    this.isEditState = false;
  }
  editEdictInList($event: edictItem) {
    this.stateIndex = $event.id;
    this.isEditState = true;
  }

  addEdict() {
    let edictsLength = this.edicts.length+1;
    this.stateIndex = edictsLength;
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
