import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/apiRegister/register.service';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-info-person',
  templateUrl: './info-person.component.html',
  styleUrls: ['./info-person.component.css']
})
export class InfoPersonComponent implements OnInit {
  formRegisterPersonal: FormGroup;
  personType: string;
  disabledNit = true;
  checkTerm: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: RegisterService,
    private messageService: MessageService,
    private router: Router,
    private localStorageService: LocalStorageService,) {
    this.personType = this.localStorageService.getItem('optClient');
  }

  ngOnInit() {
    this.stepPersonalForm();
    if (this.personType === 'natural') {
      this.removeNitRequiredValidator();
      this.disabledNit = false;
    }

  }

  validTerminos() {
    this.checkTerm = true;
  }
  stepPersonalForm() {

    this.formRegisterPersonal = this.formBuilder.group({
      nameUser: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(3)]],
      identification: ['', [Validators.required, Validators.minLength(10)]],
      nit: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(3)]],
      address: ['', [Validators.required]],
      celphoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      acceptTerm: ['', [Validators.required]],
    })
  }

  removeNitRequiredValidator() {
    this.formRegisterPersonal.get('nit')?.clearValidators(); // Remueve el validador
    this.formRegisterPersonal.get('nit')?.updateValueAndValidity(); // Actualiza la validación
  }
  sendDataPersonal() {
    if (this.formRegisterPersonal.valid) {
      const dataToSend = {
        nameUser: this.formRegisterPersonal.get('nameUser')?.value,
        identification: this.formRegisterPersonal.get('identification')?.value,
        nit: this.formRegisterPersonal.get('nit')?.value ? this.formRegisterPersonal.get('nit')?.value : null,
        city: this.formRegisterPersonal.get('city')?.value,
        address: this.formRegisterPersonal.get('address')?.value,
        celphoneNumber: this.formRegisterPersonal.get('celphoneNumber')?.value,
        email: this.formRegisterPersonal.get('email')?.value,
        personType: this.personType
      }

      const cc = this.formRegisterPersonal.get('identification')?.value ? this.formRegisterPersonal.get('identification')?.value : null;
      const nit = this.formRegisterPersonal.get('nit')?.value ? this.formRegisterPersonal.get('nit')?.value : null;
      const nameUser = this.formRegisterPersonal.get('nameUser')?.value ? this.formRegisterPersonal.get('nameUser')?.value : null;
      const email = this.formRegisterPersonal.get('email')?.value ? this.formRegisterPersonal.get('email')?.value : null;

      this.localStorageService.setItem('CC', cc);
      this.localStorageService.setItem('NIT', nit);
      this.localStorageService.setItem('NameClient', nameUser);
      this.localStorageService.setItem('Email', email);;

      this.apiService.postData(dataToSend).subscribe({
        next: response => {

          this.messageService.add({
            severity: 'success',
            summary: 'Información personal guardada con éxito',
            detail: response.message
          });

          if (this.personType != 'juridica') {
            this.formRegisterPersonal.reset();
            setTimeout(() => this.router.navigateByUrl('/solicitud-persona-natural/info-contrato'), 500);
          } else {
            this.formRegisterPersonal.reset();
            setTimeout(() => this.router.navigateByUrl('/solicitud-empresa/info-empresa'), 500);
          }


        },
        error: error => {
          if (error.status === 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error del Sistema',
              detail: 'El correo electrónico ya está en uso.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error del Sistema',
              detail: 'Error al insertar datos'
            });
          }
        }
      });
    }
  }
}
