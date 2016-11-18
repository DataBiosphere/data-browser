/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeywordsDAO } from './keywords.dao';

describe('Service: Keywords', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeywordsDAO]
    });
  });

  it('should ...', inject([KeywordsDAO], (service: KeywordsDAO) => {
    expect(service).toBeTruthy();
  }));
});
