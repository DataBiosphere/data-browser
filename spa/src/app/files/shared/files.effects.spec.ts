/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilService } from './files.effects';

describe('Service: Fil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilService]
    });
  });

  it('should ...', inject([FilService], (service: FilService) => {
    expect(service).toBeTruthy();
  }));
});
