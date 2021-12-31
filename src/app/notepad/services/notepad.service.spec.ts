import { TestBed } from '@angular/core/testing';

import { NotePadService } from './notepad.service';

describe('NotePadService', () => {
  let service: NotePadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotePadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
