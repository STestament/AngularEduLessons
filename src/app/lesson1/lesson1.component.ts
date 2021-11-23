import { Component, OnInit } from '@angular/core';

type edictView = {
  id: number,
  header: string,
  description: string,
  dayOfComplete: number,
  state: boolean
}

@Component({
  selector: 'app-lesson1',
  templateUrl: './lesson1.component.html',
  styleUrls: ['./lesson1.component.css']
})
export class Lesson1Component implements OnInit {
  public edicts: edictView[] = 
  [
      { id: 1, header: "Повысить налоги", description: "Мы вынуждены повысить налоги. В ближайшие пару месяцев сбор увеличится на 10%", dayOfComplete: 60, state: false },
      { id: 2, header: "Построить город", description: "Нам нужен новый торговый центр - мы заложим новый город на границе королевства", dayOfComplete: 300, state: false },
      { id: 3, header: "Собрать армию", description: "На нас нападают варвары! Собрать войско со всех земель!", dayOfComplete: 30, state: false},
      { id: 4, header: "Устроить пир", description: "Устраиваем пир в честь заключения мирного договора", dayOfComplete: 20, state: false },
      { id: 5, header: "Устроить турнир", description: "Созвать всех рыцарей! Награда - сундук золота", dayOfComplete: 50, state: false },
  ];
  public styleColor: string = "green";
 
  constructor() { }

  ngOnInit(): void {
    
  }

  getEdictToSetClass(edictItem: edictView)
  {
    return edictItem.state ? "selectedEdict" : 'itemEdict';
  }
  selectEdict($event: Event, edictItem: edictView)
  {
    edictItem.state = ($event.target as HTMLInputElement).checked;
  }
  getStateOfEdict(edictState: boolean) 
  {
    return edictState;
  }
}
