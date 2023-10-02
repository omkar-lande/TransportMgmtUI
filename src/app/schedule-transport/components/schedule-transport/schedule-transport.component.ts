import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatusEnum } from 'src/app/status-enum';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { InstructionService } from 'src/app/instruction/instruction-services/instruction.service';
import { Instruction } from 'src/app/models/instruction';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-schedule-transport',
  templateUrl: './schedule-transport.component.html',
  styleUrls: ['./schedule-transport.component.css']
})

export class ScheduleTransportComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() productsChange = new EventEmitter<Product[]>();
  @Input() instruction: any;
  instructionClientName: string = "";
  instructionId?: number;
  totalQuantity: number = 0;
  totalProducts: number = 0;
  initialScheduledDate: Date = new Date();
  toScheduleProducts: any;

  @Input() savedTransporterProducts: any[] = [];
  

  statusOptions: { text: string, value: StatusEnum }[] = [
    { text: 'Pending', value: 0 },
    { text: 'Scheduled', value: 1 },
    { text: 'In Progress', value: 2 },
    { text: 'Delivered', value: 3 },
    { text: 'Invoiced', value: 4 }
  ];

  transporters: { id: number, name: string }[] = [];
  productName: any[] = [];
  dateBoxValue: Date = new Date();
  constructor(private route: ActivatedRoute,
    private instructionService: InstructionService, private router: Router,) {
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.instructionId = params['id'];
      this.toScheduleProducts = this.instruction.Instruction.ProductList.filter((x: any) => x.transporterName == null || x.transporterName == '');
      if (this.instructionId) {
        this.getTransporters();
        this.productName = this.instruction.Instruction.ProductList.map((product: any) => ({
          Product: {
            ProductName: product.productName,
            ProductId: product.productId,
            TransporterName: product.transporterName
          }
        }));

        this.instructionClientName = this.instruction.Instruction.ClientName;
        console.log("get by id got", this.instruction.Instruction.ProductList);
        this.calculateTotalQuantity();
      }
    });
  }

  getTransporters() {
    this.instructionService.getAllTransporters().subscribe((transportersApiResponse: any) => {
      this.transporters = transportersApiResponse;
    });
  }
  onRowUpdated(event: any) {
    const updatedRowData1 = event.data; 
    
    if (!updatedRowData1.ScheduledDate) {
      updatedRowData1.ScheduledDate = new Date();
    }
    this.savedTransporterProducts.push(updatedRowData1);
    // debugger;
  }

  submitDataToBackend(updatedRowData: any) {
    // Prepare the data to be sent to the backend for the updated row
    const dataToSubmit = {
      instructionId: this.instructionId, // Provide the correct instructionId
      transporterProducts: this.savedTransporterProducts.map((selectedProduct) => ({
        instructionProductId: selectedProduct.instructionProductId,
        scheduledDate: selectedProduct.ScheduledDate.toISOString(),
        transporterId: selectedProduct.transporterId,
      })),
    };
    console.log("Data", dataToSubmit);
    this.instructionService.addTransportInstruciton(dataToSubmit).subscribe(
      {
        next: (response) => {
          this.toScheduleProducts = this.toScheduleProducts.filter((x: any) => x.transporterId == null || x.transporterId == '');
          this.productsChange.emit();          
        },
        error: (error) => {
          console.error('Error saving data:', error);
        }
      }
    );
  }
  calculateTotalQuantity() {
    this.totalQuantity = 0;
    this.totalProducts = this.instruction.Instruction.ProductList.length;
    console.log("something should be printed on conlsole ", this.instruction.Instruction.ProductList);

    this.instruction.Instruction.ProductList.forEach((product: any) => {
   
      console.log(product.productQuantity);

      this.totalQuantity += product.productQuantity;
    });
    console.log("total no of products in prod list  here is ", this.instruction.Instruction.ProductList.length)
    console.log("quantity here is ", this.totalQuantity)
    this.instruction.TotalQuantity = this.totalQuantity;
    this.instruction.TotalProducts = this.totalProducts;
    console.log("instruction scheduled product list ", this.instruction.Instruction.ProductList);
  }
  updateInstruction() {
    this.submitDataToBackend(this.savedTransporterProducts);
    console.log("saved data", this.savedTransporterProducts)
    this.instructionService.getAllUpdateInstructionChangeStatus().subscribe(
      (updatedInstructions) => {

        console.log('Updated instructions:', updatedInstructions);
        this.toScheduleProducts = this.toScheduleProducts.filter((x: any) => x.transporterName == null || x.transporterName == '');
        this.productsChange.emit();
      },
      (error) => {
        console.error('Error fetching updated instructions:', error);
      },
    );
  }
  backToInstruction(){
    this.router.navigate(['createInstruction']);
  }
}
