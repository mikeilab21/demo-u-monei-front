import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private loanData: any = {};
  private data = new BehaviorSubject(null);

  constructor() {}

  getLoanData(): Observable<any> {
    return this.data.asObservable();
    // return this.loanData;
  }

  setLoanData(data: any) {
    this.data.next(data);
    // this.loanData = data;
  }
}

