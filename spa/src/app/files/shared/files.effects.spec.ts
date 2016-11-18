/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilesEffects } from './files.effects';

describe('Service: Fil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesEffects]
    });
  });

  it('should ...', inject([FilesEffects], (service: FilesEffects) => {
    expect(service).toBeTruthy();
  }));
});
