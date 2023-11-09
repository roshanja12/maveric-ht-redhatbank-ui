import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerAccountsService } from 'src/app/services/customer-accounts.service';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';

@Component({
  selector: 'app-add-loan-account',
  templateUrl: './add-loan-account.component.html',
  styleUrls: ['./add-loan-account.component.css'],
})
export class AddLoanAccountComponent {
  addLoanAccountForm: FormGroup;
  private selectedFile!: File;
  private _savingsAccountsAvailable: string[] = [];
  private customerFound!: CustomerModel;
  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private snakBar: MatSnackBar,
    private savingsService: LoanAccountsService,
    private customerService: CustomerAccountsService
  ) {
    this.addLoanAccountForm = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      loanAmount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      emi: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      savingsAccount: [
        { value: '', disabled: this.savingsAccountsAvailable.length === 0 },
        [Validators.required],
      ],
    });
  }

  // Use a setter to handle savingsAccountsAvailable changes
  set savingsAccountsAvailable(value: string[]) {
    this._savingsAccountsAvailable = value;
    // Check and disable the form control based on savingsAccountsAvailable array length
    if (this._savingsAccountsAvailable.length === 0) {
      this.addLoanAccountForm.get('savingsAccount')?.disable();
    } else {
      this.addLoanAccountForm.get('savingsAccount')?.enable();
    }
  }

  // Getter for savingsAccountsAvailable
  get savingsAccountsAvailable(): string[] {
    return this._savingsAccountsAvailable;
  }

  ngOnInit() {
    console.log(this.savingsAccountsAvailable);
  }

  searchCustomer() {
    const customerId = this.addLoanAccountForm.get('customerId')?.value;
    if (customerId == null) {
      this.snakBar.open('Customer Id is null', 'Close', { duration: 3000 });
      return;
    }
    this.patchValuesIntoForm();
  }
  patchValuesIntoForm() {
    this.customerService
      .getCustomer(this.addLoanAccountForm.value.customerId)
      .subscribe((res) => {
        this.addLoanAccountForm.controls['name'].setValue(
          res.firstName + res.lastName
        );
        this.addLoanAccountForm.controls['phoneNumber'].setValue(
          res.phoneNumber
        );
      });
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onSubmit() {
    this.savingsService
      .addLoanAccount(this.selectedFile, this.addLoanAccountForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          return response;
        },
        (error) => {
          this.bsModalRef.hide();
          console.log(error);
        }
      );
  }

  onCancel() {
    this.bsModalRef.hide();
    return;
  }
}
