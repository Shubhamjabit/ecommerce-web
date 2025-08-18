import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import { useRouter } from "next/router";
import { positions, Provider, useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { LoginUI } from "../components/Login";

function Login({ pageData }) {
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
      <MasterHeader title="Create Account" />
      <Provider template={AlertTemplate} {...options}>
        {!user ? (
          <>
            {pageData && (
              <Layout
                CategoryData={pageData.categoryRes}
                assemblySolutionsList={pageData.assemblySolutionsList}
              >
                {pageData && <LoginUI />}
              </Layout>
            )}
          </>
        ) : null}
      </Provider>
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

export default Login;
