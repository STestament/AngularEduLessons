import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutorTypeComponent } from './executor-type.component';

describe('ExecutorTypeComponent', () => {
  let component: ExecutorTypeComponent;
  let fixture: ComponentFixture<ExecutorTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutorTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
