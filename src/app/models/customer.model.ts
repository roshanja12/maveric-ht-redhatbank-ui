export interface CustomerModel {
  customerId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  city: string;
  [key: string]: any;
}
