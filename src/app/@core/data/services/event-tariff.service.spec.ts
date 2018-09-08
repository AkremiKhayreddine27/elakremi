import { TestBed, inject } from '@angular/core/testing';

import { EventTariffService } from './event-tariff.service';

describe('EventTariffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventTariffService]
    });
  });

  it('should be created', inject([EventTariffService], (service: EventTariffService) => {
    expect(service).toBeTruthy();
  }));
});
