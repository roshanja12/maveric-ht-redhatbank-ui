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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      selectCity: [''],
    });
  }

  onSubmit() {
    this.customerService.addCustomer(this.addCustomerForm.value).subscribe(
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
