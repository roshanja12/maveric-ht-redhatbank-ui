import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DialogModule } from 'primeng/dialog';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-customer-savings-account',
  templateUrl: './customer-savings-account.component.html',
  styleUrls: ['./customer-savings-account.component.css']
})
export class CustomerSavingsAccountComponent implements OnInit , AfterViewInit{
  @ViewChild('confirmationModal') confirmationModal: any;
  transactions: any;
  dialogIsOpen = false;
  dialogMessage = '';
  isModifyClicked: boolean= true;
  isModalOpen: boolean = false;
  modalService: any;
  constructor(public router: Router, private renderer: Renderer2, private el: ElementRef){

  }
  ngAfterViewInit(): void {
    const dropdownElement = this.el.nativeElement.querySelector('p-dropdown');
    if (dropdownElement) {
      // Apply the 'order: -1;' style to the p-dropdown element
     // this.renderer.setStyle(dropdownElement, 'order', '-1');
     const labelElement = this.renderer.createElement('label');
      const labelText = this.renderer.createText('Show');

      // Apply the 'order: -1;' style to the label element
      this.renderer.setStyle(labelElement, 'order', '-2');
      this.renderer.setStyle(dropdownElement, 'order', '-1');

      // Append the text to the label
      this.renderer.appendChild(labelElement, labelText);

      // Insert the label before the dropdown element
      this.renderer.insertBefore(dropdownElement.parentElement, labelElement, dropdownElement);
    
    }
  }
  ngOnInit(): void {
    this.transactions = [
      {
        date: '2023-01-01',
        description: 'Payment 1',
        amount: 100.00,
        type: 'Deposit',
        balance: 100.00
      },
      {
        date: '2023-01-02',
        description: 'Withdrawal 1',
        amount: -50.00,
        type: 'Withdraw',
        balance: 50.00
      },
      {
        date: '2023-01-03',
        description: 'Payment 2',
        amount: 75.00,
        type: 'Deposit',
        balance: 125.00
      },
      {
        date: '2023-01-04',
        description: 'Withdrawal 2',
        amount: -30.00,
        type: 'Withdraw',
        balance: 95.00
      },
      {
        date: '2023-01-05',
        description: 'Payment 3',
        amount: 120.00,
        type: 'Deposit',
        balance: 215.00
      },
      {
        date: '2023-01-06',
        description: 'Withdrawal 3',
        amount: -40.00,
        type: 'Withdraw',
        balance: 175.00
      },
      {
        date: '2023-01-07',
        description: 'Payment 4',
        amount: 90.00,
        type: 'Deposit',
        balance: 265.00
      },
      {
        date: '2023-01-08',
        description: 'Withdrawal 4',
        amount: -60.00,
        type: 'Withdraw',
        balance: 205.00
      },
      {
        date: '2023-01-09',
        description: 'Payment 5',
        amount: 110.00,
        type: 'Deposit',
        balance: 315.00
      },
      {
        date: '2023-01-10',
        description: 'Withdrawal 5',
        amount: -70.00,
        type: 'Withdraw',
        balance: 245.00
      },
      {
        date: '2023-01-11',
        description: 'Payment 6',
        amount: 80.00,
        type: 'Deposit',
        balance: 325.00
      },
      {
        date: '2023-01-12',
        description: 'Withdrawal 6',
        amount: -40.00,
        type: 'Withdraw',
        balance: 285.00
      },
      {
        date: '2023-01-13',
        description: 'Payment 7',
        amount: 95.00,
        type: 'Deposit',
        balance: 380.00
      },
      {
        date: '2023-01-14',
        description: 'Withdrawal 7',
        amount: -55.00,
        type: 'Withdraw',
        balance: 325.00
      },
      {
        date: '2023-01-15',
        description: 'Payment 8',
        amount: 120.00,
        type: 'Deposit',
        balance: 445.00
      }
    ];
    
  }


  onModify(){
    this.isModifyClicked = !this.isModifyClicked;
  }
  onClose(){

  }
  onBlock(){
    this.router.navigateByUrl('/customer-payment-history');
  }

  routeToSavingsTable(){
    this.router.navigateByUrl('/savings-account');
  }
 
  openConfirmationModal(): void {
    this.isModalOpen = true;
  }


  handleConfirmation(isConfirmed: boolean) {
    // Handle the confirmation result
    if (isConfirmed) {
      // Perform the desired action
     this.isModalOpen = false
    } else {
      this.isModalOpen = false;
    }
   // this.modalService.close();
  }


  

}


