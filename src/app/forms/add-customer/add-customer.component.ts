import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogData } from 'src/app/models/dialog-data.model';
import { CustomerAccountsService } from 'src/app/services/customer-accounts.service';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  addCustomerForm: FormGroup;
  modalRef!: BsModalRef;
  citiesAvailable: string[] = ['Bangalore', 'Mumbai', 'Pune'];
  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
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
        const dialogData: DialogData = {
          message: 'Congrats Customer Account Created Successfully',
        };
        const initialState = {
          dialogData: dialogData,
        };
        this.modalService.show(DialogSkeletonComponent, { initialState });
        this.bsModalRef.hide();
        return true;
      },
      (error) => {
        this.bsModalRef.hide();
        console.log(error);
        return false;
      }
    );
  }

  onCancel() {
    console.log('Create customer cancelled');
    this.bsModalRef.hide();
    return false;
  }
}
