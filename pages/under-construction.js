/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col, Image } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import Router, { useRouter } from "next/router";
import { AboutUI } from "../components/About";

function UnderConstruction({ pageData }) {
  const router = useRouter();
  return (
    <div>
      <MasterHeader title="Unde Construction" isHomePage={true} />
      {pageData && (
        <Layout CategoryData={pageData}>
          {" "}
          assemblySolutionsList={pageData.data.assemblySolutionsList}
          {pageData && (
            <Container>
              <Row style={{ padding: "100px 0px" }}>
                <div className="searchLoader ">
                  <Image
                    style={{ maxWidth: "80%" }}
                    src="/images/page-under-construction.jpg"
                    rounded
                    fluid
                  />
                </div>
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

  const pageData = await response.json();

  return {
    props: {
      pageData,
    },
  };
}

export default UnderConstruction;
