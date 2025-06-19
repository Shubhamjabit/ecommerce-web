import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import Cart from "../components/Cart/index";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
// import Styles from "./cartitem.module.scss";

const cart = ({ pageData }) => {
  console.log(
    "%%%%%%%%%%%%%% pageData in cart from webCategory endpoint",
    pageData
  );
  // const user = useSelector((state) => state.userReducer.user);
  var user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const myLoader = ({ src, width, quality }) => {
    return `${process.env.WEB_DOMAIN}${src}?w=${width}&q=${quality || 75}`;
  };

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
                {user ? (
                  <Cart />
                ) : (
                  <Row style={{ justifyContent: "center" }}>
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      style={{
                        paddingTop: "15px",
                        paddingBottom: "15px",
                      }}
                    >
                      <div
                        style={{
                          // width: "100%",
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <span>
                            <img src="/images/cart_image.png" alt="Cart View" />
                          </span>
                          <div style={{ marginTop: "25px" }}>
                            <h2
                              style={{
                                color: "#D98787",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              Looking For Your Cart
                            </h2>
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#2595D4",
                                textAlign: "center",
                              }}
                            >
                              Please Login To View Your Cart
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
              </Row>
            </Container>
          )}
        </Layout>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(`${envUrl.baseUrl}${endPoint.webCategory}`);

  const pageData = await response.json();

  return {
    props: {
      pageData,
    },
  };
}

export default cart;
