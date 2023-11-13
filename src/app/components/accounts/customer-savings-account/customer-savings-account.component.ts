import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { DialogModule } from 'primeng/dialog';
import { Dropdown } from 'primeng/dropdown';
import { DialogData } from 'src/app/models/dialog-data.model';
import { TransactionDto } from 'src/app/models/transations.dto';
import { CustomerTransactionService } from 'src/app/services/customer-transactions.service';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';

@Component({
  selector: 'app-customer-savings-account',
  templateUrl: './customer-savings-account.component.html',
  styleUrls: ['./customer-savings-account.component.css'],
})
export class CustomerSavingsAccountComponent implements OnInit, AfterViewInit {

  @ViewChild('confirmationModal') confirmationModal: any;
  transactions!: TransactionDto[];
  dialogIsOpen = false;
  dialogMessage = '';
  isModifyClicked: boolean = true;
  isModalOpen: boolean = false;
  customerId!: number;
  customerName!: string;
  status!: string;
  savingsAccountId!: number;
  isOverDraftChecked!: boolean;
  depositAmount!: number;
  withdrawAmount!: number;
  overDraftAmount!: number

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private modalService: BsModalService,
    private customerTransactionService: CustomerTransactionService
  ) {}
  ngAfterViewInit(): void {
    const dropdownElement = this.el.nativeElement.querySelector('p-dropdown');
    if (dropdownElement) {
      // Apply the 'order: -1;' style to the p-dropdown element
      // this.renderer.setStyle(dropdownElement, 'order', '-1');
      const labelElement = this.renderer.createElement('label');
      const labelText = this.renderer.createText('Show');

      // Apply the 'order: -1;' style to the label element
      this.renderer.setStyle(labelElement, 'order', '-2');
      this.renderer.setStyle(dropdownElement, 'order', '-1');

      // Append the text to the label
      this.renderer.appendChild(labelElement, labelText);

      // Insert the label before the dropdown element
      this.renderer.insertBefore(
        dropdownElement.parentElement,
        labelElement,
        dropdownElement
      );
    }
  }
  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      this.customerId = params['customerId'];
      this.customerName = params['customerName'];
      this.savingsAccountId = params['savingsAccountId'];
      this.status = params['status'];
    });

    this.getAllTransactions();
  }

  getAllTransactions(){
     this.customerTransactionService.getTransactionsForSavingsAccount(this.savingsAccountId,1,1000).subscribe(response =>{
      console.log(response);
       
      this.transactions = response;
     });
  }

  onClickOfDeposit() {
    this.customerTransactionService.depositsAmount(this.savingsAccountId, this.depositAmount).subscribe(
      (response) => {
       

        if (response.code === 201) {
          this.getAllTransactions();

          const dialogData: DialogData = {
            message: 'Congrats! Deposit Successful',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogSkeletonComponent, { initialState });

        } else {

          const dialogData: DialogData = {
            message: 'Sorry! Deposit Failed',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogSkeletonComponent, { initialState });

        }
        // Handle success, update UI, etc.
      },
      (error) => {
        console.error('Withdrawal failed', error);
        // Handle error, show error message, etc.
      }
    );
    
    }
    onClickOfWithdraw() {
      this.customerTransactionService
        .withdrawAmount(this.savingsAccountId, this.withdrawAmount)
        .subscribe(
          (response) => {
            if (response.code === 201) {
              this.getAllTransactions();

              const dialogData: DialogData = {
                message: 'Congrats! Withdraw Successful',
              };
              const initialState = {
                dialogData: dialogData,
              };
              this.modalService.show(DialogSkeletonComponent, { initialState });
              console.log('Withdrawal successful', response);
              // Handle success, update UI, etc.\
            } else {


              const dialogData: DialogData = {
                message: 'Sorry! Withdraw Failed',
              };
              const initialState = {
                dialogData: dialogData,
              };
              this.modalService.show(DialogSkeletonComponent, { initialState });

            }
          },
          (error) => {
            console.error('Withdrawal failed', error);
            // Handle error, show error message, etc.
          }
        );
      
      }

      onClickOfOverDraft(){

        const body = {
          "savingAccountId" : this.savingsAccountId,
          "isAllowOverDraft" : true,
          "overDraftLimit" : this.overDraftAmount,
          "status": "APPLIED"
        }

        this.customerTransactionService.overDraftAmount(body).subscribe(response =>{
          if(response.code === 200){

            const dialogData: DialogData = {
              message: 'Congrats! OverDraft added Successfully',
            };
            const initialState = {
              dialogData: dialogData,
            };
            this.modalService.show(DialogSkeletonComponent, { initialState });

          } else {  


            const dialogData: DialogData = {
              message: 'Sorry! OverDraft process Failed',
            };
            const initialState = {
              dialogData: dialogData,
            };
            this.modalService.show(DialogSkeletonComponent, { initialState });

          }

        })

      }

  onModify() {
    this.isModifyClicked = !this.isModifyClicked;
  }
  onClose() {}
  onBlock() {
    this.router.navigateByUrl('/customer-payment-history');
  }

  routeToSavingsTable() {
    this.router.navigateByUrl('/savings-account');
  }

  openConfirmationModal(): void {
    this.isModalOpen = true;
  }

  handleConfirmation(isConfirmed: boolean) {
    // Handle the confirmation result
    if (isConfirmed) {
      // Perform the desired action
      this.isModalOpen = false;
    } else {
      this.isModalOpen = false;
    }
    // this.modalService.close();
  }
}


