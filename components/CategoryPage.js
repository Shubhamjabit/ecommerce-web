import React, { useState, useEffect } from "react";
import { Layout } from "./Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { BreadcrumbUI } from "./Breadcrumb/CategoryPage";
import styles from "./../styles/Home.module.scss";
import CategotyProduct from "./Products/CategotyProduct";
import CategoryFilter from "./Products/CategoryFilter";
import ProductPage from "./ProductPage";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "next/link";

const CategoryPage = ({
  products,
  CategoryData,
  total,
  assemblySolutionsList,
}) => {
  const router = useRouter();
  console.log("rrrrrrrrr", router);
  const urlPath = router.query.index;
  console.log("urlPath", urlPath);
  console.log("urlPath assemblySolutionsList", assemblySolutionsList);
  const subUrlPath = router.query.indextwo;
  const paths = router.asPath.split("/");
  const activePath = paths[1];
  const routeData = [];
  const [productpageopen, setProductPageOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isShowCustButton, setIsShowCustButton] = useState(false);
  console.log("rrrrrrrrrrrrr page", page);
  const handleClose = () => {
    setProductPageOpen(false);
  };
  const handlePagination = (page) => {
    setPage(page);
  };
  const defaultPageSize = router.query.productRange
    ? parseInt(router.query.productRange)
    : 25;

  // handle Customization
  const handleCustomization = () => {
    router.replace("/customization");
  };

  // console.log("UUUUUUUUUUUUUUUUUUUU urlPath=", urlPath);

  function ciEquals(a, b) {
    // sensitivity = "accent" also an option
    return typeof a === "string" && typeof b === "string"
      ? a.localeCompare(b, undefined, { sensitivity: "base" }) === 0
      : a === b;
  }

  useEffect(() => {
    console.log("url replaceAll", urlPath.replaceAll("-", " "));
    for (let i = 0; i < assemblySolutionsList.length; i++) {
      if (
        ciEquals(assemblySolutionsList[i].name, urlPath.replaceAll("-", " "))
      ) {
        setIsShowCustButton(true);
      }
    }
  }, []);

  return (
    <div>
      <Layout
        CategoryData={CategoryData}
        assemblySolutionsList={assemblySolutionsList}
      >
        <BreadcrumbUI activepath={urlPath} routedata={routeData} />

        <Container>
          {isShowCustButton ? (
            <div
              style={{
                width: "100%",
                marginBottom: "30px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <h3 style={{ color: "black", fontWeight: "800" }}>
                NOT IN THE LIST? CUSTOMIZE YOUR OWN LEAD
              </h3>
              <Link href="/customization">
                <a>
                  <button
                    style={{
                      border: "none",
                      background: "#f6821f",
                      padding: "8px 20px",
                      color: "#fff",
                      borderRadius: "5px",
                      fontWeight: "bold",
                    }}
                    // onClick={() => handleCustomization()}
                  >
                    Customize
                  </button>
                </a>
              </Link>
            </div>
          ) : null}
          <Row>
            <Col>
              <CategotyProduct
                total={total}
                products={products}
                page={page}
                setPage={setPage}
                pageSize={defaultPageSize}
                handlePagination={handlePagination}
              />
            </Col>
            {/* <Col sm={2}>
              <div className={styles.Filters}>
                <CategoryFilter />
              </div>
            </Col> */}
          </Row>
        </Container>
        {/* <Dialog
          open={productpageopen}
          fullWidth={true}
          maxWidth="lg"
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className={styles.ProDialogContent}>
            <ProductPage />
          </DialogContent>
        </Dialog> */}
      </Layout>
    </div>
  );
};

export default CategoryPage;
