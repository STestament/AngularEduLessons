import { Component, OnInit } from '@angular/core';

type visitor = {
  name: string,
  status: string,
  house?: {
    city: string,
    region: string
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title: string = "Казна";
  public currentGold: number = 100;
  public visitor: visitor = {
    name: 'Иван',
    status: 'крестьянин'   
  };
  public headerClass: string = "color_blue";
  public styleColor: string = "green";
  public sirDecisionStyle: string = "blue";
  public randomGoldValue: number = 1;
  public randomGrainValue: number = 1;
  constructor() { }

  ngOnInit(): void {
    //this.randomColor();
    this.randomGoldValue = this.random();
    this.randomGrainValue = this.random();
  }

  public random(): number {
    return Math.round(Math.random()*100);
  } 
  public randomColor() {
    setTimeout(() => {
      this.headerClass = "color_red";
      setTimeout(() => {
        this.headerClass = "color_blue";  
      }, 3000);
    }, 3000);
  } 
  changeColor(color: string) {
    this.sirDecisionStyle = color;
  } 
  getInputValue($event: Event){
    this.changeColor(($event.target as HTMLInputElement).value)
  }
}
