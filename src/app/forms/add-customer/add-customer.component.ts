import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerAccountsService } from 'src/app/services/customer-accounts.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  addCustomerForm: FormGroup;
  citiesAvailable: string[] = ['Bangalore', 'Mumbai', 'Pune'];
  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private customerService: CustomerAccountsService
  ) {
    this.addCustomerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      city: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.customerService.addCustomer(this.addCustomerForm.value).subscribe(
      (response) => {
        console.log(response);
        this.bsModalRef.hide();
      },
      (error) => {
        this.bsModalRef.hide();
        console.log(error);
      }
    );
  }

  onCancel() {
    console.log('Create customer cancelled');

    this.bsModalRef.hide();
    return;
  }
}
