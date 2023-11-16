import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogData } from 'src/app/models/dialog-data.model';
import { LoanAccountsModel } from 'src/app/models/loan-account.model';
import { LoanTransactionHistoryModel } from 'src/app/models/loan-transaction-history.model';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';
import { DialogErrorSkeletonComponent } from 'src/app/shared/dialogs/dialog-error-skeleton/dialog-error-skeleton.component';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';

@Component({
  selector: 'app-customer-payment-history',
  templateUrl: './customer-payment-history.component.html',
  styleUrls: ['./customer-payment-history.component.css'],
})
export class CustomerPaymentHistoryComponent {
  customerId: number = 0;
  customerName: string = 'Illegal Attempt';
  totalBalance: number = 0;
  account: number = 0;
  page = 2;
  pageSize = 4;
  collectionSize = 1;
  tableColumns: string[] = [];
  visibleColumnElements: string[] = [];
  currentTransactionHistory!: LoanTransactionHistoryModel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loanService: LoanAccountsService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.customerId = params['customerId'];
      this.customerName = params['customerName'];
      this.totalBalance = params['loanAmt'];
      this.account = params['account'];

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
  submitRepayment(data: string) {
    let body = {
      amount: data,
      accountId: this.account,
    };
    console.log('submitted' + body);
    this.loanService.postRepaymentAmount(body).subscribe(
      (response) => {
        console.log(response);
        const dialogData: DialogData = {
          message: 'Congrats! Loan Repayment Done Successfully',
        };
        const initialState = {
          dialogData: dialogData,
        };
        this.modalService.show(DialogSkeletonComponent, { initialState });
        this.bsModalRef.hide();
        return response;
      },
      (error) => {
        console.log(error);

        const dialogData: DialogData = {
          message: 'Unable to perform loan repayment',
        };
        const initialState = {
          dialogData: dialogData,
        };
        this.modalService.show(DialogErrorSkeletonComponent, { initialState });
        this.bsModalRef.hide();
      }
    );
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
