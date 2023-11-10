import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanAccountsModel } from 'src/app/models/loan-account.model';
import { LoanTransactionHistoryModel } from 'src/app/models/loan-transaction-history.model';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';

@Component({
  selector: 'app-customer-payment-history',
  templateUrl: './customer-payment-history.component.html',
  styleUrls: ['./customer-payment-history.component.css'],
})
export class CustomerPaymentHistoryComponent {
  customerId: number = 0;
  customerName: string = 'Illegal Attempt';
  totalBalance: number = 50000;
  page = 2;
  pageSize = 4;
  collectionSize = 1;
  tableColumns: string[] = [];
  visibleColumnElements: string[] = [];
  currentTransactionHistory!: LoanTransactionHistoryModel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loanService: LoanAccountsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.customerId = params['customerId'];
      this.customerName = params['customerName'];

      console.log('Customer ID:', this.customerId);
      console.log('Customer Name:', this.customerName);
    });
    const tableColumns = ['Date', 'Amount', 'Status', 'Balance'];
    this.tableColumns = tableColumns;
    this.visibleColumnElements = [
      'paidAt',
      'amountPaid',
      'paymentStatus',
      'balance',
    ];
    this.getAllTransactionHistory();
  }

  navigateToLoanAccounts() {
    this.router.navigateByUrl('/loan-accounts');
  }

  getAllTransactionHistory() {
    console.log('Started Fetching transaction History');

    this.loanService
      .getTransActionHistoryByLoanId(this.customerId)
      .subscribe((res) => {
        this.currentTransactionHistory = res;
        this.collectionSize = this.currentTransactionHistory.length;
        console.log('Getting All Transaction History');
      });
    console.log('Finished Fetching Transaction History');
  }
}
