import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { LandingComponent } from './shared/components/landing/landing.component';
import { LoanCalculatorComponent } from './shared/components/loan-calculator/loan-calculator.component';
import { StepFormRegisterComponent } from './shared/components/step-form-register/step-form-register.component';
import { InfoPersonComponent } from './shared/components/step-form-register/info-person/info-person.component';
import { FinanceInfoComponent } from './shared/components/step-form-register/finance-info/finance-info.component';
import { DocumentsInfoComponent } from './shared/components/step-form-register/documents-info/documents-info.component';
import { CompanyInfoComponent } from './shared/components/step-form-register/company-info/company-info.component';
import { ReferencesComponent } from './shared/components/step-form-register/references/references.component';
import { StepFormPersonNaturalComponent } from './shared/components/step-form-person-natural/step-form-person-natural.component';
import { CreditCalculatorValidationComponent } from './shared/components/step-form-register/credit-calculator-validation/credit-calculator-validation.component';
import { CompletedApplicationComponent } from './shared/components/completed-application/completed-application.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home/calculator', component: LoanCalculatorComponent },
  { path: 'solicitud-completa', component: CompletedApplicationComponent },
  {
    path: 'solicitud-empresa',
    component: StepFormRegisterComponent,
    children: [
      {
        path: 'info-personal',
        component: InfoPersonComponent
      },
      {
        path: 'info-empresa',
        component: CompanyInfoComponent
      },
      {
        path: 'info-contrato',
        component: FinanceInfoComponent
      },
      {
        path: 'referencias',
        component: ReferencesComponent
      },
      {
        path: 'documentos',
        component: DocumentsInfoComponent
      },
      {
        path: 'revision-simulador',
        component: CreditCalculatorValidationComponent
      }
    ]
  },
  {
    path: 'solicitud-persona-natural', component: StepFormPersonNaturalComponent,
    children: [
      {
        path: 'info-personal',
        component: InfoPersonComponent
      },
      {
        path: 'info-contrato',
        component: FinanceInfoComponent
      },
      {
        path: 'referencias',
        component: ReferencesComponent
      },
      {
        path: 'documentos',
        component: DocumentsInfoComponent
      },
      {
        path: 'revision-simulador',
        component: CreditCalculatorValidationComponent
      }
    ]
  },
  // { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
// export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }); se comenta para probar la rutas
