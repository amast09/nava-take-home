export type CompanyBenefits = Readonly<{
  ein: number;
  companyName: string;
  planYear: number;
  employeeCount: number;
  companyState: string;
  premiumSum: number;
  brokerCommissionSum: number;
  participantsSum: number;
}>;
