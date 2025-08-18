/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import { useRouter } from "next/router";
import { positions, Provider, useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import UserDashboard from "../components/UserDashboard";
import { BreadcrumbUI } from "../components/Breadcrumb";
function dashboard({ pageData }) {
  const router = useRouter();
  const options = {
    timeout: 3000,
    position: positions.BOTTOM_CENTER,
  };
  if (typeof window !== "undefined") {
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
      // router.replace("/login");
    }
  }
  return (
    <div>
      <MasterHeader title="Dashboard" />
      <Provider template={AlertTemplate} {...options}>
        {user ? (
          <>
            {pageData && (
              <Layout
                CategoryData={pageData.categoryRes}
                assemblySolutionsList={pageData.assemblySolutionsList}
              >
                <Container>
                  <BreadcrumbUI activepath={router.pathname.replace("/", "")} />
                  {pageData && <UserDashboard />}
                </Container>
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

export default dashboard;
