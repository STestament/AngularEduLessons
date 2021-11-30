import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { edictItem } from '../classStore';

@Component({
  selector: 'app-edict-template',
  templateUrl: './edict-template.component.html',
  styleUrls: ['./edict-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EdictTemplateComponent implements OnInit {
  @Input("indexEdictData") indexEdict!: number;
  @Input("stateEdictData") stateEdictTemplate!: boolean;
  @Input("edictTemplateData") editTemplateEdictItem!: edictItem;
  @Output() addEdictToList: EventEmitter<edictItem> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addNewEdict(newHeader: string, newDescription: string, newDays: string) {
    let newEdict: edictItem = {
      id: this.indexEdict,
      header: newHeader,
      description: newDescription,
      dayOfComplete: +newDays,
      isSelectEdictState: false
    }
    this.addEdictToList.emit(newEdict);
  }
}
