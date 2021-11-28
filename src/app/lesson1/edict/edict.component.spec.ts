import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictComponent } from './edict.component';

describe('EdictComponent', () => {
  let component: EdictComponent;
  let fixture: ComponentFixture<EdictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
