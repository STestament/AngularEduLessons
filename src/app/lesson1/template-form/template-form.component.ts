import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { edictItem, executedPerson } from '../classStore';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  isVisibleTemplate: boolean = false;
  titleTemplate: string = "";
  constructor() { }
  ngOnInit(): void {
  }
  showTemplateForm(isVisible: boolean, title: string) {
    this.isVisibleTemplate = isVisible;
    this.titleTemplate = title;
  }
  closeTemplate() {
    this.isVisibleTemplate = false;
  }
}
