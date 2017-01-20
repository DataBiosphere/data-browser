/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FileFacetComponent } from './file-facet.component';

describe('FileFacetComponent', () => {
  let component: FileFacetComponent;
  let fixture: ComponentFixture<FileFacetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileFacetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
