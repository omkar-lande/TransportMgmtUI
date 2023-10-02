import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Instruction } from 'src/app/models/instruction';
import { Product } from 'src/app/models/product';
import { StatusEnum } from 'src/app/status-enum';
@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  @Input() products: any;
  @Output() productsChange = new EventEmitter<any>(); 
 
  ngOnInit(): void {
  }
}
