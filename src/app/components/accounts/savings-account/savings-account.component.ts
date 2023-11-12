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

   const savingsAccountData: SavingsAccountDTO[] = [
      {
        savingsAccountId: 1,
        customerId: 101,
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: 1234567890,
        minOpeningBalance: 500.00,
        interestCompoundPeriod: 'MONTHLY',
        isAllowOverDraft: true,
        overDraftLimit: 1000.00,
        documentName: 'doc_1.jpg',
        createdDate: new Date('2023-11-01T08:30:00Z'),
        updatedDate: new Date('2023-11-02T10:45:00Z'),
        balance: 750.00,
        status: 'ACTIVE'
      },
      {
        savingsAccountId: 2,
        customerId: 102,
        customerName: 'Jane Smith',
        customerEmail: 'jane.smith@example.com',
        customerPhone: 9876543210,
        minOpeningBalance: 1000.00,
        interestCompoundPeriod: 'QUARTERLY',
        isAllowOverDraft: false,
        overDraftLimit: 0.00,
        documentName: 'doc_2.jpg',
        createdDate: new Date('2023-11-03T12:15:00Z'),
        updatedDate: new Date('2023-11-04T09:20:00Z'),
        balance: 1200.00,
        status: 'ACTIVE'
      },
      {
        savingsAccountId: 3,
        customerId: 103,
        customerName: 'Alice Johnson',
        customerEmail: 'alice.johnson@example.com',
        customerPhone: 5551234567,
        minOpeningBalance: 300.00,
        interestCompoundPeriod: 'ANNUAL',
        isAllowOverDraft: true,
        overDraftLimit: 500.00,
        documentName: 'doc_3.jpg',
        createdDate: new Date('2023-11-05T14:45:00Z'),
        updatedDate: new Date('2023-11-06T11:30:00Z'),
        balance: 400.00,
        status: 'ACTIVE'
      },
      {
        savingsAccountId: 4,
        customerId: 104,
        customerName: 'Bob Williams',
        customerEmail: 'bob.williams@example.com',
        customerPhone: 9998765432,
        minOpeningBalance: 800.00,
        interestCompoundPeriod: 'MONTHLY',
        isAllowOverDraft: false,
        overDraftLimit: 0.00,
        documentName: 'doc_4.jpg',
        createdDate: new Date('2023-11-07T16:00:00Z'),
        updatedDate: new Date('2023-11-08T13:10:00Z'),
        balance: 900.00,
        status: 'ACTIVE'
      },
      {
        savingsAccountId: 5,
        customerId: 105,
        customerName: 'Eva Davis',
        customerEmail: 'eva.davis@example.com',
        customerPhone: 1112223333,
        minOpeningBalance: 1200.00,
        interestCompoundPeriod: 'QUARTERLY',
        isAllowOverDraft: true,
        overDraftLimit: 1500.00,
        documentName: 'doc_5.jpg',
        createdDate: new Date('2023-11-09T18:20:00Z'),
        updatedDate: new Date('2023-11-10T15:05:00Z'),
        balance: 1300.00,
        status: 'ACTIVE'
      },
      {
        savingsAccountId: 6,
        customerId: 106,
        customerName: 'Charlie Brown',
        customerEmail: 'charlie.brown@example.com',
        customerPhone: 3334445555,
        minOpeningBalance: 600.00,
        interestCompoundPeriod: 'ANNUAL',
        isAllowOverDraft: true,
        overDraftLimit: 800.00,
        documentName: 'doc_6.jpg',
        createdDate: new Date('2023-11-11T20:30:00Z'),
        updatedDate: new Date('2023-11-12T17:15:00Z'),
        balance: 700.00,
        status: 'ACTIVE'
      },
      {
        savingsAccountId: 7,
        customerId: 107,
        customerName: 'Grace Miller',
        customerEmail: 'grace.miller@example.com',
        customerPhone: 7778889999,
        minOpeningBalance: 900.00,
        interestCompoundPeriod: 'MONTHLY',
        isAllowOverDraft: false,
        overDraftLimit: 0.00,
        documentName: 'doc_7.jpg',
        createdDate: new Date('2023-11-13T22:40:00Z'),
        updatedDate: new Date('2023-11-14T19:25:00Z'),
        balance: 1000.00,
        status: 'ACTIVE'
      },
    ];

    this.currentSavingsAccounts = savingsAccountData;
      this.collectionSize = this.currentSavingsAccounts.length;
    this.tableColumns = tableColumns;
    this.getAllSavingsAccounts();
  }
  getAllSavingsAccounts() {
    this.accountService.getAllSavingsAccounts(1,1000).subscribe((res) => {
      // this.currentSavingsAccounts = res;
      // this.collectionSize = this.currentSavingsAccounts.length;
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
  }

  rowOptionEvent(receivedEvent: any) {
    this.actionIntended = receivedEvent[1];
    if (this.actionIntended === 'Open') {
      const customerId = receivedEvent[0].customerId;
      const customerName = receivedEvent[0].customerName;
      const status = receivedEvent[0].status;
      const savingsAccountId = receivedEvent[0].savingsAccountId;
      const queryParams = {
        'customerId': customerId,
        'customerName': customerName,
        'status': status,
        'savingsAccountId': savingsAccountId
      };

      this.router.navigateByUrl(`/customer-savings-account?customerId=${queryParams.customerId}&customerName=${queryParams.customerName}&savingsAccountId=${queryParams.savingsAccountId}&status=${queryParams.status}`);
      console.log(this.actionIntended);
    } else if (this.actionIntended === 'Approve') {
      console.log(this.actionIntended);
      let currentSavingsAccount: SavingsAccountModel = receivedEvent[0];
      if (currentSavingsAccount.status?.toLowerCase() === 'blocked') {
        // not possible to change
        return;
      }
      this.accountService.modifySavingsAccount(currentSavingsAccount);
      return;
    } else if (this.actionIntended === 'Reject') {
      console.log(this.actionIntended);
    } else if (this.actionIntended === 'Block') {
      console.log(this.actionIntended);
    } else if (this.actionIntended === 'UnBlock') {
      console.log(this.actionIntended);
    }
  }
}
