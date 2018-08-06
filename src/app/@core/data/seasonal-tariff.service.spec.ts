import { TestBed, inject } from '@angular/core/testing';

import { SeasonalTariffService } from './seasonal-tariff.service';

describe('SeasonalTariffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeasonalTariffService]
    });
  });

  it('should be created', inject([SeasonalTariffService], (service: SeasonalTariffService) => {
    expect(service).toBeTruthy();
  }));
});
