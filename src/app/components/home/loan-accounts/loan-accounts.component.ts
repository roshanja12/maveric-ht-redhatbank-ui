import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-accounts',
  templateUrl: './loan-accounts.component.html',
  styleUrls: ['./loan-accounts.component.css']
})
export class LoanAccountsComponent {
  constructor(public router: Router){
    
  }


  routeToLoanTable(){
    this.router.navigateByUrl('/customer-payment-history');
  }

}
