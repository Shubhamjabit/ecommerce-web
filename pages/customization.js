/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import Router, { useRouter } from "next/router";
import { endPoint, envUrl } from "../utils/factory";
import { BreadcrumbUI } from "../components/Breadcrumb";
import ItemCustomization from "../components/PreAssembled/ItemCustomization";
function customization({ pageData, preassemblesData, preassemblesCableData }) {
  const router = useRouter();
  let data = preassemblesData.data.preassemblesData;
  let cableData = preassemblesData.data.preassemblesCableData;
  // console.log("dddddd data", data);
  return (
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
                <ItemCustomization data={data} cableData={cableData} />
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
  const responseTwo = await fetch(`${envUrl.baseUrl}${endPoint.HomePageData}`);

  const pageData = await response.json();
  const preassemblesData = await responseTwo.json();
  return {
    props: {
      pageData,
      preassemblesData,
    },
  };
}

export default customization;
