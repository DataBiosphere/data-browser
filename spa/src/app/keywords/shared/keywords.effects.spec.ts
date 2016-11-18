/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KeywordsEffects } from './keywords.effects';

describe('Service: Keywords', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeywordsEffects]
    });
  });

  it('should ...', inject([KeywordsEffects], (service: KeywordsEffects) => {
    expect(service).toBeTruthy();
  }));
});
