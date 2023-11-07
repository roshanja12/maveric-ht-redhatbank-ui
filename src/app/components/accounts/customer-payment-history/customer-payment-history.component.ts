import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-payment-history',
  templateUrl: './customer-payment-history.component.html',
  styleUrls: ['./customer-payment-history.component.css']
})
export class CustomerPaymentHistoryComponent  implements OnInit {
    transactions: any;
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
          date: '2023-11-06',
          description: 'Example1',
          amount: 100.0,
          type: 'Not Received',
          balance: 99,
        },
        {
          date: '2023-11-06',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        },
        {
          date: '2023-11-05',
          description: 'loan2',
          amount: 101,
          type: 'Received',
          balance: 990,
        }
      ];
    }
    routeToLoanTable(){
      this.router.navigateByUrl('/loan-accounts');
    }

   
}

