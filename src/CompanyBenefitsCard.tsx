import { useState } from "react";
import { CompanyBenefits } from "./types/CompanyBenefits";
import "./CompanyBenefitsCard.css";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

export const CompanyBenefitsCard: React.FC<
  Readonly<{ company: CompanyBenefits }>
> = ({ company }) => {
  const [additionalDetailsVisible, setAdditionalDetailsVisible] =
    useState<boolean>(false);

  const {
    companyName,
    companyState,
    employeeCount,
    planYear,
    premiumSum,
    participantsSum,
    brokerCommissionSum,
  } = company;

  const toggleAdditionalDetails = (): void => {
    setAdditionalDetailsVisible(!additionalDetailsVisible);
  };

  return (
    <div className="company-benefits-card">
      <h1 className="company-benefits-card__name">{companyName}</h1>
      <div className="company-benefits-card__details">
        <div className="company-benefits-card__detail">
          <h2>State</h2>
          <p>{companyState}</p>
        </div>
        <div className="company-benefits-card__detail">
          <h2>Employees</h2>
          <p>{employeeCount}</p>
        </div>
        <div className="company-benefits-card__detail">
          <h2>Year</h2>
          <p>{planYear}</p>
        </div>
      </div>
      <div className="company-benefits-card__toggle-container">
        <div
          onClick={toggleAdditionalDetails}
          className="company-benefits-card__toggle"
        >
          Show{" "}
          {additionalDetailsVisible ? (
            <>
              Less<div className="chevron chevron__up"></div>
            </>
          ) : (
            <>
              More<div className="chevron chevron__down"></div>
            </>
          )}
        </div>
      </div>
      <div
        className={`company-benefits-card__additional-details ${
          additionalDetailsVisible ? "visible" : "hidden"
        }`}
      >
        <div className="company-benefits-card__detail">
          <h2>Premium:</h2>
          <p>{CURRENCY_FORMATTER.format(premiumSum)}</p>
        </div>
        <div className="company-benefits-card__detail">
          <h2>Participants:</h2>
          <p>{participantsSum}</p>
        </div>
        <div className="company-benefits-card__detail">
          <h2>Broker Commissions:</h2>
          <p>{CURRENCY_FORMATTER.format(brokerCommissionSum)}</p>
        </div>
      </div>
    </div>
  );
};
