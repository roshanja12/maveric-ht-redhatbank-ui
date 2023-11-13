import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerAccountsService } from 'src/app/services/customer-accounts.service';
import { SavingsAccountsService } from 'src/app/services/savings-accounts.service';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';
import { DialogData } from 'src/app/models/dialog-data.model';

@Component({
  selector: 'app-add-savings-account',
  templateUrl: './add-savings-account.component.html',
  styleUrls: ['./add-savings-account.component.css'],
})
export class AddSavingsAccountComponent {


  addSavingsAccountForm: FormGroup;
  minOpeningBalanceAvailable: number[] = [1000, 2000, 5000, 10000];
  interestCompoundingPeriodAvailable: string[] = [
    'Monthly',
    'Quarterly',
    'Annually',
  ];
  overdraftLimitAvailable: number[] = [1000, 2000, 5000, 10000];
  allowOverdraftToggle: boolean = false;
  selectedFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private savingsService: SavingsAccountsService,
    private snackBarService: SnackbarService,
    private modalService: BsModalService,
    private customerService: CustomerAccountsService
  ) {
    this.addSavingsAccountForm = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      minOpeningBalance: [1000, [Validators.required]],
      interestCompoundingPeriod: ['MONTHLY', [Validators.required]],
      overDraftLimit: [1000],
      documentUpload: ['', [Validators.required]],
    });
  }

  onOverdraftToggleClick(event: Event): void {
    this.allowOverdraftToggle = !this.allowOverdraftToggle;
  }

  onSubmit() {

  const formValues = this.addSavingsAccountForm.value;

  // Create an object with only the required fields
  const requiredValues = {
    customerId: formValues.customerId,
    customerName: formValues.name,
    phoneNumber: formValues.phoneNumber.toString(),
    minOpeningBalance: formValues.minOpeningBalance,
    interestCompoundPeriod: formValues.interestCompoundingPeriod,
    isAllowOverDraft: formValues.overDraftLimit > 0, // Assuming overDraftLimit is a boolean value
    overDraftLimit: formValues.overDraftLimit,
  };

    this.savingsService
      .addSavingsAccount(this.selectedFile, requiredValues)
      .subscribe(
        (response) => {
          console.log(response);

          const dialogData: DialogData = {
            message: 'Congrats! Account Created Successful',
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

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  searchCustomer() {
    const customerId = this.addSavingsAccountForm.get('customerId')?.value;
    if (customerId == null) {
      this.snackBarService.showSnackBar('Provide customerId');
      return;
    }
    this.patchValuesIntoForm();
  }

  patchValuesIntoForm() {
    this.customerService
      .getCustomer(this.addSavingsAccountForm.value.customerId)
      .subscribe(
        (res) => {

          this.addSavingsAccountForm.patchValue({
            customerId: res.customerId,
            name: `${res.firstName} ${res.lastName}`,
            phoneNumber: res.phoneNumber,
          });
         
          //this.getSavingsAccounts(this.addSavingsAccountForm.value.customerId);
        },
        (error) => {
          this.snackBarService.showSnackBar(
            'Unable to get customer with that ID ' +
              this.addSavingsAccountForm.value.customerId
          );
        }
      );
  }

  onCancel() {
    this.bsModalRef.hide();
    return;
  }
}
