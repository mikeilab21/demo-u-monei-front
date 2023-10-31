import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-step-form-person-natural',
  templateUrl: './step-form-person-natural.component.html',
  styleUrls: ['./step-form-person-natural.component.css']
})
export class StepFormPersonNaturalComponent {

  itemsStepPersonal: MenuItem[];
  activeIndex = 1
  constructor() { }

  ngOnInit() {
    this.optionStep();

  }

  optionStep() {
    this.itemsStepPersonal = [
      {
        label: 'Personal',
        routerLink: 'info-personal'
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
