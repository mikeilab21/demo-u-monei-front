import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiDropDownService } from 'src/app/services/apiDropDown/drop-down.service';
import {  RegisterService } from 'src/app/services/apiRegister/register.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
@Component({
  selector: 'app-finance-info',
  templateUrl: './finance-info.component.html',
  styleUrls: ['./finance-info.component.css']
})
export class FinanceInfoComponent implements OnInit {


  formRegisterFinance: FormGroup;
  typesContract: any[];
  typeClient: string;
  nit: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private apiDropdowm: ApiDropDownService
    ){
      this.typeClient = this.localStorageService.getItem('optClient');
    }

  ngOnInit() {
    this.stepContractForm();
    this.infoList();
  }

  infoList() {
    this.apiDropdowm.getContractType().subscribe({
      next: contract => {
        this.typesContract = contract;
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al consultar los tipos de contrato',
          detail: error
        });
      }
    });
  }

  stepContractForm(){
    this.formRegisterFinance = this.formBuilder.group({
      nameEntity: ['', [Validators.required]],
      typeContract: ['', [Validators.required]],
      contractPeriod: ['', [Validators.required]],
      fullContractValue: ['', [Validators.required]],
      contractSupervisorName: ['', [Validators.required]],
      contractSupervisorPhoneNumber:  ['', [Validators.required]],
      contractSupervisorEmail: ['', [Validators.required, Validators.email]],
    })
  }


  backPage(){
    if(this.typeClient !== 'juridica'){
      this.router.navigateByUrl('/solicitud-persona-natural/info-personal');
    }else {
      this.router.navigateByUrl('/solicitud-empresa/info-empresa');
    }

  }

  /**
   * Metodo para obtener la opcion seleccionada en la lista
   * @param control
   * @returns
   */
  selectedOptionListName(control: any){
    const selectedOption = this.formRegisterFinance.get(control)?.value;
    return selectedOption.name
  }

  sendDataContract(){
    if(this.formRegisterFinance.valid){

      const contractToSend = {
        nit: this.localStorageService.getItem('NIT'),
        contracting_entity_name: this.formRegisterFinance.get('nameEntity')?.value,
        contract_type: this.selectedOptionListName('typeContract'),
        duration_months: this.formRegisterFinance.get('contractPeriod')?.value,
        total_contract_value: this.formRegisterFinance.get('fullContractValue')?.value,
        supervisor_name: this.formRegisterFinance.get('contractSupervisorName')?.value,
        supervisor_phone: this.formRegisterFinance.get('contractSupervisorPhoneNumber')?.value,
        supervisor_email: this.formRegisterFinance.get('contractSupervisorEmail')?.value,
      }


      this.registerService.postDataContract(contractToSend).subscribe({
        next: response => {

          this.messageService.add({
            severity: 'success',
            summary: 'Información del contrato guardada con éxito',
            detail: response.message
          });

          if(this.typeClient != 'juridica'){
            this.formRegisterFinance.reset();
            setTimeout(() => this.router.navigateByUrl('/solicitud-persona-natural/referencias'), 500);
          }else {
            this.formRegisterFinance.reset();
            setTimeout(() => this.router.navigateByUrl('/solicitud-empresa/referencias'), 500);
          }

        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error del Sistema',
            detail: 'Error al insertar datos' + error
          });
        }
      });
    }
  }
}
