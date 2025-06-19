/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../../components/Layout/Layout";
import { MasterHeader } from "../../components/MasterHeader";
import Router, { useRouter } from "next/router";
import { endPoint, envUrl } from "../../utils/factory";
import { positions, Provider, useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { CodeVerify } from "../../components/ForgotPassword/ForgotPasswordCodeVerify";
import { ResetPassword } from "../../components/ForgotPassword/PasswordReset";
import { useState } from "react";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
function ResetPasswordPage({ pageData }) {
  const router = useRouter();
  console.log("rrrrrr router", router);
  const token = router.query.token;
  console.log("rrrrrr routerQueryOne", token);
  const options = {
    timeout: 3000,
    position: positions.BOTTOM_CENTER,
  };
  /* this only decodes the token and does not verify it */
  // const { decodedToken, isExpired } = useJwt(token);
  // console.log("decoded isExpired", decodedToken, isExpired);
  const [isValidToken, setIsValidToken] = useState(false);
  console.log("isValidToken", isValidToken);
  const [decodedToken, setDecodedToken] = useState(null);
  console.log("decodedToken", decodedToken);

  const verifyToken = (data) => {
    axios
      .post(`${envUrl.baseUrl}${endPoint.verifyTokens}`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log("!!!9999999 response", response);
        if (response.status == 200) {
          setIsValidToken(true);
          setDecodedToken(response.data.decodedToken);
        } else {
          setIsValidToken(false);
        }
      })
      .catch((error) => {
        console.log("API error in verifyToken :::::", error);
      })
      .finally(() => {});
  };
  useEffect(() => {
    if (token) {
      verifyToken({ token: token, type: "RESET_PASSWORD" });
    } else {
      console.log("Password reset error!");
    }
  }, []);

  return (
    <>
      <div>
        <MasterHeader title="Forgot password" isHomePage={true} />
        {pageData && (
          <Provider template={AlertTemplate} {...options}>
            <Layout
              CategoryData={pageData.categoryRes}
              assemblySolutionsList={pageData.assemblySolutionsList}
            >
              {isValidToken ? (
                <>
                  <>{pageData && <ResetPassword email={decodedToken} />}</>
                </>
              ) : (
                <Row>
                  <Col>
                    <h2>Incorrect or expired link! Please try again.</h2>
                    {/* {pageData && <ResetPassword email={decodedToken} />} */}
                  </Col>
                </Row>
              )}
            </Layout>
          </Provider>
        )}
      </div>
    </>
    // <div>
    //   <MasterHeader title="Forgot password" isHomePage={true} />
    //   {pageData && (
    //     <Provider template={AlertTemplate} {...options}>
    //       <Layout
    //         CategoryData={pageData.categoryRes}
    //         assemblySolutionsList={pageData.assemblySolutionsList}
    //       >
    //         {pageData && <ResetPassword />}
    //       </Layout>
    //     </Provider>
    //   )}
    // </div>
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

export default ResetPasswordPage;
