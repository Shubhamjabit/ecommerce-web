/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import Router, { useRouter } from "next/router";
import { BreadcrumbUI } from "../components/Breadcrumb";
import BrandsUI from "../components/Brands";
function brands({ pageData, brandsList }) {
  // console.log("^^^^^^^^^^^^^^^^^ pageData", pageData);
  // console.log("^^^^^^^^^^^^^^^^^2222 brandsList", brandsList);
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
                <BrandsUI
                  brandsList={brandsList.data}
                  //   CategoryDataBySlug={pageData.data.categorybyslug[0]}
                  //   CategoryData={pageData.data.category}
                />
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
  const responseTwo = await fetch(`${envUrl.baseUrl}${endPoint.getBrandsList}`);
  const pageData = await response.json();
  let brandsList = {};
  brandsList.data = [];
  if (responseTwo.status == 200) {
    brandsList = await responseTwo.json();
  }
  return {
    props: { pageData, brandsList },
  };
}

export default brands;
