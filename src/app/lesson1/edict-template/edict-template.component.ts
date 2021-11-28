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
  @Output() addEdictToList: EventEmitter<edictItem> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addEdict(edict: edictItem) {
    return edict;
  }

  addNewEdict(newHeader: string, newDescription: string, newDays: string) {
    let newEdict: edictItem = {
      id: this.indexEdict,
      header: newHeader,
      description: newDescription,
      dayOfComplete: 1,
      state: false
    }
    this.addEdictToList.emit(newEdict);
  }
}
