import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SavingsAccountsService } from 'src/app/services/savings-accounts.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private savingsService: SavingsAccountsService
  ) {
    this.addSavingsAccountForm = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      minOpeningBalance: ['', [Validators.required]],
      interestCompoundingPeriod: ['', [Validators.required]],
      overDraftLimit: [0],
      documentUpload: ['', [Validators.required]],
    });
  }

  onOverdraftToggleClick(event: Event): void {
    this.allowOverdraftToggle = !this.allowOverdraftToggle;
  }

  onSubmit() {
    this.savingsService
      .addSavingsAccount(this.addSavingsAccountForm.value)
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
