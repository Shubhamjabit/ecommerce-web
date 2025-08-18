/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import Router, { useRouter } from "next/router";
import { endPoint, envUrl } from "../utils/factory";
import { positions, Provider, useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { EmailVerify } from "../components/ForgotPassword/ForgotPasswordEmailVerify";
function ForgotPassword({ pageData }) {
  const router = useRouter();
  const options = {
    timeout: 3000,
    position: positions.BOTTOM_CENTER,
  };
  if (typeof window !== "undefined") {
    var user = JSON.parse(localStorage.getItem("user"));
    console.log("kkkkkkkkkkkkkkkk user", user);
    if (user) {
      router.push("/");
      // router.replace("/");
    }
  }
  return (
    <div>
      <MasterHeader title="Forgot password" isHomePage={true} />
      {pageData && (
        <Provider template={AlertTemplate} {...options}>
          <Layout
            CategoryData={pageData.categoryRes}
            assemblySolutionsList={pageData.assemblySolutionsList}
          >
            {pageData && <EmailVerify />}
          </Layout>
        </Provider>
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

export default ForgotPassword;
