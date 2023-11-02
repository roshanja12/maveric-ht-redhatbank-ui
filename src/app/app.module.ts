import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { CustomerAccountsComponent } from './components/home/customer-accounts/customer-accounts.component';
import { SavingsAccountsComponent } from './components/home/savings-accounts/savings-accounts.component';
import { LoanAccountsComponent } from './components/home/loan-accounts/loan-accounts.component';
import { CustomerCountComponent } from './components/home/customer-count/customer-count.component';
import { TotalCustomerComponent } from './components/home/total-customer/total-customer.component';
import { LoanProductsComponent } from './components/home/loan-products/loan-products.component';
import { AccountTemplateComponent } from './shared/components/account-template/account-template.component';
import { CustomerAccountComponent } from './components/accounts/customer-account/customer-account.component';
import { AddCustomerComponent } from './forms/add-customer/add-customer.component';
import { TableTemplateComponent } from './shared/components/table-template/table-template.component';
import { SavingsAccountComponent } from './components/accounts/savings-account/savings-account.component';
import { LoanAccountComponent } from './components/accounts/loan-account/loan-account.component';
import { SortColumnsDirective } from './shared/directive/sort-columns.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralFormSkeletonComponent } from './shared/forms/general-form-skeleton/general-form-skeleton.component';
import { NoContentResultComponent } from './shared/components/no-content-result/no-content-result.component';
import { AddSavingsAccountComponent } from './forms/add-savings-account/add-savings-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterBarComponent,
    LoginPageComponent,
    HomeComponent,
    CustomerAccountsComponent,
    SavingsAccountsComponent,
    LoanAccountsComponent,
    CustomerCountComponent,
    TotalCustomerComponent,
    LoanProductsComponent,
    AccountTemplateComponent,
    CustomerAccountComponent,
    AddCustomerComponent,
    TableTemplateComponent,
    SavingsAccountComponent,
    LoanAccountComponent,
    SortColumnsDirective,
    GeneralFormSkeletonComponent,
    NoContentResultComponent,
    AddSavingsAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AlertModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    AlertConfig,
    BsDatepickerConfig,
    BsDropdownConfig,
    BsModalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
