import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictTemplateComponent } from './edict-template.component';

describe('EdictTemplateComponent', () => {
  let component: EdictTemplateComponent;
  let fixture: ComponentFixture<EdictTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdictTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
