import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerModel } from 'src/app/models/customer.model';
import { CustomerAccountsService } from 'src/app/services/customer-accounts.service';

@Component({
  selector: 'app-modify-customer',
  templateUrl: './modify-customer.component.html',
  styleUrls: ['./modify-customer.component.css'],
})
export class ModifyCustomerComponent {
  customerData!: CustomerModel;
  modifyCustomerForm: FormGroup;
  customerFound!: CustomerModel;
  customerId: number = 0;
  citiesAvailable: string[] = ['Bangalore', 'Mumbai', 'Pune'];
  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private customerService: CustomerAccountsService
  ) {
    this.modifyCustomerForm = this.formBuilder.group({
      customerId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      selectCity: [''],
    });
  }

  ngOnInit() {
    console.log(this.customerData); 
    this.customerFound = {
      customerId: 1,
      firstName: 'Kamal',
      lastName: 'Yadav',
      email: 'sdjkf@kjd.com',
      phoneNumber: '9184278214',
      city: 'Bengaluru',
    };

    this.modifyCustomerForm.patchValue({
      customerId: this.customerData.customerId,
      firstName: this.customerFound.firstName,
      lastName: this.customerFound.lastName,
      email: this.customerFound.email,
      phoneNumber: this.customerFound.phoneNumber,
      selectCity: this.customerFound.city
    });
  }

  getCustomer(customerId: number) {
    return this.customerService.getCustomer(customerId).subscribe((res) => {
      this.customerFound = res;
    });
  }

  onSubmit() {
    this.customerService
      .modifyCustomer(this.modifyCustomerForm.value)
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
