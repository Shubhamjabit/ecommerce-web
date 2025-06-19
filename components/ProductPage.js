import React from "react";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product/Product";
import RecommendedProducts from "./RecommendedProducts";
import { Layout } from "../components/Layout/Layout";
import { BreadcrumbUI } from "./Breadcrumb/ProductPage";
import CreditCustomers from "./Product/components/CreditCustomers";
import ChatWithUs from "./Product/components/ChatWithUs";
import Product_Skeleton from "./Product/ProductSkeleton";
const ProductPage = ({ CategoryData, product }) => {
  // console.log("product by slug", product);
  const router = useRouter();
  const urlPath = router.query.index;
  const routeData = [];
  console.log("*************** product = ", product);
  return (
    <Container>
      <BreadcrumbUI
        activepath={urlPath}
        routedata={routeData}
        productName={product?.name}
      />
      <Row style={{ paddingBottom: "20px" }}>
        <Col md={9} sm={12} xs={12}>
          {urlPath == "customized-product" ? (
            <Product product={product} urlPath={urlPath} />
          ) : (
            <Product product={product} />
          )}
          {/* <Product product={product} urlPath={urlPath} /> */}
        </Col>
        <Col md={3} sm={12} xs={12}>
          <RecommendedProducts
            products={product && product.bought_together}
            currentProduct={product}
          />
          <CreditCustomers />
          <ChatWithUs />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
