import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';

@Component({
  selector: 'app-add-loan-account',
  templateUrl: './add-loan-account.component.html',
  styleUrls: ['./add-loan-account.component.css']
})
export class AddLoanAccountComponent {
  addLoanAccountForm: FormGroup;
  private _savingsAccountsAvailable: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private savingsService: LoanAccountsService
  ){
    this.addLoanAccountForm = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      savingsAccount: [{ value: '', disabled: this.savingsAccountsAvailable.length === 0 }, [Validators.required]],
      documentUpload: ['', [Validators.required]],
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

  ngOnInit(){
    console.log(this.savingsAccountsAvailable);
    
  }

  onSubmit() {
    this.savingsService
      .addLoanAccount(this.addLoanAccountForm.value)
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
