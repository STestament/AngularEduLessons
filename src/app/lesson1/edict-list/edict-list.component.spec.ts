import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdictListComponent } from './edict-list.component';

describe('EdictListComponent', () => {
  let component: EdictListComponent;
  let fixture: ComponentFixture<EdictListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdictListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdictListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
