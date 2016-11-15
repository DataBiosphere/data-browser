/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeywordsService } from './keywords.service';

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
