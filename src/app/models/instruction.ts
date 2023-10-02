import { ClientList } from "./client-list";
import { Product } from "./product";
import { StatusEnum } from "../status-enum";
export interface Instruction {
    Instruction: SubInstruction,
    BillingId: number;
    TotalQuantity: number;
    TotalProducts:number; 
    TotalPrice:number;
    Status: StatusEnum;
    ProductCode: number;  
    ProductDescription: string;  
}

export interface SubInstruction {
    InstructionId: number;
    InstructionDate: Date; 
    ClientName: string;
    PickupAddress: string;
    DeliveryAddress: string;
    ClientId: number;
    ClientList: ClientList; 
    ProductList: Product[];
}