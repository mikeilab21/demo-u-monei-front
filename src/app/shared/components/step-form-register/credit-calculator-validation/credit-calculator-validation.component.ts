import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifiConfirmService } from 'src/app/services/apiNotifications/notifi-confirm.service';
import { RatesService } from 'src/app/services/apiRates/rates.service';
import { RegisterService } from 'src/app/services/apiRegister/register.service';
import { DataService } from 'src/app/services/data.service';
import { LoanService } from 'src/app/services/loan.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { MessageLocalService } from 'src/app/services/messageLocal.service';
import { CreditPlans, plans } from 'src/environments/environment.variables';

@Component({
  selector: 'app-credit-calculator-validation',
  templateUrl: './credit-calculator-validation.component.html',
  styleUrls: ['./credit-calculator-validation.component.css']
})
export class CreditCalculatorValidationComponent implements OnInit{

  formValidCredit: FormGroup;
  planLoan: string = '';
  valueContract: number;
  moneyRequired: number;
  monthContract: number;
  plan1Odds: boolean = false; // Plan por Cuotas Iguales
  plan2Odds: boolean = false; // Plan del Pago por Cuotas Iguales
  plan3Odds: boolean = false; // Plan del Pago por Cuotas Iguales
  valueToFinance: number = 0;
  creditInterest: number;
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
  selectedPaymentOption: string = ''; // Default to "Intereses y Valor Completo"
  isSubmitDisabled: boolean = true; // Saber si se debe desactivar el botón de submit
  userType: string;
  rangeMax: number = 5000000; // Valor máximo, el cual cambiará depediendo del tipo de usuario
  montoMaxim: number = 500000;
  dataLoan: any;
  plan30 = "Plan 30 dias";
  plan60 = "Plan 60 dias";
  plan90 = "Plan 90 dias";
  intereses = "Intereses y valor completo";
  cequal = "Cuotas iguales";
  secondPay : number;
  thirdPay: number;
  fourthPay: number;

  constructor(
    public dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private apiRates: RatesService,
    private messageLocal: MessageLocalService,
    private localStorageService: LocalStorageService,
    private loanService: LoanService,
    private apiRegister: RegisterService,
    private notifyConfirm:  NotifiConfirmService ){
    this.loanValidForm();
    this.userType = this.localStorageService.getItem('optClient');
    this.catchDataLoan();
  }

  ngOnInit(): void {
    this.disabledInputs();
    this.infoRates();

  }

  catchDataLoan(){
    this.loanService.getLoanData().subscribe({
      next: data => {
        this.dataLoan = data
        this.montoMaxim = this.dataLoan.montoMaxim;
        this.valueContract = this.dataLoan.contractValue;
        this.monthContract = this.dataLoan.months;
        this.planLoan = this.dataLoan.paymentPlan;
        this.selectedPaymentOption = this.dataLoan.paymentMethod;
        this.prueba = this.dataLoan.requiredAmount;
        this.creditInterest = this.dataLoan.annualInterestRate;
        this.intermediation = this.dataLoan.intermediationFee;
        this.administration = this.dataLoan.administrationFee;
        this.ivaAdministration = this.dataLoan.administrationVAT;
        this.quotaValue = this.dataLoan.installmentAmount;
        this.disbursementeValue = this.dataLoan.disbursedAmount;
        this.firstPayment = this.dataLoan.firstInstallment;
        this.secondPayment = this.dataLoan.secondInstallment;
        this.thirdPayment = this.dataLoan.thirdInstallment;
        this.fourthPayment = this.dataLoan.fourthInstallment;
        //Cuotas iguales
        this.secondPaymentOdds = this.dataLoan.secondPaymentOdds;
        this.thirdPaymentOdds = this.dataLoan.thirdPaymentOdds;
        this.fourthPaymentOdds = this.dataLoan.fourthPaymentOdds;
        this.dataNotModify();
      }
    });
  }

  dataNotModify(){
    this.formValidCredit.get('amount')?.setValue(this.valueContract);
    this.formValidCredit.get('monthContract')?.setValue(this.monthContract);

    if(this.planLoan === plans.d30){
      this.formValidCredit.get('chosenPlan')?.setValue(this.plan30);
    }
    if(this.planLoan === plans.d60){
      this.formValidCredit.get('chosenPlan')?.setValue(this.plan60);
    }
    if(this.planLoan === plans.d90){
      this.formValidCredit.get('chosenPlan')?.setValue(this.plan90);
    }
    if(this.selectedPaymentOption === 'InterestValue'){
      this.formValidCredit.get('paymentMethod')?.setValue(this.intereses);
    }
    if(this.selectedPaymentOption === 'SimilarOdds'){
      this.formValidCredit.get('paymentMethod')?.setValue(this.cequal);
    }
    this.formValidCredit.get('requiredAmount')?.setValue(this.prueba);

  }

  loanValidForm() {
    this.formValidCredit = this.formBuilder.group({
      amount: ['', null],
      monthContract: ['', null],
      chosenPlan: ['', null],
      paymentMethod: ['', null],
      requiredAmount: ['', null],
      valueToFinance: ['', null],
      interestRateEA: ['', null],
      intermediation: ['', null],
      administration: ['', null],
      administrationVAT: ['', null],
      installmentValue: ['', null],
      disbursedValue: ['', null],
      firstInstallment: ['', null],
      secondInstallment: ['', null],
      thirdInstallment: ['', null],
      fourthPaymentCredit: ['', null]
    })

  }


  updateContractvalue() {
    this.formValidCredit.get('requiredAmount')?.setValue(this.prueba);
    this.formValidCredit.get('valueToFinance')?.setValue(this.prueba);
    this.similarOperations();
  }

  updateMonthContract(value: string) {
    this.monthContract = parseInt(value, 10);
  }



  btnAnterior() {
    this.router.navigateByUrl("/home");
  }


  calculatorDayPlan() {
    this.validatorsMoney();
  }

  infoRates(){
    this.apiRates.getRates().subscribe({
      next:(ratesData)=>{
      this.apicreditInterest = ratesData.creditInterest;
      this.apimonthlyCreditInterest = ratesData.monthlyCreditInterest;
      this.apiintermediation = ratesData.betweenness;
      this.apiadministration = ratesData.administration;
      this.apiivaAdministration = ratesData.ivaAdministration;
      }, error: e=> {
        this.messageLocal.mesagge('error', 'Error al consultar el servicio de tasas de interes')
      }
    });

  }

   /**
   * Aqui se realiza las validaciones para verificar el monto maximo
   * donde se verifica si es persona natural o empresa y si esta entre el rango.
   */
   validatorsMoney(){
    //persona natural
     if (this.userType === 'natural' && this.valueContract >= 1000000) {
       if (this.planLoan === plans.d30) {
         this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p50;
         this.montoMaxim = this.valueToFinance >= 5000000 ? this.valueToFinance = 5000000 : this.valueToFinance;

       } else if (this.planLoan === plans.d60) {
         this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p60;
         this.montoMaxim = this.valueToFinance >= 5000000 ? this.valueToFinance = 5000000 : this.valueToFinance;

       } else if (this.planLoan === plans.d90) {
         this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p75;
         this.montoMaxim = this.valueToFinance >= 5000000 ? this.valueToFinance = 5000000 : this.valueToFinance;

       }

     }

     //Empresa
       if (this.userType === 'empresa' && this.valueContract >= 1000000) {
         if (this.planLoan === plans.d30) {
           this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p50;
           this.montoMaxim = this.valueToFinance >= 20000000 ? this.valueToFinance = 20000000 : this.valueToFinance;

         } else if (this.planLoan === plans.d60) {
           this.valueToFinance = (this.valueContract/this.monthContract) * CreditPlans.p60;
           this.montoMaxim = this.valueToFinance >= 20000000 ? this.valueToFinance = 20000000 : this.valueToFinance;

         } else if (this.planLoan === plans.d90) {
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
    this.formValidCredit.controls['amount'].disable();
    this.formValidCredit.controls['monthContract'].disable();
    this.formValidCredit.controls['requiredAmount'].disable();
    this.formValidCredit.controls['paymentMethod'].disable();
    this.formValidCredit.controls['chosenPlan'].disable();
  }



  send() {
      if(this.formValidCredit.get('paymentMethod')?.value === 'Cuotas iguales'){
        this.secondPay = this.secondPaymentOdds;
        this.thirdPay  = this.thirdPaymentOdds;
        this.fourthPayment = this.fourthPaymentOdds;
      }else{
        this.secondPay = this.secondPayment;
        this.thirdPay = this.thirdPayment;
        this.fourthPay = this.thirdPayment;
      }
      if(this.formValidCredit.valid){

        const numberId = this.localStorageService.getItem('CC');
        const person = this.localStorageService.getItem('optClient');
        const mail = this.localStorageService.getItem('Email');
        const data = {
          customerId: numberId,
          person_type: person,
          amount : this.valueContract,
          monthContract: this.monthContract,
          chosenPlan : this.planLoan,
          paymentMethod : this.selectedPaymentOption,
          requiredAmount : this.formValidCredit.get('requiredAmount')?.value,
          valueToFinance : this.prueba,
          interestRateEA : this.creditInterest,
          intermediation : this.intermediation,
          administration : this.administration,
          administrationVAT : this.ivaAdministration,
          installmentValue : this.quotaValue,
          disbursedValue : this.disbursementeValue,
          firstInstallment : this.firstPayment,
          secondInstallment : this.secondPay,
          thirdInstallment : this.thirdPay,
          fourthPaymentCredit : this.fourthPay,
        }

        const mailData = {
          email: mail
        }
        this.notifyConfirm.postData(mailData).subscribe({next: resp=>{
        }, error: e=>{
          this.messageLocal.mesagge('error', 'Ocurrio un error al enviar la notificación al correo')
        }})

        this.apiRegister.posDataCalculatorInfo(data).subscribe({next: data => {
          this.messageLocal.mesagge('success', 'Información guardada con exito', data.message);
          this.router.navigateByUrl("/solicitud-completa");

        }, error: e=>{
          this.messageLocal.mesagge('error', 'Ocurrio un error al guardar la información')
        }})

      }
  }
}
