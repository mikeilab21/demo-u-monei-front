import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
//Inicio servicio
import { CargarScriptsService } from '../cargar-scripts.service';
// Fin servicio
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { StyleClassModule } from 'primeng/styleclass';
import { MenubarModule } from 'primeng/menubar';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { StepsModule } from 'primeng/steps';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { MainLandingComponent } from './components/main-landing/main-landing.component';
import { AboutComponent } from './components/about/about.component';
import { EmailService } from '../services/email.service';
import { StepFormRegisterComponent } from './components/step-form-register/step-form-register.component';
import { InfoPersonComponent } from './components/step-form-register/info-person/info-person.component';
import { FinanceInfoComponent } from './components/step-form-register/finance-info/finance-info.component';
import { DocumentsInfoComponent } from './components/step-form-register/documents-info/documents-info.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReferencesComponent } from './components/step-form-register/references/references.component';
import { CompanyInfoComponent } from './components/step-form-register/company-info/company-info.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { LocalStorageService } from '../services/localStorage.service';
import { StepFormPersonNaturalComponent } from './components/step-form-person-natural/step-form-person-natural.component';
import { CreditCalculatorValidationComponent } from './components/step-form-register/credit-calculator-validation/credit-calculator-validation.component';
import { MessageLocalService } from '../services/messageLocal.service';
import { LoanService } from '../services/loan.service';
import { CompletedApplicationComponent } from './components/completed-application/completed-application.component';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { UsersMockService } from '../services/usersMock.service';

@NgModule({
  declarations: [
    LoginComponent,
    LandingComponent,
    LoanCalculatorComponent,
    MainLandingComponent,
    AboutComponent,
    StepFormRegisterComponent,
    InfoPersonComponent,
    FinanceInfoComponent,
    DocumentsInfoComponent,
    ReferencesComponent,
    CompanyInfoComponent,
    StepFormPersonNaturalComponent,
    CreditCalculatorValidationComponent,
    CompletedApplicationComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    ButtonModule,
    ScrollPanelModule,
    StyleClassModule,
    MenubarModule,
    BrowserModule,
    CardModule,
    ReactiveFormsModule,
    DialogModule,
    TooltipModule,
    ToastModule,
    MessagesModule,
    RadioButtonModule,
    FormsModule,
    SpeedDialModule,
    StepsModule,
    ConfirmDialogModule,
    AccordionModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    DividerModule,
    RatingModule,
    FileUploadModule,
    FieldsetModule,
    CheckboxModule,
    SidebarModule,
    MenuModule,
    PanelMenuModule,
    TableModule,
    TagModule
  ],
  exports: [
    LoginComponent,
    LandingComponent,
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

export class SharedModule {}
