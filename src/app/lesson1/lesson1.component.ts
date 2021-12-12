import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-lesson1',
  templateUrl: './lesson1.component.html',
  styleUrls: ['./lesson1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Lesson1Component implements OnInit {
  public pageTitle = "Королевские указы для короля Ангуляра"
  ngOnInit(): void {
    
  }
  
  ngDoCheck(): void {
    console.log('Lesson component ngDoCheck');
  } 
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Lesson component ngOnChanges');
  }
  ngOnDestroy(): void {
    console.log('Lesson component ngOnDestroy');
  }
}
