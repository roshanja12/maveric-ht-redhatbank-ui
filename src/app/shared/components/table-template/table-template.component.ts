import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerModel } from 'src/app/models/customer.model';
import { LoanAccountsModel } from 'src/app/models/loan-account.model';
import { LoanTransactionHistoryModel } from 'src/app/models/loan-transaction-history.model';
import { SavingsAccountDTO } from 'src/app/models/savings-account.dto';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';

type Data =
  | CustomerModel
  | SavingsAccountModel
  | LoanAccountsModel
  | SavingsAccountDTO
  | LoanTransactionHistoryModel;
@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css'],
})
export class TableTemplateComponent implements OnInit {
  constructor() {}
  headers: any;
  selectedDropdownValue: number = 25;
  numberOfRowOptions: number = 0;
  @Input() columns!: string[];
  @Input() visibleColumnsElements!: string[];
  @Input() dataTable!: Data[];
  @Input() collectionSize!: number;
  @Input() pageSize!: number;
  @Input() rowOptions: string[] = [];
  @Input() page: number = 1;
  @Input() colorColumnName: string = '';
  @Input() colorColumnAttributes!: Map<string, string>;
  @Output() onRowOptionClick = new EventEmitter<[Data, string]>();

  ngOnInit() {
    console.log(this.columns);
    console.log(this.dataTable);
    console.log(this.visibleColumnsElements);
    this.pageSize = 25;
    if (this.rowOptions.length != 0) {
      console.log(this.rowOptions);
      this.columns.push('');
      this.numberOfRowOptions = this.rowOptions.length;
    }
  }
  updateDropdownValue(value: number) {
    this.pageSize = value;
    this.selectedDropdownValue = value;
  }
  sendEventBack(item: Data, action: string) {
    console.log(item, action);
    // emit event to parent component with the item and the action performed
    console.log('Emitting event ' + item, ' action ' + action);
    this.onRowOptionClick.emit([item, action]);
  }
  onColumnCustomiseStyle(header: string, element: string) {
    if (header != this.colorColumnName) {
      return '';
    }
    return this.colorColumnAttributes.get(element);
  }
}
