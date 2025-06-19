import React, { useState } from "react";
import { Layout } from "../../../Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { BreadcrumbUI } from "../../../Breadcrumb/PreAssembledSubCatPage/index";
import styles from "../../../Products/Products.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PreAssembledProductItemProductItem from "./PreAssembledProductItem";
import PaginationUi from "../../../shared/Pagination/PaginationUi";

const PreAssembledProductList = ({ CategoryData, productList, total }) => {
  const router = useRouter();
  const urlPath = router.query.index;
  const subUrlPath = router.query.indextwo;
  const paths = router.asPath.split("/");
  const activePath = paths[1];
  const routeData = [];
  const [productpageopen, setProductPageOpen] = useState(false);
  const [page, setPage] = useState(1);
  const handleClose = () => {
    setProductPageOpen(false);
  };
  const handlePagination = (page) => {
    setPage(page);
  };
  const defaultPageSize = router.query.productRange
    ? parseInt(router.query.productRange)
    : 25;

  const ProductGrid = () =>
    productList &&
    productList.map((product, i) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <PreAssembledProductItemProductItem product={product} />
      );
    });
  return (
    <div>
      <Layout CategoryData={CategoryData}>
        <BreadcrumbUI activepath={urlPath} routedata={routeData} />
        <Container>
          <Row>
            <Col>
              {productList && productList.length > 0 ? (
                <>
                  <div className={styles.ProductGrid}>
                    <ProductGrid />
                  </div>
                  <div className={styles.paginationUI}>
                    <PaginationUi
                      page={page}
                      totalPosts={total}
                      handlePagination={handlePagination}
                      pageSize={defaultPageSize}
                    />
                  </div>
                </>
              ) : (
                <Container fluid>
                  <Row className="justify-content-md-center">
                    <h2>No Products</h2>
                  </Row>
                </Container>
              )}
            </Col>
            {/* <Col sm={2}>
          <div className={styles.Filters}>
            <CategoryFilter />
          </div>
        </Col> */}
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default PreAssembledProductList;
