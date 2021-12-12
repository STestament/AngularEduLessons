import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inner-menu',
  templateUrl: './inner-menu.component.html',
  styleUrls: ['./inner-menu.component.css']
})
export class InnerMenuComponent implements OnInit {
  @Output() selectAllEdict: EventEmitter<void> = new EventEmitter();
  @Input() x = 0;
  @Input() y = 0;
  constructor() { }

  ngOnInit(): void {
  }  

  selectAll() {
    this.selectAllEdict.emit();
  }
}
