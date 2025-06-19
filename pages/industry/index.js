import React from "react";
/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../../components/Layout/Layout";
import { MasterHeader } from "../../components/MasterHeader";
import { endPoint, envUrl } from "../../utils/factory";
import Router, { useRouter } from "next/router";
import { BreadcrumbUI } from "../../components/Breadcrumb";
import IndustriesUI from "../../components/Industry";

const industry = ({ pageData }) => {
  // console.log("************** industry pageData  = ", pageData);
  const router = useRouter();

  return (
    <div>
      <MasterHeader title="Home" isHomePage={true} />
      {pageData && (
        <Layout
          CategoryData={pageData.data.Category}
          assemblySolutionsList={pageData.data.assemblySolutionsList}
        >
          {pageData && (
            <Container>
              <Row>
                <BreadcrumbUI routedata={router.pathname.split('/').slice(1)} />
                <IndustriesUI industriesList={pageData.data.industriesList} />
              </Row>
            </Container>
          )}
        </Layout>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(`${envUrl.baseUrl}${endPoint.HomePageData}`);
  const pageData = await response.json();

  // //Get Our Popular Products
  // const products = await fetch(`${envUrl.baseUrl}${endPoint.products}`);
  // const productData = await products.json();
  // // //Get Our Category
  // const categories = await fetch(`${envUrl.baseUrl}${endPoint.categories}`);
  // const categoriesData = await categories.json();

  return {
    props: {
      pageData,
    },
  };
}

export default industry;
