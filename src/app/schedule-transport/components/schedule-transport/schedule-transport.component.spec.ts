import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTransportComponent } from './schedule-transport.component';

describe('ScheduleTransportComponent', () => {
  let component: ScheduleTransportComponent;
  let fixture: ComponentFixture<ScheduleTransportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleTransportComponent]
    });
    fixture = TestBed.createComponent(ScheduleTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
