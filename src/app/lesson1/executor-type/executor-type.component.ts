import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { executedPerson } from '../classStore';

@Component({
  selector: 'app-executor-type',
  templateUrl: './executor-type.component.html',
  styleUrls: ['./executor-type.component.css'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,    
    useExisting: ExecutorTypeComponent,
    multi:true
  }]
})
export class ExecutorTypeComponent implements OnInit, ControlValueAccessor {
  public radioButtonDataSource: typeof executedPerson = executedPerson;
  public selectedExecutor: executedPerson = executedPerson.Unassigned;
  private OnFormChange!: (_val: executedPerson) => {}
  private OnFormTouched!: () => {}

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(newsType: executedPerson): void {
    this.selectedExecutor = newsType;
  }

  registerOnChange(fn: any): void {
    this.OnFormChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.OnFormTouched = fn;
  }

  onBlur(){
    this.OnFormTouched();
  }

  public selectExecutor(executor: string) {
    this.selectedExecutor = executor as executedPerson;
    this.OnFormChange(executor as executedPerson);
  }
}
