import { TestBed } from '@angular/core/testing';

import { UIStateService } from './load-widget.service';

describe('LoadWidgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UIStateService = TestBed.get(UIStateService);
    expect(service).toBeTruthy();
  });
});
