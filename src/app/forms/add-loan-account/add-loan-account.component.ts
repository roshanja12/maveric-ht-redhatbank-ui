import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerModel } from 'src/app/models/customer.model';
import { DialogData } from 'src/app/models/dialog-data.model';
import { CustomerAccountsService } from 'src/app/services/customer-accounts.service';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';
import { SavingsAccountsService } from 'src/app/services/savings-accounts.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';

@Component({
  selector: 'app-add-loan-account',
  templateUrl: './add-loan-account.component.html',
  styleUrls: ['./add-loan-account.component.css'],
})
export class AddLoanAccountComponent {
  addLoanAccountForm: FormGroup;
  private selectedFile!: File;
  savingsAccountsAvailable: number[] = [];
  private customerFound!: CustomerModel;
  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private snackBarService: SnackbarService,
    private loanService: LoanAccountsService,
    private savingsService: SavingsAccountsService,
    private modalService: BsModalService,
    private customerService: CustomerAccountsService
  ) {
    this.addLoanAccountForm = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],

      loanAmount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      emi: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      savingsAccount: [null, [Validators.required]],
    });
  }

  searchCustomer() {
    const customerId = this.addLoanAccountForm.get('customerId')?.value;
    if (customerId == null) {
      this.snackBarService.showSnackBar('Provide customerId');
      return;
    }
    this.patchValuesIntoForm();
  }
  patchValuesIntoForm() {
    this.customerService
      .getCustomer(this.addLoanAccountForm.value.customerId)
      .subscribe(
        (res) => {
          this.getSavingsAccounts(this.addLoanAccountForm.value.customerId);
        },
        (error) => {
          this.snackBarService.showSnackBar(
            'Unable to get customer with that ID ' +
              this.addLoanAccountForm.value.customerId
          );
        }
      );
  }
  getSavingsAccounts(customerId: number) {
    this.savingsService
      .getSavingsAccountsByCustomerId(customerId)
      .subscribe((res) => {
        this.savingsAccountsAvailable = [];
        this.savingsAccountsAvailable.push(res.savingsAccountId);
      });
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onSubmit() {
    this.loanService
      .addLoanAccount(this.selectedFile, this.addLoanAccountForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          const dialogData: DialogData = {
            message: 'Congrats! Loan Account Created Successfully',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogSkeletonComponent, { initialState });
          this.bsModalRef.hide();
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
