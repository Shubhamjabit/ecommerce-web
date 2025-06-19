import {
  Container,
  Tabs,
  Tab,
  Row,
  Col,
  Form,
  Accordion,
} from "react-bootstrap";
import styles from "./Product.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import parse from "html-react-parser";
//import { Document, Page } from "react-pdf";

export const ProductDetails = ({ product, T1, T2, cable }) => {
  const TAB_SPEC = "specifications ";
  const TAB_DESCRIPTION = "description";
  const TAB_COMMENTS = "comments ";
  const TAB_CERTIFICATION = "certification ";
  const TAB_DOWNLOAD = "download ";
  const [productDetailsTabKey, setProductDetailsTabKey] = useState(
    1 > 0 ? TAB_DESCRIPTION : TAB_SPEC
  );
  console.log("pppppp", product);

  /* For Viewing */
  const handleDownloadItemToView = (file) => {
    console.log("fileeeeeeeeee", file);
    // using Java Script method to get PDF file
    fetch(`${file[1]}`).then((response) => {
      response
        .blob()
        .then((blob) => {
          // Creating new object of PDF file
          const fileURL = `${process.env.PRODUCT_CDN_URL}` + "/" + `${file[1]}`;
          //console.log("#########DocumentImage######## fileURL", fileURL);
          // Setting various property values
          let alink = document.createElement("a");
          //console.log("#########DocumentImage######## alink", alink);
          alink.href = fileURL;
          alink.target = "_blank";
          alink.download = `${file[1]}`;
          alink.click();
        })
        .catch((error) => console.error("Error in handleDownloadItem", error));
    });
  };

  /* For Download */
  const handleDownloadItem = (file) => {
    console.log("fileeeeeeeeee", file);
    // using Java Script method to get PDF file
    fetch(`${process.env.PRODUCT_CDN_URL}` + "/" + `${file[1]}`).then(
      (response) => {
        response
          .blob()
          .then((blob) => {
            console.log("blob", blob);
            let alink = document.createElement("a");
            alink.href = window.URL.createObjectURL(blob);
            alink.target = "_blank";
            alink.download = `${product.name}-${file[1]}`;
            alink.click();
          })
          .catch((error) =>
            console.error("Error in handleDownloadItem", error)
          );
      }
    );
  };

  const handleCertificateItem = (file) => {
    // using Java Script method to get PDF file
    fetch(`${file[1]}`).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = `${process.env.PRODUCT_CDN_URL}` + "/" + `${file[1]}`;
        //console.log("#########DocumentImage######## fileURL", fileURL);
        // Setting various property values
        let alink = document.createElement("a");
        //console.log("#########DocumentImage######## alink", alink);
        alink.href = fileURL;
        alink.target = "_blank";
        alink.download = `${file[1]}`;
        alink.click();
      });
    });
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  // useEffect(() => {
  //   product.product_key_features = product.product_key_features.replaceAll(
  //     "&lt;",
  //     "<"
  //   );
  //   product.product_key_features = product.product_key_features.replaceAll(
  //     "&gt;",
  //     ">"
  //   );
  //   console.log("#####", product.product_key_features);
  // }, []);

  return (
    <div className={styles.productDescriptionArea}>
      <Tabs
        id="product-details"
        activeKey={productDetailsTabKey}
        onSelect={(k) => setProductDetailsTabKey(k)}
      >
        <Tab eventKey={TAB_DESCRIPTION} title="Description">
          {product && product.description ? (
            <p className={styles.productDetails}>
              {parse(product.description)}
            </p>
          ) : (
            <div
              className={styles.productDetails}
              style={{ textAlign: "center" }}
            >
              {(T1 && T1.sparkyId == null) ||
              (T1 && T1.sparkyId !== null && T2 && T2.sparkyId == null) ||
              (T2 && T2.sparkyId !== null) ? (
                <>
                  This is your customized lead and we will review and may
                  contact you for more information. We will also email you the
                  Datasheet and specification shortly for your approval to
                  commence production.
                </>
              ) : (
                <Empty />
              )}
            </div>
          )}
        </Tab>
        <Tab eventKey={TAB_SPEC} title="Specifications ">
          {product && product.product_key_features ? (
            <div className={styles.productDetails}>
              {parse(product.product_key_features)}
            </div>
          ) : (
            <div
              className={styles.productDetails}
              style={{ textAlign: "center" }}
            >
              <Empty />
            </div>
          )}
        </Tab>
        {/* <Tab eventKey={TAB_COMMENTS} title="Comments">
          <div
            className={styles.productDetails}
            style={{ textAlign: "center" }}
          >
            <Empty />
          </div>
        </Tab> */}
        {/* <Tab eventKey={TAB_CERTIFICATION} title="Certification">
          {product &&
          product.product_certificate &&
          product.product_certificate.length > 0 ? (
            <div className={styles.productDetails}>
              <Grid container spacing={2}>
                {product &&
                  product.product_certificate.map((row) => (
                    <Grid
                      item
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      key={row.CertificateName}
                    >
                      <Paper elevation={2}>
                        <div className={styles.ProductCertificate}>
                          <CardHeader
                            className={styles.CardHeader}
                            title={row.CertificateName}
                          />

                          {row.CertificateImage.split(".")[1] === "pdf" ? (
                            <>
                              <iframe
                                src={
                                  `${process.env.PRODUCT_CDN_URL}` +
                                  `${row.CertificateImage}` +
                                  `#toolbar=0`
                                }
                                style={{ width: "100%" }}
                                height="600"
                              ></iframe>
                            </>
                          ) : (
                            <CardMedia
                              className={styles.CardMedia}
                              component="img"
                              image={
                                `${process.env.PRODUCT_CDN_URL}` +
                                `${row.CertificateImage}`
                              }
                              alt={row.CertificateName}
                            />
                          )}
                          <CardActions className={styles.CardActions}>
                            <Button
                              onClick={() =>
                                handleCertificateItem(
                                  row.CertificateImage.split("/")
                                )
                              }
                              variant="outlined"
                              startIcon={<CloudDownloadIcon />}
                            >
                              Download
                            </Button>
                          </CardActions>
                        </div>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "50px 0px" }}>
              <Empty />
            </div>
          )}
        </Tab> */}
        <Tab eventKey={TAB_DOWNLOAD} title="Download">
          {product &&
          product.product_document &&
          product.product_document.length > 0 ? (
            <div
              className={styles.productDetails}
              style={{ textAlign: "center" }}
            >
              <TableContainer className={styles.DocumentTableContainer}>
                <Table>
                  <TableBody>
                    {product &&
                      product.product_document.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.DocumentName}
                          </TableCell>
                          <TableCell align="right">
                            {/* <a
                            href={
                              `${process.env.PRODUCT_CDN_URL}` +
                              `${row.DocumentImage}`
                            }
                            download="facebook"
                            target="_blank"
                            rel="noreferrer"
                          ></a> */}
                            <Button
                              onClick={() =>
                                handleDownloadItem(row.DocumentImage.split("/"))
                              }
                              variant="outlined"
                              startIcon={<CloudDownloadIcon />}
                            >
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div
              className={styles.productDetails}
              style={{ textAlign: "center" }}
            >
              <Empty />
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};
