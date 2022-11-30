import nock from "nock";
import { CompanyBenefits } from "./types/CompanyBenefits";
import { getCompanyData } from "./getCompanyData";

const BASE_URL = "https://gist.githubusercontent.com";
const PATH =
  "/gyermich/6ca0c6601932bae50d3c6eb75481d302/raw/416ab16e087fbc14c0a517aa8da7a9873c38dd1e/companies.json";
const NOCK_REPLY_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-credentials": "true",
};

const FAKE_DATA = [
  {
    ein: 43000119,
    company_name: "FEENEY BROTHERS EXCAVATION, LLC",
    plan_year: 2019,
    employee_count: 726,
    company_state: "MA",
    premium_sum: 5326985,
    broker_commission_sum: 35534,
    participants_sum: 1172,
  },
  {
    ein: 43000317,
    company_name: "GLYNN ELECTRIC, INC.",
    plan_year: 2019,
    employee_count: 252,
    company_state: "MA",
    premium_sum: 1539242,
    broker_commission_sum: 37798,
    participants_sum: 305,
  },
  {
    ein: 43009415,
    company_name: "MATOUK TEXTILE WORKS, INC.",
    plan_year: 2019,
    employee_count: 128,
    company_state: "MA",
    premium_sum: 1235052,
    broker_commission_sum: 32153,
    participants_sum: 171,
  },
];

describe("getCompanyData", () => {
  it("returns the data when the API request is successful", async () => {
    nock(BASE_URL)
      .defaultReplyHeaders(NOCK_REPLY_HEADERS)
      .get(PATH)
      .reply(200, FAKE_DATA);
    const expectedResult: ReadonlyArray<CompanyBenefits> = [
      {
        ein: 43000119,
        companyName: "FEENEY BROTHERS EXCAVATION, LLC",
        planYear: 2019,
        employeeCount: 726,
        companyState: "MA",
        premiumSum: 5326985,
        brokerCommissionSum: 35534,
        participantsSum: 1172,
      },
      {
        ein: 43000317,
        companyName: "GLYNN ELECTRIC, INC.",
        planYear: 2019,
        employeeCount: 252,
        companyState: "MA",
        premiumSum: 1539242,
        brokerCommissionSum: 37798,
        participantsSum: 305,
      },
      {
        ein: 43009415,
        companyName: "MATOUK TEXTILE WORKS, INC.",
        planYear: 2019,
        employeeCount: 128,
        companyState: "MA",
        premiumSum: 1235052,
        brokerCommissionSum: 32153,
        participantsSum: 171,
      },
    ];

    const actualResult = await getCompanyData();

    expect(actualResult).toEqual(expectedResult);
  });

  it("throws an error if the request fails", async () => {
    nock(BASE_URL)
      .defaultReplyHeaders(NOCK_REPLY_HEADERS)
      .get(PATH)
      .reply(500, "BANG!!!");

    await expect(getCompanyData()).rejects.toThrow();
  });

  it("throws an error if the returned data is not the correct schema", async () => {
    nock(BASE_URL)
      .defaultReplyHeaders(NOCK_REPLY_HEADERS)
      .get(PATH)
      .reply(200, [{ unexpected: "data!" }]);

    await expect(getCompanyData()).rejects.toThrow();
  });
});
