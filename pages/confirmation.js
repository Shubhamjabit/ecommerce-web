import { Layout } from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { BreadcrumbUI } from "../components/Breadcrumb";
import { Row, Container } from "react-bootstrap";
import React from "react";
import { MasterHeader } from "../components/MasterHeader";
import { OrderConfirmation } from "../components/OrderConfirmation";
import Loader from "./../components/shared/Loader/Loader";
import { updateMembership } from "../store/actions/userActions";
import { endPoint, envUrl } from "../utils/factory";

export default function Confirmation({ pageData }) {
  const router = useRouter();
  console.log("CONFIRMATIONNNNNNNNNNNNNNNNNNNNNNN router = ", router);
  const trackingCode = router.query.ref;
  const email = router.query.email;
  console.log("CONFIRMATIONNNNNNNNNNNNNNNNNNNNNNN pageData = ", pageData);
  return (
    <div>
      <MasterHeader title="Confirmation" />
      <Layout
        CategoryData={pageData.categoryRes}
        assemblySolutionsList={pageData.assemblySolutionsList}
        isHomePage={true}
      >
        {pageData && (
          <>
            <Container>
              <Row>
                <BreadcrumbUI activepath={router.pathname.replace("/", "")} />
              </Row>
            </Container>

            <OrderConfirmation trackingCode={trackingCode} email={email} />
          </>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(`${envUrl.baseUrl}${endPoint.webCategory}`);
  const pageData = await response.json();
  return {
    props: { pageData },
  };
}
