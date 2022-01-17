import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { edictItem, executedPerson } from '../classStore';
import { notEmpty, notLessThanSix } from '../validator/customValidator';

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

  templateForm!: FormGroup;
  get edictName(): FormControl {
    return this.templateForm.controls["edictName"] as FormControl;
  }
  get edictDescription(): FormControl {
    return this.templateForm.controls["edictDescription"] as FormControl;
  }
  get edictDaysComplete(): FormControl {
    return this.templateForm.controls["edictDaysComplete"] as FormControl;
  }
  get executorType(): FormControl {
    return this.templateForm.controls["executorType"] as FormControl;
  }
  
  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.templateForm = this.fb.group({
      edictName: [this.templateEdictData.header, [notEmpty, notLessThanSix]],
      edictDescription: [this.templateEdictData.description, [notEmpty]],
      edictDaysComplete: [this.templateEdictData.dayOfComplete, [notEmpty]],
      executorType: [this.templateEdictData.executedPerson, [Validators.required]]
    });

    this.edictName.valueChanges.subscribe((value:string)=> this.changeHeader(value));
    this.edictDescription.valueChanges.subscribe((value:string)=> this.changeDescription(value));
    this.edictDaysComplete.valueChanges.subscribe((value:string)=> this.changeDays(value));
    this.executorType.valueChanges.subscribe((value:string)=> this.selectExecutor(value));
  }  

  // Установка данных при открытии шаблона редактирования
  public openTemplate(templateData: edictItem | null) {
    if(templateData){
      this.templateEdictData = templateData;
      this.setValuesToControl(this.templateEdictData);
    }
    this.cdr.markForCheck();
  }

  private setValuesToControl(templateData: edictItem) {
    this.edictName.setValue(templateData.header);
    this.edictDescription.setValue(templateData.description);
    this.edictDaysComplete.setValue(templateData.dayOfComplete);
    this.executorType.setValue(templateData.executedPerson);
  }

  // Действия кнопок
  closeTemplate() {
    this.isVisibleTemplate = false;
    this.templateForm.reset();
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
  public selectExecutor(executor: string) {
    this.templateEdictData.executedPerson = executor as executedPerson;
  }
}
