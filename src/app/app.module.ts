import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms'; 
import { ScheduleTransportComponent } from './schedule-transport/components/schedule-transport/schedule-transport.component';
import { InstructionWelComponent } from './instruction/components/instruction-wel/instruction-wel.component';
import { AddInstructionComponent } from './instruction/components/add-instruction/add-instruction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DevExtremeModule, DxTemplateModule , DxDateBoxModule, DxBoxModule} from 'devextreme-angular';
import { DxTextBoxModule, DxAutocompleteModule, DxTextAreaModule, DxNumberBoxModule , DxValidationGroupModule } from 'devextreme-angular';
import { ViewDetailsComponent } from './instruction/components/view-details/view-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxToastModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { ProductGridComponent } from './instruction/components/product-grid/product-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavbarComponent,
    ScheduleTransportComponent,
    InstructionWelComponent,
    AddInstructionComponent,
    ViewDetailsComponent,
    ProductGridComponent,
  ],
  imports: [
    HttpClientModule,   
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule, 
    NgbModule,
    FontAwesomeModule,           
    DevExtremeModule,DxToastModule,DxAutocompleteModule,DxValidationGroupModule,DxTemplateModule,DxDataGridModule,DxButtonModule,DxBoxModule,DxDateBoxModule,DxTextBoxModule,DxTextAreaModule,DxNumberBoxModule
  ],
  providers: [], 
  bootstrap: [AppComponent],
  exports:[NavbarComponent]
})
export class AppModule { }
