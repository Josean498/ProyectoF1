import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorPage } from './motor.page';

describe('MotorPage', () => {
  let component: MotorPage;
  let fixture: ComponentFixture<MotorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
