import { z } from "zod";
import { CompanyBenefits } from "./types/CompanyBenefits";

export const COMPANY_DATA_URL =
  "https://gist.githubusercontent.com/gyermich/6ca0c6601932bae50d3c6eb75481d302/raw/416ab16e087fbc14c0a517aa8da7a9873c38dd1e/companies.json";

const camelResponse = z.object({
  ein: z.number(),
  company_name: z.string(),
  plan_year: z.number(),
  employee_count: z.number(),
  company_state: z.string(),
  premium_sum: z.number(),
  broker_commission_sum: z.number(),
  participants_sum: z.number(),
});

const responseSchema = z.array(camelResponse);

const toCamel = (raw: z.infer<typeof camelResponse>): CompanyBenefits => ({
  ein: raw.ein,
  companyName: raw.company_name,
  planYear: raw.plan_year,
  employeeCount: raw.employee_count,
  companyState: raw.company_state,
  premiumSum: raw.premium_sum,
  brokerCommissionSum: raw.broker_commission_sum,
  participantsSum: raw.participants_sum,
});

export const getCompanyData = (): Promise<ReadonlyArray<CompanyBenefits>> => {
  return fetch(COMPANY_DATA_URL).then(async (response) => {
    if (response.status === 200) {
      const responseData = await response.json();
      return responseSchema.parse(responseData).map(toCamel);
    } else {
      throw new Error(`Reponse failed with status code ${response.status}`);
    }
  });
};
