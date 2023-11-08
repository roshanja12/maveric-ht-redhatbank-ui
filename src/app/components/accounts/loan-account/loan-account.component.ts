import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Options } from '@popperjs/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddLoanAccountComponent } from 'src/app/forms/add-loan-account/add-loan-account.component';
import { LoanAccountsModel } from 'src/app/models/loan-account.model';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';

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
  collectionSize: number = 0;
  rowOptions: string[] = ['Open', 'Approve', 'Reject', 'Withdraw'];
  constructor(
    private formBuilder: FormBuilder,
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
    this.visibleColumnElements = [
      'applicationId',
      'customerId',
      'name',
      'emailId',
      'phoneNumber',
      'loanStatus',
    ];
    this.getAllLoanAccounts();
  }

  getAllLoanAccounts() {
    this.accountService.getAllLoanAccounts().subscribe((res) => {
      this.currentLoanAccounts = res;
      this.collectionSize = this.currentLoanAccounts.length;
    });
  }

  getSearch(searchText: string) {
    this.accountService.getSearchLoanAccounts(searchText).subscribe((res) => {
      this.currentLoanAccounts = res;
      this.collectionSize = this.currentLoanAccounts.length;
    });
  }
  createNewLoanAccount(createButtonClicked: Event) {
    console.log('Create loan account button ');
    this.modalRef = this.modalService.show(AddLoanAccountComponent);
  }
}
