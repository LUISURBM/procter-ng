import { TestBed } from '@angular/core/testing';

import { PlaneacionService } from './planeacion.service';

describe('PlaneacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaneacionService = TestBed.get(PlaneacionService);
    expect(service).toBeTruthy();
  });
});
