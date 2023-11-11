export interface LoanAccountsModel {
  loanId: number;
  customerId: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  status: string;
  [key: string]: any;
}
