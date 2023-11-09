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
      city: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    console.log('Customer data fetched and patching now');
    console.log(this.customerData);
    this.customerId = this.customerData.customerId;
    this.getCustomer(this.customerData.customerId);
    this.modifyCustomerForm.patchValue({
      customerId: this.customerData.customerId,
      firstName: this.customerData.firstName,
      lastName: this.customerData.lastName,
      email: this.customerData.email,
      phoneNumber: this.customerData.phoneNumber,
      city: this.customerData.city,
    });
  }

  getCustomer(customerId: number) {
    return this.customerService.getCustomer(customerId).subscribe((res) => {
      console.log('Get Customer Called');
      this.customerFound = res;
      console.log(this.customerFound);
    });
  }

  onSubmit() {
    this.customerService
      .modifyCustomer(this.customerId, this.modifyCustomerForm.value)
      .subscribe(
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
    this.bsModalRef.hide();
    return;
  }
}
