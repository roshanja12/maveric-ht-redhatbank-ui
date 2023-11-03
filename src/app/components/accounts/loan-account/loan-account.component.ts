import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Options } from '@popperjs/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerResponse } from 'src/app/models/customer-response.model';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';
import { SavingsAccountsService } from 'src/app/services/savings-accounts.service';

@Component({
  selector: 'app-loan-account',
  templateUrl: './loan-account.component.html',
  styleUrls: ['./loan-account.component.css'],
})
export class LoanAccountComponent {
  searchForm: FormGroup;
  modalRef!: BsModalRef;
  currentLoanAccounts!: any;
  tableColumns!: string[];
  options!: Options;
  searchText!: string;
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
      'Status',
    ];
    this.tableColumns = tableColumns;

    this.getAllLoanAccounts();
  }

  getAllLoanAccounts() {}

  getSearch(searchText: string) {}
  createNewLoanAccount(createButtonClicked: Event) {}
}
