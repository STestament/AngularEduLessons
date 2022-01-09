import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  isVisibleTemplate: boolean = false;
  titleTemplate: string = "";
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
  }
  showTemplateForm(isVisible: boolean, title: string) {
    this.isVisibleTemplate = isVisible;
    this.titleTemplate = title;
    this.cdr.markForCheck();
  }
  closeTemplate() {
    this.isVisibleTemplate = false;
  }
}
