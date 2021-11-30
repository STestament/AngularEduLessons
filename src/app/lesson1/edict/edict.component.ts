import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Output() editEdictInList: EventEmitter<edictItem> = new EventEmitter();
  constructor() { }

  public styleColor: string = "green"; 

  ngOnInit(): void {
  }

  selectEdict($event: Event, edictItem: edictItem)
  {
    edictItem.isSelectEdictState = ($event.target as HTMLInputElement).checked;
  }
  editEdict()
  {
    this.editEdictInList.emit();
  }
  removeEdict()
  {
    this.removeEdictFromList.emit();
  }

  //--

  ngDoCheck(): void {
    console.log('Child Component ngDoCheck');
  } 
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child Component ngOnChanges');
  }
  ngOnDestroy(): void {
    console.log('Child Component ngOnDestroy');
  }
}
