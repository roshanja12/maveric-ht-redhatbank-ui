export interface SavingsAccountModel {
  applicationId: number;
  customerId: number;
  customerName: string;
  phoneNumber: string;
  minOpeningBalance: number;
  interestCompoundPeriod: string;
  isAllowOverDraft: boolean;
  overDraftLimit: number;
  [key: string]: any;
}
