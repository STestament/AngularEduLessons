import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EdictsService } from 'src/app/lessonServices/edicts.service';
import { edictItem, executedPerson } from '../classStore';
import { notEmpty, notLessThanSix } from '../validator/customValidator';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

type paramsRequest = {
  edictId: number;
};
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
  isVisibleTemplate: boolean = false;
  titleTemplate: string = "";
  private edicts: edictItem[] = []; 
  private edictId: number = -1;
  private unSubscribe: Subject<void> = new Subject();

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
  
  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder,
    private edictsService: EdictsService,
    private route: ActivatedRoute, private router: Router,
    private store: Store<fromStore.State>) { }

  ngOnInit(): void {    
    this.edictsService.getEdictsAsOberverble().pipe(
      takeUntil(this.unSubscribe))
    .subscribe((value) => {
      this.edicts = value;
      this.setDataToTemplateAndSetVisible();
    });
  }  

  ngAfterViewInit() {
    this.route.params.pipe(
        takeUntil(this.unSubscribe)
      ).subscribe((params) => {
        let paramConverted = params as paramsRequest;
        if (paramConverted && paramConverted.edictId) {
          this.edictId = paramConverted.edictId;
          this.titleTemplate = 'Изменить указ';          
        } else {
            this.edictId = -1;
            this.titleTemplate = 'Добавить указ';
        }
        this.setDataToTemplateAndSetVisible();
      }
    );    
  }

  public setDataToTemplateAndSetVisible() {
    if (this.edictId === -1) {
      this.setDefaultTemplateData();
      this.SetFormValue();
      this.isVisibleTemplate = true;
      this.cdr.markForCheck();
    }
    else {
      let edict = this.edicts.find((item) => item.id == this.edictId);
      if (edict) {                
        this.templateEdictData = edict;
        this.SetFormValue();
        this.isVisibleTemplate = true;
        this.cdr.markForCheck();
      }
    }
  }

  public SetFormValue() {
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

  setDefaultTemplateData() {
    this.templateEdictData = {
      id: -1, 
      header: "", 
      description: "", 
      dayOfComplete: 10, 
      isSelectEdictState: false,
      executedPerson: executedPerson.Unassigned
    }
  }

  // Установка данных при открытии шаблона редактирования
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
    if (this.templateEdictData.id == -1) {
      let newIndex = this.edicts[this.edicts.length-1].id;
      this.templateEdictData.id = ++newIndex;
      this.store.dispatch(fromStore.editEdict({editEdict: this.templateEdictData}));
    } else {
      this.store.dispatch(fromStore.editEdict({editEdict: this.templateEdictData}));
    }    
    //this.sendEdictToSave.emit(this.templateEdictData);
  }

  showTemplateForm(isVisible: boolean, title: string) {
    this.isVisibleTemplate = isVisible;
    this.titleTemplate = title;
    this.cdr.markForCheck();
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

  ngOnDestroy() {
    this.unSubscribe.complete();
    this.unSubscribe.unsubscribe();
  }
}
