/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import Router, { useRouter } from "next/router";
import { BreadcrumbUI } from "../components/Breadcrumb";
import ResourcesUI from "../components/Resources";
function brands({ pageData, cataloguesList }) {
  console.log("^^^^^^^^^^^^^^^^^ pageData", pageData);
  const router = useRouter();
  return (
    // <div> brands page</div>
    <div>
      <MasterHeader title="Home" isHomePage={true} />
      {pageData && (
        <Layout
          CategoryData={pageData.categoryRes}
          assemblySolutionsList={pageData.assemblySolutionsList}
        >
          {pageData && (
            <Container>
              <Row>
                <BreadcrumbUI activepath={router.pathname.replace("/", "")} />
                <ResourcesUI cataloguesList={cataloguesList.data} />
              </Row>
            </Container>
          )}
        </Layout>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(`${envUrl.baseUrl}${endPoint.webCategory}`);
  const responseTwo = await fetch(
    `${envUrl.baseUrl}${endPoint.getCataloguesList}`
  );
  let cataloguesList = {};
  cataloguesList.data = [];
  const pageData = await response.json();
  if (responseTwo.status == 200) {
    cataloguesList = await responseTwo.json();
  }

  return {
    props: { pageData, cataloguesList },
  };
}

export default brands;
