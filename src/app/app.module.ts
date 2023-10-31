import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
// Inicio servicio
import { CargarScriptsService } from '../app/cargar-scripts.service'
//Fin servicio
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CommonModule } from '@angular/common';
import { PRIMENG_MODULES } from './shared/enums/primeng.elements';
import { StyleClassModule } from 'primeng/styleclass';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from './shared/shared.module'
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip'
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { HttpClientModule } from '@angular/common/http';
import { EmailService } from './services/email.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { LocalStorageService } from './services/localStorage.service';
import { MessageLocalService } from './services/messageLocal.service';
import { LoanService } from './services/loan.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { UsersMockService } from './services/usersMock.service';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ButtonModule,
    ScrollPanelModule,
    AppRoutingModule,
    StyleClassModule,
    MenubarModule,
    CardModule,
    ReactiveFormsModule,
    TooltipModule,
    ChartModule,
    ToastModule,
    MessagesModule,
    RadioButtonModule,
    ConfirmDialogModule,
    AccordionModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    DividerModule,
    RatingModule,
    DialogModule,
    FileUploadModule,
    FieldsetModule,
    CheckboxModule,
    SidebarModule,
    MenuModule,
    PanelMenuModule,
    TableModule,
    TagModule
   // ...PRIMENG_MODULES
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    CargarScriptsService,
    MessageService,
    ConfirmationService,
    EmailService,
    LocalStorageService,
    MessageLocalService,
    LoanService,
    UsersMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
