import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaPage } from './acerca.page';

describe('AcercaPage', () => {
  let component: AcercaPage;
  let fixture: ComponentFixture<AcercaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcercaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
