import { TestBed } from '@angular/core/testing';

import { ScheduleTransportService } from './schedule-transport.service';

describe('ScheduleTransportService', () => {
  let service: ScheduleTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
