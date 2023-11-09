import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Options } from '@popperjs/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddLoanAccountComponent } from 'src/app/forms/add-loan-account/add-loan-account.component';
import { LoanAccountsModel } from 'src/app/models/loan-account.model';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-loan-account',
  templateUrl: './loan-account.component.html',
  styleUrls: ['./loan-account.component.css'],
})
export class LoanAccountComponent {
  searchForm: FormGroup;
  modalRef!: BsModalRef;
  currentLoanAccounts: LoanAccountsModel[] = [];
  tableColumns!: string[];
  visibleColumnElements!: string[];
  options!: Options;
  pageSize = 4;
  searchText!: string;
  actionIntended: string = '';
  collectionSize: number = 0;
  rowOptions: string[] = ['Open', 'Approve', 'Reject', 'Withdraw'];
  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private accountService: LoanAccountsService,
    private modalService: BsModalService
  ) {
    this.searchForm = this.formBuilder.group({
      searchBar: [''],
    });
  }

  ngOnInit() {
    const tableColumns = [
      'Application ID',
      'Customer ID',
      'Name',
      'Email ID',
      'Phone Number',
      'Loan Status',
    ];
    this.tableColumns = tableColumns;
    this.visibleColumnElements = [
      'loanId',
      'customerId',
      'customerName',
      'email',
      'phoneNumber',
      'status',
    ];
    this.getAllLoanAccounts();
  }

  getAllLoanAccounts() {
    this.accountService.getAllLoanAccounts().subscribe((res) => {
      this.currentLoanAccounts = res;
      console.log(res);

      this.collectionSize = this.currentLoanAccounts.length;
    });
  }
  modifyLoanAccountStatus(applicationId: number, statusUpdate: string) {
    this.accountService
      .modifyLoanAccount(applicationId, statusUpdate)
      .subscribe((res) => console.log(res));
    this.snackbarService.showSnackBar('Loan ' + statusUpdate);
    this.getAllLoanAccounts();
  }

  getSearch(searchText: string) {
    console.log('Searching for loan Accounts');
    this.accountService.getSearchLoanAccounts(searchText).subscribe((res) => {
      console.log(res);
      this.currentLoanAccounts = res;
      this.collectionSize = this.currentLoanAccounts.length;
    });
    console.log('Searched for loan accounts');
  }
  createNewLoanAccount(createButtonClicked: Event) {
    console.log('Create loan account button ');
    this.modalRef = this.modalService.show(AddLoanAccountComponent);
  }

  rowOptionEvent(receivedEvent: any) {
    this.actionIntended = receivedEvent[1];
    let loanAccountDetails: LoanAccountsModel = receivedEvent[0];
    if (this.actionIntended === 'Open') {
      console.log('Opening loan account of customer');
    } else {
      if (this.actionIntended == 'Approve') {
        this.actionIntended = 'APPROVED';
      } else if (this.actionIntended == 'Reject') {
        this.actionIntended = 'REJECTED';
      } else if (this.actionIntended == 'Withdraw') {
        this.actionIntended = 'WITHDRAW';
      }
      console.log('Loan ' + this.actionIntended);
      console.log(loanAccountDetails.loanId, this.actionIntended);

      this.modifyLoanAccountStatus(
        loanAccountDetails.loanId,
        this.actionIntended
      );
    }
    console.log('Row option event finished');
  }
}
