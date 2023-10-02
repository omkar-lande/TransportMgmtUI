import { Component, OnInit } from '@angular/core';
import { Instruction } from '../../../models/instruction';
import { InstructionService } from 'src/app/instruction/instruction-services/instruction.service';
import { Router } from '@angular/router';
import { faExpand, faEye , faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { StatusEnum } from 'src/app/status-enum';

@Component({
  selector: 'app-instruction-wel',
  templateUrl: './instruction-wel.component.html',
  styleUrls: ['./instruction-wel.component.css']
})
export class InstructionWelComponent  implements OnInit {
  detailsIcon = faEye;
  cellTemplate: any;  
  plusIcon  = faPlusSquare;

  serialNumbers: number[] = [];
  instructions: Instruction[] = [
  ];
 
  constructor(private InstructionService: InstructionService, private router: Router) {  console.log('instruction array',this.instructions); }
  ngOnInit(): void {
    this.InstructionService.getAllInstruction().subscribe({
      next: (apiResponse) => {
        this.instructions = this.InstructionService.transformGetAllApiResponse(apiResponse);
      },
      error: (response) => {
        console.log(response);
      }
    });
    this.serialNumbers = Array.from({ length: this.instructions.length }, (_, i) => i + 1);
  }
  statusOptions: { text: string, value: StatusEnum }[] = [
    { text: 'Pending', value: 0 },
    { text: 'Scheduled', value: 1 },
    { text: 'In Progress', value: 2 },
    { text: 'Delivered', value: 3 },
    { text: 'Invoiced', value: 4 }
  ];
}