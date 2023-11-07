import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-savings-accounts',
  templateUrl: './savings-accounts.component.html',
  styleUrls: ['./savings-accounts.component.css']
})
export class SavingsAccountsComponent {
 

  constructor(public router: Router){
    
  }


  routeToSavingsTable(){
    this.router.navigateByUrl('/customer-savings-account');
  }

}
