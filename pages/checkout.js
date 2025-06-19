import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import OnePageCheckout from "../components/OnePageCheckout";
import NewCheckout from "../components/NewCheckout";
import { useRouter } from "next/router";
import { positions, Provider, useAlert } from "react-alert";
function Checkout({ pageData }) {
  const router = useRouter();
  const options = {
    timeout: 3000,
    position: positions.BOTTOM_CENTER,
  };
  if (typeof window !== "undefined") {
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/");
      // router.replace("/");
    }
  }
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
                {/* <OnePageCheckout /> */}
                <NewCheckout />
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

export default Checkout;
