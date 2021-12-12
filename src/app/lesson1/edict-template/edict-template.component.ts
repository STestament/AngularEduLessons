import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { edictItem, executedPerson } from '../classStore';

@Component({
  selector: 'app-edict-template',
  templateUrl: './edict-template.component.html',
  styleUrls: ['./edict-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EdictTemplateComponent implements OnInit {
  @Input("edictTemplateData") templateEdictData!: edictItem;
  @Output() sendEdictToSave: EventEmitter<edictItem> = new EventEmitter();
  @Output() setDefaultDataAndClose: EventEmitter<void> = new EventEmitter();
  isVisibleTemplate: boolean = true;
  constructor() { }
  ngOnInit(): void {

  }  
  // Действия кнопок
  closeTemplate() {
    this.isVisibleTemplate = false;
    this.setDefaultDataAndClose.emit();
  }
  saveTemplate() {
    this.sendEdictToSave.emit(this.templateEdictData);
  }
  // Установка значений
  public changeHeader = (value: string) => { 
    this.templateEdictData.header = value; 
  }
  public changeDescription = (value: string) => { 
    this.templateEdictData.description = value; 
  }
  public changeDays = (value: string) => { 
    this.templateEdictData.dayOfComplete = +value; 
  }
  public changeDate = (value: string) => { 
    this.templateEdictData.dateCreate = new Date(value); 
  }
  public selectExecutor(executor: string) {
    this.templateEdictData.executedPerson = executor as executedPerson;
  }
}
