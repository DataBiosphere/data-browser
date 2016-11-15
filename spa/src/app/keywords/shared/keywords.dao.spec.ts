/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeywordsService } from './keywords.dao';

describe('Service: Keywords', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeywordsService]
    });
  });

  it('should ...', inject([KeywordsService], (service: KeywordsService) => {
    expect(service).toBeTruthy();
  }));
});
