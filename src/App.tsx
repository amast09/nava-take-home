import { useEffect, useState } from "react";
import "./App.css";
import AsyncRequest, {
  asyncRequestCompleted,
  AsyncRequestKinds,
  asyncRequestLoading,
  asyncRequestNotStarted,
  voidAsyncRequestFailed,
} from "./types/AsyncRequest";
import { CompanyBenefits } from "./types/CompanyBenefits";
import { CompanyBenefitsCard } from "./CompanyBenefitsCard";
import { getCompanyData } from "./getCompanyData";

type AllBenefitsProps = Readonly<{
  companiesRequest: AsyncRequest<ReadonlyArray<CompanyBenefits>>;
}>;

const AllBenefits: React.FC<AllBenefitsProps> = ({ companiesRequest }) => {
  switch (companiesRequest.kind) {
    case AsyncRequestKinds.NotStarted:
      return <></>;
    case AsyncRequestKinds.Loading:
      return <>Loading Company's Benefits</>;
    case AsyncRequestKinds.Failed:
      return <>Failed to Return Company's Benefits</>;
    case AsyncRequestKinds.Completed:
      return (
        <>
          {companiesRequest.result.map((company) => (
            <CompanyBenefitsCard key={company.ein} company={company} />
          ))}
        </>
      );
  }
};

const App: React.FC = () => {
  const [companiesRequest, setCompaniesRequest] = useState<
    AsyncRequest<ReadonlyArray<CompanyBenefits>>
  >(asyncRequestNotStarted());

  useEffect(() => {
    setCompaniesRequest(asyncRequestLoading());
    getCompanyData()
      .then((companiesBenefits) =>
        setCompaniesRequest(asyncRequestCompleted(companiesBenefits)),
      )
      .catch(() => setCompaniesRequest(voidAsyncRequestFailed()));
  }, []);

  return (
    <div className="app">
      <div className="benefit-cards-container">
        <AllBenefits companiesRequest={companiesRequest} />
      </div>
    </div>
  );
};

export default App;
