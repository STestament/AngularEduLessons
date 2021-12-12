import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { edictItem } from '../classStore';

@Component({
  selector: 'app-edict',
  templateUrl: './edict.component.html',
  styleUrls: ['./edict.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EdictComponent implements OnInit {
  @Input("singleEdictData") singleEdict!: edictItem;
  @Output() removeEdictFromList: EventEmitter<edictItem> = new EventEmitter();
  @Output() sendTemplateForEdit: EventEmitter<edictItem> = new EventEmitter();
  @Output() setSelectState: EventEmitter<edictItem> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) { }
  public styleColor: string = "green"; 

  ngOnInit(): void {
  }

  checkEdict()
  {
    this.cdr.markForCheck();
  }
  selectEdict($event: Event, edictItem: edictItem)
  {
    edictItem.isSelectEdictState = ($event.target as HTMLInputElement).checked;
    this.setSelectState.emit(edictItem);
  }
  editEdict()
  {
    this.sendTemplateForEdit.emit();
  }
  removeEdict()
  {
    this.removeEdictFromList.emit();
  }
  //
  ngDoCheck(): void {
    console.log('edict ngDoCheck');
  } 
  ngOnChanges(changes: SimpleChanges): void {
    console.log('edict ngOnChanges');
  }
  ngOnDestroy(): void {
    console.log('edict ngOnDestroy');
  }
}
