import { TestBed } from '@angular/core/testing';

import { ProductInstructionService } from './product-instruction.service';

describe('ProductInstructionService', () => {
  let service: ProductInstructionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInstructionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
