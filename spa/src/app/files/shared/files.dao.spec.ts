/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilesDAO } from './files.dao';

describe('FilesDAO: Test it', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesDAO]
    });
  });

  it('should ...', inject([FilesDAO], (service: FilesDAO) => {
    expect(service).toBeTruthy();
  }));
});
