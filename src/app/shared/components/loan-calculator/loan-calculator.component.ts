import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { CreditPlans } from 'src/environments/environment.variables';
import { plans } from 'src/environments/environment.variables'
import { RatesService } from 'src/app/services/apiRates/rates.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent implements OnInit {
  formLoan: FormGroup;
  textInfo: string = ''; // texto informativo que describe el monto del contrato
  textMeses: string = ''; // texto informativo que describe el número de meses del contrato
  textP30: string = ''; // texto informativo que describe el plan de 30 días
  textP60: string = ''; // texto informativo que describe el plan de 60 días
  textP90: string = ''; // texto informativo que describe el plan de 90 días
  textIntFullPay: string = ''; // texto informativo que describe la forma de pago por intereses
  textSimOdds: string = ''; // texto informativo que describe la forma de pago por cuotas iguales
  textCredict: string = ''; // texto informativo que describe el interes de contrato
  textInter: string = ''; // texto informativo que describe la intermediacion
  textAdmin: string = ''; // texto informativo que describe la administracion
  textSure: string = ''; // texto informativo que describe el seguro
  textIvaAdmin: string = ''; // texto informativo que describe el iva de la administracion
  textDisbursement: string = ''; // texto informativo que describe el valor a desembolsar
  planLoan: string = '';
  contract: string = '';
  valueContract: number;
  moneyRequired: number;
  monthContract: number;
  plan1: boolean = true;
  plan2: boolean = false;
  plan3: boolean = false;
  plan1Odds: boolean = false; // Plan por Cuotas Iguales
  plan2Odds: boolean = false; // Plan del Pago por Cuotas Iguales
  plan3Odds: boolean = false; // Plan del Pago por Cuotas Iguales
  valueToFinance: number = 0;
  creditInterest: number = 0;
  monthlyCreditInterest: number;
  intermediation: number = 0;
  administration: number = 0;
  ivaAdministration: number = 0;
  //////////////////////////
  apicreditInterest: number = 0;
  apimonthlyCreditInterest: number;
  apiintermediation: number = 0;
  apiadministration: number = 0;
  apiivaAdministration: number = 0;
  /////////////////////////////
  quotaValue: number = 0;
  disbursementeValue: number = 0; // Valor a desembolsar
  firstPayment: number = 0;
  secondPayment: number = 0;
  thirdPayment: number = 0;
  fourthPayment: number;
  fifthPayment: number;
  secondPaymentOdds: number = 0; // Valor del Pago por Cuotas Iguales
  thirdPaymentOdds: number = 0; // Valor del Pago por Cuotas Iguales
  fourthPaymentOdds: number; // Valor del Pago por Cuotas Iguales
  fifthPaymentOdds: number; // Valor del Pago por Cuotas Iguales
  prueba: number = 0;
  isNaturalPerson: boolean = true; // Rastrear si el usuario es una persona natural
  contractStatus: string = ''; // Rastrear el estado del contrato
  selectedPaymentOption: string = ''; // Default to "Intereses y Valor Completo"
  isSubmitDisabled: boolean = true; // Saber si se debe desactivar el botón de submit
  userType: string = 'Natural'; // Tipo de usuario
  rangeMax: number = 5000000; // Valor máximo, el cual cambiará depediendo del tipo de usuario
  montoMaxim: number = 500000;
  visible: boolean = false; // habilita popup de cliente
  typeClient: string = ''; //resive el tipo de cliente
  visibleOpt2: boolean = false;
  enableOptClient: boolean = false;
  enableOptClientEmp: boolean = false;


  constructor(
    private loanService: LoanService,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private apiRates: RatesService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    ) {

  }

  ngOnInit() {
    this.loanForm();
    this.contract = "500000";
    this.textInfo = "Este valor corresponde al valor total del contrato que tienes firmado con tu cliente o empleado.";
    this.textMeses = "Ingresa el número de meses estipulado para el desarrollo del contrato."
    this.textIntFullPay =  "Pagas los intereses en las primeras cuotas y en la última cancelas el valor total del alivio solicitado.";
    this.textSimOdds = "Pagas mensualmente cuotas del mismo valor, ya incluyen los intereses.";
    this.textP30 = "En este plan te prestamos hasta el 50 % sobre el valor de tu contrato mensual.";
    this.textP60 = "En este plan te prestamos hasta el 60 % sobre el valor de tu contrato mensual.";
    this.textP90 = "En este plan te prestamos hasta el 70 % sobre el valor de tu contrato mensual.";
    this.textCredict = "Este valor es dos puntos por debajo del interés de usura del Banco de la República.";
    this.textInter = "Interés por el proceso de intermediación entre el solicitante y el inversionista.";
    this.textAdmin = "Interés por el proceso de administración.";
    this.textSure = "Seguro contra riesgos financieros.";
    this.textIvaAdmin = "Corresponde al 19% del costo de la administración.";
    this.textDisbursement = "En este se descuenta el valor de la primera cuota, la cual se paga por adelantado en el desembolso.";
    this.disabledInputs();
    this.infoRates();

  }

  loanForm() {
    this.formLoan = this.formBuilder.group({
      amount: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8)])],
      monthContract: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(3)])],
      contractAmount: ['', Validators.compose([Validators.minLength(7), Validators.maxLength(8)])],
    })

  }

  updateMonthContract(value: string) {
    this.monthContract = parseInt(value, 10);
  }

  btnAnterior() {
    this.router.navigateByUrl("/home");
  }


  updateContractvalue() {
    this.formLoan.get('contractAmount')?.setValue(this.prueba);
    this.similarOperations();
  }

  calculatorDayPlan() {
    const tempContract = this.formLoan.get('amount')?.value;
    if(this.formLoan.controls['amount'].touched === false){
      this.moneyRequired = Number(this.dataService.montoCliente);
      this.monthContract = Number(this.monthContract);
    }else {
      this.moneyRequired =  this.formLoan.controls['amount'].value;
      this.monthContract =  this.formLoan.controls['monthContract'].value;
    }
    this.valueContract = Number(tempContract);
    this.validatorsMoney();
  }

  infoRates(){
    this.apiRates.getRates().subscribe(
      (ratesData) => {
        this.apicreditInterest = ratesData.creditInterest;
        this.apimonthlyCreditInterest = ratesData.monthlyCreditInterest;
        this.apiintermediation = ratesData.betweenness;
        this.apiadministration = ratesData.administration;
        this.apiivaAdministration = ratesData.ivaAdministration;
      },
      (error) => {
        console.error('Error fetching rates:', error);
      }
    );
  }

  /**
   * Aqui se realiza las validaciones para verificar el monto maximo
   * donde se verifica si es persona natural o empresa y si esta entre el rango.
   */
  validatorsMoney(){
   //persona natural
    if (this.userType === 'Natural' && this.valueContract >= 1000000) {
      if (this.planLoan === plans.d30) {
        this.plan1 = true;
        this.plan2 = false;
        this.plan3 = false;
        this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p50;
        this.montoMaxim = this.valueToFinance >= 5000000 ? this.valueToFinance = 5000000 : this.valueToFinance;


      } else if (this.planLoan === plans.d60) {
        this.plan2 = true;
        this.plan1 = false;
        this.plan3 = false;
        this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p60;
        this.montoMaxim = this.valueToFinance >= 5000000 ? this.valueToFinance = 5000000 : this.valueToFinance;

      } else if (this.planLoan === plans.d90) {
        this.plan3 = true;
        this.plan1 = false;
        this.plan2 = false;
        this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p75;
        this.montoMaxim = this.valueToFinance >= 5000000 ? this.valueToFinance = 5000000 : this.valueToFinance;

      }

    }

    //Empresa
      if (this.userType === 'Company' && this.valueContract >= 1000000) {
        if (this.planLoan === plans.d30) {
          this.plan1 = true;
          this.plan2 = false;
          this.plan3 = false;
          this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p50;
          this.montoMaxim = this.valueToFinance >= 20000000 ? this.valueToFinance = 20000000 : this.valueToFinance;


        } else if (this.planLoan === plans.d60) {
          this.plan2 = true;
          this.plan1 = false;
          this.plan3 = false;
          this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p60;
          this.montoMaxim = this.valueToFinance >= 20000000 ? this.valueToFinance = 20000000 : this.valueToFinance;

        } else if (this.planLoan === plans.d90) {
          this.plan3 = true;
          this.plan1 = false;
          this.plan2 = false;
          this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p75;
          this.montoMaxim = this.valueToFinance >= 20000000 ? this.valueToFinance = 20000000 : this.valueToFinance;
        }
      }

  }
  similarOperations() {
    //console.log(this.creditInterest, this.monthlyCreditInterest, this.intermediation, this.administration, this.ivaAdministration)
    this.creditInterest = this.prueba * (this.apimonthlyCreditInterest/2);
    this.intermediation = this.prueba * this.apiintermediation;
    this.administration = this.prueba * this.apiadministration;
    this.ivaAdministration = this.administration *this.apiivaAdministration;
    this.quotaValue = this.creditInterest + this.intermediation + this.administration + this.ivaAdministration;
    this.disbursementeValue = this.prueba - this.quotaValue;
    this.firstPayment = this.quotaValue;
    this.secondPayment = this.quotaValue;
    if (this.planLoan === plans.d30) {
      this.secondPayment = this.prueba;
    } else if (this.planLoan === plans.d60) {
      this.secondPayment = this.quotaValue;
      this.thirdPayment = this.prueba;
      //this.fourthPayment = this.test;
    } else if (this.planLoan === plans.d90) {
      this.thirdPayment = this.quotaValue;
      this.fourthPayment = this.prueba;
      //this.fifthPayment = this.test;

    }

     // Manejar el caso de Cuotas Iguales
  if (this.selectedPaymentOption === "SimilarOdds") {
    if (this.planLoan === plans.d60) {
      this.secondPaymentOdds = (this.prueba / 2) + this.quotaValue;
      this.thirdPaymentOdds = (this.prueba / 2);
      //this.fourthPayment = this.test;
    } else if (this.planLoan === plans.d90) {
      this.secondPaymentOdds = (this.prueba / 3) + this.quotaValue;
      this.thirdPaymentOdds = (this.prueba / 3) + this.quotaValue;
      this.fourthPaymentOdds = (this.prueba / 3);
      //this.fifthPayment = this.test;
    }
  }
  }

  disabledInputs(){
    this.formLoan.controls['contractAmount'].disable();
  }

  showPopup(){
    if(this.typeClient === 'natural'){
      this.visible = false;
      this.visibleOpt2 = true;
      this.enableOptClient = true;

    }
     if(this.typeClient === 'juridica'){
      this.visible = false;
      this.visibleOpt2 = true;
      this.enableOptClientEmp = true;

    }

    this.localStorageService.setItem('optClient', this.typeClient);

  }

  confirmDocumentsReq() {
    this.visibleOpt2 = false;
    if (this.typeClient !== 'juridica') {
      setTimeout(() => {
        this.router.navigateByUrl("/solicitud-persona-natural/info-personal");
        this.calcularYEnviarDatos();
      }, 500);
    } else {
      setTimeout(() => {
        this.router.navigateByUrl("/solicitud-empresa/info-personal");
        this.calcularYEnviarDatos();
      }, 500);

    }
  }

  cancelAction() {
    this.visibleOpt2 = false;
    this.router.navigateByUrl("/home");
  }


  send() {
    if (this.contractStatus === 'yes') {
      const value = this.formLoan.value
      this.visible = true;
    }
  }

  calcularYEnviarDatos(){
    const loanData = {
      contractValue: this.moneyRequired, // Valor del contrato
      months: this.monthContract, // Meses
      paymentPlan: this.planLoan, // Plan de pago
      paymentMethod: this.selectedPaymentOption, // Forma de pago
      montoMaxim: this.montoMaxim ? this.montoMaxim : 500000, // Monto maximo
      requiredAmount: this.prueba, // Valor requerido
      loanAmount: this.prueba,
      annualInterestRate: this.creditInterest,
      intermediationFee: this.intermediation,
      administrationFee: this.administration,
      administrationVAT: this.ivaAdministration,
      installmentAmount: this.quotaValue,
      disbursedAmount: this.disbursementeValue,
      firstInstallment: this.firstPayment,
      secondInstallment: this.secondPayment ? this.secondPayment : 0,
      thirdInstallment: this.thirdPayment ? this.thirdPayment : 0,
      fourthInstallment: this.fourthPayment ? this.fourthPayment : 0,
      //Cuotas iguales
      secondPaymentOdds: this.secondPaymentOdds ? this.secondPaymentOdds : 0,
      thirdPaymentOdds: this.thirdPaymentOdds ? this.thirdPaymentOdds : 0,
      fourthPaymentOdds: this.fourthPaymentOdds ? this.fourthPaymentOdds : 0
    };
    this.loanService.setLoanData(loanData);
    console.log('data enviada', loanData)

  }
  // Estado del contrato, dependiendo si tiene un contrato vigente o no
  onContractStatusChange() {
    if (this.contractStatus === 'yes') {
      this.isSubmitDisabled = false;

    } else if (this.contractStatus === 'no') {
      this.isSubmitDisabled = true;
    }
  }



}



