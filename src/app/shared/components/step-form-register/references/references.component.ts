import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterService } from 'src/app/services/apiRegister/register.service'
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent {
  formRegisterReferences: FormGroup;
  typeClient: string;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private registerService: RegisterService,
    private router: Router,
    private localStorageService: LocalStorageService) {

    this.typeClient = this.localStorageService.getItem('optClient');
  }


  ngOnInit() {
    this.stepReferenceForm();
  }

  backPage() {
    if(this.typeClient !== 'juridica'){
      this.router.navigateByUrl('/solicitud-persona-natural/info-contrato');
    }else{
      this.router.navigateByUrl('/solicitud-empresa/info-contrato');
    }

  }
  stepReferenceForm() {
    this.formRegisterReferences = this.formBuilder.group({
      nameRefOne: ['', [Validators.required]],
      nameRefTwo: ['', [Validators.required]],
      celphoneRefOne: ['', [Validators.required]],
      emailReference1: ['', [Validators.required]],
      celphoneRefTwo: ['', [Validators.required]],
      emailReference2: ['', [Validators.required]],
    })
  }

  sendDataReferences() {
    let ccStorage = this.localStorageService.getItem('CC') ? this.localStorageService.getItem('CC') : null;
    if (this.formRegisterReferences.valid) {
      const dataToSend = {
        nameReference1: this.formRegisterReferences.get('nameRefOne')?.value,
        nameReference2: this.formRegisterReferences.get('nameRefTwo')?.value,
        cc: ccStorage,
        cellNumberReference1: this.formRegisterReferences.get('celphoneRefOne')?.value,
        emailReference1: this.formRegisterReferences.get('emailReference1')?.value,
        cellNumberReference2: this.formRegisterReferences.get('celphoneRefTwo')?.value,
        emailReference2: this.formRegisterReferences.get('emailReference2')?.value,
      }

      this.registerService.postDataReferences(dataToSend).subscribe({
        next: response => {

          this.messageService.add({
            severity: 'success',
            summary: 'Datos de referencias guardadas con éxito',
            detail: response.message
          });

          if(this.typeClient !== 'juridica'){
            this.formRegisterReferences.reset();
            setTimeout(() => this.router.navigateByUrl('/solicitud-persona-natural/documentos'), 500);
          }else {
            this.formRegisterReferences.reset();
            setTimeout(() => this.router.navigateByUrl('/solicitud-empresa/documentos'), 500);
          }

        },
        error: error => {
          if (error.status === 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error del Sistema',
              detail: 'Datos de angeles financieros, ya existen en la base de datos.'
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
