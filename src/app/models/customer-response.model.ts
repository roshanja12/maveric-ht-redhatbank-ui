import { CustomerModel } from './customer.model';

export interface CustomerResponse {
  records: CustomerModel[];
  filtered: number;
  total: number;
}
