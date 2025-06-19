/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import Router, { useRouter } from "next/router";
import { BreadcrumbUI } from "../components/Breadcrumb";
import PreAssembledUI from "../components/PreAssembled/index";
function preassembled({ pageData, preassemblesCategory }) {
  const router = useRouter();
  // handle Customization
  const handleCustomization = (itemId) => {
    if (itemId)
      router.push({ pathname: "customization", query: { itemId: itemId } });
  };
  // console.log("!!!!!!!!!!!!!!!! preassemblesCategory", preassemblesCategory);
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
                <PreAssembledUI preList={preassemblesCategory.data} />
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
    `${envUrl.baseUrl}${endPoint.getPreassemblesCategory}`
  );
  let preassemblesCategory = {};
  preassemblesCategory.data = [];
  const pageData = await response.json();
  if (responseTwo.status == 200) {
    preassemblesCategory = await responseTwo.json();
  }

  return {
    props: {
      pageData,
      preassemblesCategory,
    },
  };
}

export default preassembled;
