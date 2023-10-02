import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientList } from 'src/app/models/client-list';
import { Instruction, SubInstruction } from 'src/app/models/instruction';
import { InstructionService } from 'src/app/instruction/instruction-services/instruction.service';
import { StatusEnum } from 'src/app/status-enum';
import { Product } from 'src/app/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DxButtonComponent } from 'devextreme-angular';
import { ClientService } from 'src/app/instruction/instruction-services/client.service';
import { ProductInstructionService } from 'src/app/instruction/instruction-services/product-instruction.service';
import { ProductDropdown } from 'src/app/models/product-dropdown';
import { Column } from 'devextreme/ui/tree_list';

@Component({
  selector: 'app-add-instruction',
  templateUrl: './add-instruction.component.html',
  styleUrls: ['./add-instruction.component.css']
})
export class AddInstructionComponent {

  clientNames: ClientList[] = [];
  selectedClientId: number | null = null;
  message: string = 'Cannot add same product again';
  productNames: ProductDropdown[] = [
  ];

  toastVisible: boolean = false;
  toastType: string = 'success'; 
  toastMessage: string = '';
  toastDisplayTime: number = 3000;

  selectedProductId!: number;
  selectedProductName: string | null = null;
  selectedProductDescription: string | null = null;

  showError: boolean = false;

  @ViewChild('submitButton') submitButton!: DxButtonComponent;

  subInstruction: SubInstruction = {
    InstructionId: 0,
    InstructionDate: new Date(),
    ClientName: '',
    PickupAddress: '',
    DeliveryAddress: '',
    ClientId: 0,
    ClientList: new ClientList(0, ''),
    ProductList: [],
  }
  addInstructionRequest: Instruction = {
    Instruction: this.subInstruction,
    BillingId: 0,
    TotalQuantity: 0,
    TotalProducts: 0,
    TotalPrice: 0,
    Status: StatusEnum.Pending,
    ProductCode: 0,
    ProductDescription: '',
  };

  products: Product[] = [];
  constructor(
    private clientService: ClientService,
    private instructionService: InstructionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private productInstructionService: ProductInstructionService
  ) {
    this.subInstruction.ClientList.name = this.addInstructionRequest.Instruction.ClientName;
  }
  ngOnInit(): void {
    this.loadClientNames();
    this.loadProductNames();
    this.setCellValue = this.setCellValue.bind(this);
  }
  loadClientNames() {
    this.clientService.getClientNames().subscribe((clients) => {
      this.clientNames = clients;
      console.log(this.clientNames);
    });
  }
  loadProductNames() {
    this.productInstructionService.getProducts().subscribe((products) => {
      this.productNames = products;
      console.log('Product Names:', this.productNames);
    });
  }

  onProductSelectionChange() {
    const selectedProduct = this.productNames.find(
      (product) => product.productId === Number(this.selectedProductId)
    );
    if (selectedProduct) {
      this.selectedProductDescription = selectedProduct.productDescription;
      this.addInstructionRequest.ProductCode = selectedProduct.productId;
      this.addInstructionRequest.ProductDescription = this.selectedProductDescription;
    }
  }
  showToast(type: string, message: string) {
    this.toastType = type;
    this.toastMessage = message;
    this.toastVisible = true;
    
    setTimeout(() => {
      this.toastVisible = false;
    }, this.toastDisplayTime);
  }
  addInstruction() {
    if (this.isSubmitButtonEnabled()) {
      const productListForApi = this.products.map((product) => ({
        instructionProductId: 0, 
        productId: product.ProductId,
        quantity: product.Quantity,
        instructionId: 0,
        productDescription: product.ProductDescription,
      }));

      const apiRequest = {
        id: 0,
        createdDate: this.addInstructionRequest.Instruction.InstructionDate, 
        clientsId: this.selectedClientId, 
        pickupAddress: this.addInstructionRequest.Instruction.PickupAddress,
        deliveryAddress: this.addInstructionRequest.Instruction.DeliveryAddress,
        status: this.addInstructionRequest.Status,
        productList: productListForApi,
      };
      this.instructionService.addInstruction(apiRequest).subscribe({
        next: (response) => {
          this.showToast('success', 'Instruction Added Successfully');
          alert('Instruction Added Successfully');
          this.router.navigate(['/createInstruction']);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error adding instruction. Please check the data and try again.');
          this.showToast('error', 'Error adding instruction. Please check the data and try again.');
        }
      });
    }
  }


  clearForm() {
    this.addInstructionRequest = {
      Instruction: {
        InstructionId: 0,
        InstructionDate: new Date(),
        ClientName: '',
        PickupAddress: '',
        DeliveryAddress: '',
        ClientId: 0,
        ClientList: {
          id: 0,
          name: ""
        },
        ProductList: [],
      },
      BillingId: 0,
      TotalQuantity: 0,
      TotalProducts: 0,
      TotalPrice: 0,
      Status: StatusEnum.Pending,
      ProductCode: 0,
      ProductDescription: '',
    };
    this.selectedClientId = null;
    this.products = [];
  }

  isSubmitButtonEnabled() {
    const instructionFilled =
      !!this.addInstructionRequest.Instruction.InstructionDate &&
      !!this.selectedClientId &&
      !!this.addInstructionRequest.Instruction.PickupAddress &&
      !!this.addInstructionRequest.Instruction.DeliveryAddress;
    const atLeastOneProductAdded = this.products.length > 0;
    if (!instructionFilled || !atLeastOneProductAdded) {
      this.message = 'Please fill required details to save the intruction';
      this.showError = true;
      return false;
    }
    else{
      this.message = 'Instruction added Successfully';
    } 
    return true;
  }

  onRowInserted(): boolean {
    let checkDuplicate = this.products.reduce((acc: any, curr: any) => { acc[curr.ProductId] = (acc[curr.ProductId] || 0) + 1; return acc; }, {});
    if (Object.values(checkDuplicate).find((x: any) => x > 1)) {
      return false;
    }
    return true;
  }

  setCellValue(this: Column, newData: any, value: number, currentRowData: any) {
    if ((<any>this)['products'].find((x: any) => x.ProductId == value)) {
      (<any>this).message = 'Cannot add same product again';
      (<any>this).showError = true;
      return;
    }
    (<any>this).showError = false;
    newData.ProductDescription = (<any>this)['productNames'].find((x: any) => x.productId == value).productDescription;
    newData.ProductPrice = (<any>this)['productNames'].find((x: any) => x.productId == value).productPrice;
    newData.ProductId = value;
  }

  setQtyCellValue(this: Column, newData: any, value: number, currentRowData: any) {
    newData.ProductDescription = currentRowData.ProductDescription;
    newData.ProductId = currentRowData.ProductId;
    newData.Quantity = value;
  }

  functionCache: any = {};
  validateRange() {
    if (!this.functionCache[`min${1}`])
      this.functionCache[`min${1}`] = (options: any) => {
        return options.value >= 1;
      }
    return this.functionCache[`min${1}`]
  }
}