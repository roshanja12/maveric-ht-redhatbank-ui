export interface SavingsAccountModel {
  applicationId: number;
  customerId: number;
  name: string;
  phoneNumber: string;
  minOpeningBalance?: number;
  interestCompoundPeriod?: string;
  isAllowOverDraft?: boolean;
  overDraftLimit?: number;
  [key: string]: any;
}
