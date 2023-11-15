import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-bootstrap/positioning/models';
import { AddSavingsAccountComponent } from 'src/app/forms/add-savings-account/add-savings-account.component';
import { CustomerResponse } from 'src/app/models/customer-response.model';
import { SavingsAccountDTO } from 'src/app/models/savings-account.dto';
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
  currentSavingsAccounts: SavingsAccountDTO[] = [];
  tableColumns!: string[];
  visibleColumnElements!: string[];
  options!: Options;
  pageSize = 4;
  searchText!: string;
  collectionSize: number = 0;
  actionIntended: string = '';
  rowOptions: string[] = ['Open', 'Approve', 'Reject', 'Block', 'UnBlock'];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: SavingsAccountsService,
    private modalService: BsModalService,
    private router: Router
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
      'savingsAccountId',
      'customerId',
      'customerName',
      'customerEmail',
      'customerPhone',
      'status',
    ];
    this.tableColumns = tableColumns;
    this.getAllSavingsAccounts();
  }
  getAllSavingsAccounts() {
    this.accountService.getAllSavingsAccounts(1, 1000).subscribe((res) => {
      this.currentSavingsAccounts = res;
      console.log(res);

      this.collectionSize = this.currentSavingsAccounts.length;
    });
  }
  getAllSearchAccounts(searchText: string) {
    this.accountService
      .getSearchSavingsAccounts(searchText)
      .subscribe((res) => {
        this.currentSavingsAccounts = res;
        this.collectionSize = this.currentSavingsAccounts.length;
      });
  }

  getSearch(searchText: string) {
    this.searchText = searchText;
    console.log('search button clicked ' + searchText);
    this.accountService.getSearchSavingsAccounts(searchText);
  }
  createNewSavingsAccount(createButtonClicked: Event) {
    console.log('value emitted and  ' + createButtonClicked);
    this.modalRef = this.modalService.show(AddSavingsAccountComponent);
    this.modalRef.onHidden?.subscribe(() => {
      console.log('Modal closed. Performing additional actions.');
      this.getAllSavingsAccounts();
    });
  }

  rowOptionEvent(receivedEvent: any) {
    this.actionIntended = receivedEvent[1];
    if (this.actionIntended === 'Open') {
      const customerId = receivedEvent[0].customerId;
      const customerName = receivedEvent[0].customerName;
      const status = receivedEvent[0].status;
      const savingsAccountId = receivedEvent[0].savingsAccountId;
      const queryParams = {
        customerId: customerId,
        customerName: customerName,
        status: status,
        savingsAccountId: savingsAccountId,
      };

      this.router.navigateByUrl(
        `/customer-savings-account?customerId=${queryParams.customerId}&customerName=${queryParams.customerName}&savingsAccountId=${queryParams.savingsAccountId}&status=${queryParams.status}`
      );
      console.log(this.actionIntended);
    } else if (
      this.actionIntended === 'Approve' &&
      receivedEvent[0].status?.toLowerCase() !== 'blocked'
    ) {
      console.log(this.actionIntended);
      return;
    } else if (
      this.actionIntended === 'Reject' &&
      receivedEvent[0].status?.toLowerCase() !== 'blocked'
    ) {
      console.log(this.actionIntended);
      return;
    } else if (
      this.actionIntended === 'Block' &&
      receivedEvent[0].status?.toLowerCase() !== 'blocked'
    ) {
      console.log(this.actionIntended);
      return;
    } else if (this.actionIntended === 'UnBlock') {
      console.log(this.actionIntended);
    }
    let currentSavingsAccount: SavingsAccountModel = receivedEvent[0];
    this.accountService.modifySavingsAccount(currentSavingsAccount);
  }
}
