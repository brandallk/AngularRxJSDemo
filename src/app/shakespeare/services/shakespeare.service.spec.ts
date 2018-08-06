import { TestBed, inject } from '@angular/core/testing';

import { ShakespeareService } from './shakespeare.service';

describe('ShakespeareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShakespeareService]
    });
  });

  it('should be created', inject([ShakespeareService], (service: ShakespeareService) => {
    expect(service).toBeTruthy();
  }));
});
