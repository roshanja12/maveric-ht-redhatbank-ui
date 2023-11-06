import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-bootstrap/positioning/models';
import { AddSavingsAccountComponent } from 'src/app/forms/add-savings-account/add-savings-account.component';
import { CustomerResponse } from 'src/app/models/customer-response.model';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { SavingsAccountsService } from 'src/app/services/savings-accounts.service';

@Component({
  selector: 'app-savings-account',
  templateUrl: './savings-account.component.html',
  styleUrls: ['./savings-account.component.css'],
})
export class SavingsAccountComponent {
  searchForm: FormGroup;
  modalRef!: BsModalRef;
  currentSavingsAccounts: SavingsAccountModel[] = [];
  tableColumns!: string[];
  visibleColumnElements!: string[];
  options!: Options;
  pageSize = 4;
  searchText!: string;
  collectionSize: number = 0;
  rowOptions: string[] = ['Open', 'Approve', 'Reject', 'Block', 'UnBlock'];
  constructor(
    private formBuilder: FormBuilder,
    private accountService: SavingsAccountsService,
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
    this.visibleColumnElements = [
      'applicationName',
      'customerId',
      'name',
      'emailId',
      'phoneNumber',
      'status',
    ];
    this.tableColumns = tableColumns;
    this.currentSavingsAccounts = [
      {
        applicationId: 1000,
        customerId: 1,
        name: 'Boomer',
        emailId: 'kdsfksdm@kdmsfk.com',
        phoneNumber: '012301',
        status: 'Approved',
      },
    ];
    return;
    this.getAllSavingsAccounts();
  }
  getAllSavingsAccounts() {
    this.accountService.getAllSavingsAccounts().subscribe((res) => {
      this.currentSavingsAccounts = res;
      this.collectionSize = this.currentSavingsAccounts.length;
    });
  }
  getAllSearchAccounts(searchText: string) {
    this.accountService.getSearchSavingsAccounts(searchText).subscribe((res) => {
      this.currentSavingsAccounts = res;
      this.collectionSize = this.currentSavingsAccounts.length;
    })
  }

  getSearch(searchText: string) {
    this.searchText = searchText;
    console.log('search button clicked ' + searchText);
    this.accountService.getSearchSavingsAccounts(searchText);
  }
  createNewSavingsAccount(createButtonClicked: Event) {
    console.log('value emitted and  ' + createButtonClicked);
    this.modalRef = this.modalService.show(AddSavingsAccountComponent);
  }
}
