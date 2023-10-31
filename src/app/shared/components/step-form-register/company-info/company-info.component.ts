import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ApiDropDownService } from 'src/app/services/apiDropDown/drop-down.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  formRegisterInfoEmpresa: FormGroup
  companyTypes: any[];
  idTelephone: any[];
  countryCodes: any[];
  ciiuCodes: any[];
  ejAddress= "Cra 17 N 1032 conjunto residencial aguas torre 1 apto 303 (ejemplo)"
  maxDate: Date;
  invalidDates: Date[];
  optTributar: string;
  monedaExt: string;
  monedaVir: string;
  codePrueba: any;
  companyCiiu: any;
  nameCompany : string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiCompanyService: ApiDropDownService,
    private messageService: MessageService,
    private config: PrimeNGConfig,
    private localStorage : LocalStorageService)
 {

  }

  ngOnInit() {
    this.stepCompanyForm();
    this.disabledInput();
    this.formatEsCalendar();
    this.infoList();
  }

  //Metodo creado para cargar las banderas utilizadas en el indicativo telefonico
  getFlagClass(code: string): string {
      return `flag-icon flag-icon-${code.toLowerCase()}`;
  }

  //Metodo para darle formato en español al calendario
  formatEsCalendar() {
    this.config.setTranslation({
        firstDayOfWeek: 1,
        dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        dayNamesMin: [ "D","L","M","X","J","V","S" ],
        monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
        today: 'Hoy',
  });

    let today = new Date();
    this.maxDate = new Date();

    let invalidDate = new Date();
    for (let i = 0; i < 13; i++) {
      invalidDate.setDate(today.getDate() + i);
      this.invalidDates = [today, invalidDate];
    }

  }

  //Metodo para cargar listas del services
  infoList() {

    this.idTelephone = [
      { name: '601', },
      { name: '602', },
      { name: '603', },
      { name: '604', },
      { name: '605', },
      { name: '606', },
      { name: '607', },
      { name: '608', },
    ];

    this.apiCompanyService.getCompanyType().subscribe({
      next: companyTypeData => {
        this.companyTypes = companyTypeData;
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al consultar los tipos de empresa',
          detail: error
        });
      }
    });

    this.apiCompanyService.getCountryCodes().subscribe({
      next: countryCodesData => {
        this.countryCodes = countryCodesData;
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al consultar los indicativos de los paises',
          detail: error
        });
      }
    });

    this.apiCompanyService.getCiiu() .subscribe({
      next: ciiuData => {
        this.ciiuCodes = ciiuData;
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al consultar los codigo CIIU',
          detail: error
        });
      }
    });

  }

  stepCompanyForm() {
    this.formRegisterInfoEmpresa = this.formBuilder.group({
      companyNit: ['', null],
      nameCompany: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(3)]],
      typeSociety: ['', [Validators.required]],
      codeTelephone: ['', null],
      telephone: ['', null],
      celphoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      addressCompany: ['', [Validators.required]],
      numberPerson: ['', [Validators.required]],
      annualIncome: ['', [Validators.required]],
      annualExpenditures:  ['', [Validators.required]],
      totalAssets:  ['', [Validators.required]],
      totalLiabilities:  ['', [Validators.required]],
      equityTotal:  ['', null],
      constitutionDate:  ['', [Validators.required]],
      companyCiiu:  ['', null],
    });

    this.operationsPatrimonio();
    this.nitInfoPerson();
  }

  backPage(){
    this.router.navigateByUrl('/solicitud-empresa/info-personal');
  }

  /**
   * boton para pasar a la siguiente pagina cuanto el formulario sea valido
   */
  nextPage(){
    if(this.formRegisterInfoEmpresa.valid){
      this.router.navigateByUrl('/solicitud-empresa/info-contrato');
    }

  }

  disabledInput(){
    this.formRegisterInfoEmpresa.controls['equityTotal'].disable();
    this.formRegisterInfoEmpresa.controls['companyNit'].disable();
  }

  /**
   * Metodo que setea el valor del nit desde el localStorage
   */
  nitInfoPerson(){
    const nit = this.localStorage.getItem('NIT');
    this.formRegisterInfoEmpresa.get('companyNit')?.setValue(nit);
  }

  operationsPatrimonio(){
    this.formRegisterInfoEmpresa.valueChanges.subscribe((formData) => {
      const diferencia =this.formRegisterInfoEmpresa.get('totalAssets')?.value - this.formRegisterInfoEmpresa.get('totalLiabilities')?.value;;
      this.formRegisterInfoEmpresa.get('equityTotal')?.setValue(diferencia, { emitEvent: false });
    });

  }

  /**
   * Metodo que obtiene el campo seleccionado en el dropdowm
   * @param control
   * @returns
   */
  selectedOptionLabelName(control: any){
    const selectedOption = this.formRegisterInfoEmpresa.get(control)?.value;
    return selectedOption.name
  }

  sendDataCompany() {
    if (this.formRegisterInfoEmpresa.valid) {
      const dataToSend = {
        companyNit: this.localStorage.getItem('NIT'),
        nameCompany: this.formRegisterInfoEmpresa.get('nameCompany')?.value,
        TypeSociety: this.selectedOptionLabelName('typeSociety'),
        codeTelephone: this.selectedOptionLabelName('codeTelephone'),
        telephone: this.formRegisterInfoEmpresa.get('telephone')?.value,
        codeCellPhone: this.codePrueba?.dial_code,
        cellPhone: this.formRegisterInfoEmpresa.get('celphoneNumber')?.value,
        companyAddress: this.formRegisterInfoEmpresa.get('addressCompany')?.value,
        numEmployees: this.formRegisterInfoEmpresa.get('numberPerson')?.value,
        annualIncome: this.formRegisterInfoEmpresa.get('annualIncome')?.value,
        annualExpenditures: this.formRegisterInfoEmpresa.get('annualExpenditures')?.value,
        totalAssets: this.formRegisterInfoEmpresa.get('totalAssets')?.value,
        totalLiabilities: this.formRegisterInfoEmpresa.get('totalLiabilities')?.value,
        equityTotal: this.formRegisterInfoEmpresa.get('equityTotal')?.value,
        constitutionDate: this.formatDate(this.formRegisterInfoEmpresa.get('constitutionDate')?.value),
        companyCiiu: this.companyCiiu?.line
      };

      const nameCompany = this.formRegisterInfoEmpresa.get('nameCompany')?.value ? this.formRegisterInfoEmpresa.get('nameCompany')?.value : null;
      this.localStorage.setItem('nameCompany',  nameCompany);

      this.apiCompanyService.postCompany(dataToSend).subscribe({
        next: response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Información de empresa guardada con éxito',
            detail: response.message
          });

          this.formRegisterInfoEmpresa.reset();
          setTimeout(() => this.router.navigateByUrl('/solicitud-empresa/info-contrato'), 1000);
        },
        error: error => {
          if(error.status === 409){
            this.messageService.add({
              severity: 'error',
              summary: 'Error al insertar datos',
              detail: 'El valor del Nit ya existe en la base de datos'
            });
          }
          if(error.status === 500){
            this.messageService.add({
              severity: 'error',
              summary: 'Error del Sistema',
            });
          }
        }
      });
    }
  }

  formatDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

}
