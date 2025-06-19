/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { BreadcrumbUI } from "../components/Breadcrumb";
import { Row, Container, Col } from "react-bootstrap";
import { MasterHeader } from "../components/MasterHeader";
import ProductsearchItem from "../components/shared/Products/ProductsearchItem";
import Loader from "../components/shared/Loader/Loader";
import { endPoint, envUrl } from "../utils/factory";
import { Bars } from "react-loader-spinner";
import { Empty } from "antd";
function searchProduct({ pageData }) {
  // console.log("pppppppp pageData searchProduct", pageData);
  const router = useRouter();
  const paths = router.asPath.split("/");
  const [product, setProduct] = useState(null);
  console.log("pppppp product searchProduct", product);
  const [total, SetTotal] = useState();
  const [categoryList, setCategoryList] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryList = (categoryList) => {
    setCategoryList(categoryList);
  };
  const handleOnChange = async (e) => {
    setLoading(true);

    const variables = {
      page: 1,
      pageSize: 500,
      keyword: router.query.search,
    };
    const response = await fetch(`${envUrl.baseUrl}${endPoint.productSearch}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    });
    const res = await response.json();

    setLoading(false);
    setProduct(res.product.data);
    SetTotal(res.product.total);
  };
  useEffect(() => {
    if (router.query.search) {
      handleOnChange();
    }
  }, [router.query.search]);
  useEffect(() => {
    if (router.query.search) {
      handleOnChange();
    }
  }, []);
  return (
    <div>
      {pageData && (
        <>
          <MasterHeader title={paths} />
          <Layout
            CategoryData={pageData.categoryRes}
            assemblySolutionsList={pageData.assemblySolutionsList}
          >
            <Container>
              <Row>
                <BreadcrumbUI activepath={router.pathname.replace("/", "")} />
              </Row>

              <Divider light style={{ marginBottom: "20px" }} />
              <Row>
                {/* <Col xs={12} lg={3} md={3}>
              <CategoryFilters
                handleCategoryList={handleCategoryList}
                categoryList={categoryList}
              />
            </Col> */}
                <Col>
                  {/* <div> */}
                  <Container style={{ maxWidth: "100%" }}>
                    <Row>
                      <Col xs={12} lg={12} md={12}>
                        <Typography
                          variant="h4"
                          style={{ textAlign: "center", fontSize: "1.5rem" }}
                        >
                          Search results for : '{router.query.search}'
                        </Typography>
                        <span>{total} Product(s) found</span>
                        <Divider
                          light
                          style={{ marginBottom: "10px", marginTop: "5px" }}
                        />
                      </Col>
                      {loading && (
                        <Col xs={12} lg={12} md={12}>
                          <div className="searchLoader">
                            <Bars
                              height="80"
                              width="80"
                              color="#2595d4"
                              ariaLabel="bars-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          </div>
                        </Col>
                      )}
                      {product?.length == 0 && <Empty />}
                      {product &&
                        product.map((productItem, index) => {
                          return (
                            <ProductsearchItem
                              product={productItem}
                              i={index}
                              key={index}
                            />
                          );
                        })}
                    </Row>
                  </Container>
                  {/* </div> */}
                </Col>
              </Row>
            </Container>
          </Layout>
        </>
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

export default searchProduct;
