import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-step-form-register',
  templateUrl: './step-form-register.component.html',
  styleUrls: ['./step-form-register.component.css']
})
export class StepFormRegisterComponent implements OnInit {
  itemsStep: MenuItem[];
  activeIndex = 1
  constructor() { }

  ngOnInit() {
    this.optionStep();

  }

  optionStep() {
    this.itemsStep = [
      {
        label: 'Personal',
        routerLink: 'info-personal'
      },
      {
        label: 'Empresa',
        routerLink: 'info-empresa'
      },
      {
        label: 'Contrato',
        routerLink: 'info-contrato'
      },
      {
        label: 'Referencias',
        routerLink: 'referencias'
      },
      {
        label: 'Documentos',
        routerLink: 'documentos'
      },
      {
        label: 'Validacion',
        routerLink: 'revision-simulador'
      }
    ];
  }
}
