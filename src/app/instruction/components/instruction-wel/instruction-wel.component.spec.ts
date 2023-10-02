import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionWelComponent } from './instruction-wel.component';

describe('InstructionWelComponent', () => {
  let component: InstructionWelComponent;
  let fixture: ComponentFixture<InstructionWelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructionWelComponent]
    });
    fixture = TestBed.createComponent(InstructionWelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
