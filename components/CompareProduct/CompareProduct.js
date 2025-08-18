import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import styles from "./CompareProduct.module.scss";
import Image from "react-bootstrap/Image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import { Switch, Typography } from "antd";
const { Paragraph, Text } = Typography;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
function CompareProduct({
  compareopen,
  handleCompareClose,
  currentProduct,
  compareProduct,
}) {
  // console.log("******* currentProduct", currentProduct);
  console.log("******* compareProduct", compareProduct);
  const [ellipsis, setEllipsis] = useState(true);
  return (
    <BootstrapDialog
      onClose={handleCompareClose}
      aria-labelledby="customized-dialog-title"
      open={compareopen}
      fullWidth={true}
      maxWidth="md"
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        className={styles.BootstrapDialogTitle}
        onClose={handleCompareClose}
      ></BootstrapDialogTitle>
      <DialogContent dividers className={styles.DialogContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={styles.ProductHeader}>
                  <Grid container spacing={2}>
                    <Grid item lg={5} md={6} sm={6} xs={12}>
                      <div className={styles.ProductTitle}>
                        {/* B05: Tinned Straight Copper Lugs */}
                        {currentProduct.name}
                      </div>
                    </Grid>
                    <Grid item lg={2} md={6} sm={6} xs={12}>
                      <div className={styles.ProductTitle}>v/s</div>
                    </Grid>
                    <Grid item lg={5} md={6} sm={6} xs={12}>
                      <div className={styles.ProductTitle}>
                        {/* B07: Tinned Straight Copper Lugs */}
                        {compareProduct.name}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <div className={styles.ProductGrid}>
                  <div className={styles.ProductImage}>
                    <Image
                      // src="/images/products/category.png"
                      src={
                        process.env.PRODUCT_CDN_URL +
                        currentProduct.product_media[0].path
                      }
                      alt=""
                      className={styles.logoImage}
                    />
                  </div>
                  <div className={styles.ProductDetail}>
                    <TableContainer className={styles.TableContainer}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Model
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: "250px",
                                display: "block",
                                overflow: "hidden",
                              }}
                            >
                              {/* {currentProduct.name} */}
                              {/* <Box
                                component="div"
                                md={{ textOverflow: "ellipsis" }}
                              > */}
                              {currentProduct.name}
                              {/* </Box> */}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Type
                            </TableCell>
                            <TableCell align="right">
                              {
                                currentProduct.category_hierarchy[0].name.split(
                                  "/"
                                )[0]
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Certificate
                            </TableCell>
                            <TableCell align="right">
                              {currentProduct.product_certificate
                                ? currentProduct.product_certificate[0]
                                    .CertificateName
                                : "No Certificate"}
                            </TableCell>
                          </TableRow>
                          {/* <TableRow>
                            <TableCell component="th" scope="row">
                              Size
                            </TableCell>
                            <TableCell align="right">
                              34mm x 450mm x 19mm
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Warranty
                            </TableCell>
                            <TableCell align="right">2 Years</TableCell>
                          </TableRow> */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className={styles.ProductPriceSection}>
                    <div className={styles.Box}>
                      <span className={styles.Price}>
                        ${currentProduct.product_price[0].price}
                      </span>
                      <span className={styles.Qty}>
                        {currentProduct?.product_price[0]?.quantity} -{" "}
                        {currentProduct?.product_price[1]?.quantity
                          ? currentProduct?.product_price[1]?.quantity
                          : currentProduct?.product_price[0]?.quantity}{" "}
                        pcs
                      </span>
                    </div>
                    <div className={styles.Box}>
                      <span className={styles.Price}>
                        $
                        {currentProduct?.product_price[1]?.price
                          ? currentProduct?.product_price[1]?.price
                          : currentProduct?.product_price[0]?.price}
                      </span>
                      <span className={styles.Qty}>
                        {currentProduct?.product_price[1]?.quantity
                          ? currentProduct?.product_price[1]?.quantity
                          : currentProduct?.product_price[0]?.quantity}{" "}
                        -{" "}
                        {currentProduct?.product_price[2]?.quantity
                          ? currentProduct?.product_price[2]?.quantity
                          : currentProduct?.product_price[0]?.quantity}{" "}
                        pcs
                      </span>
                    </div>
                    <div className={styles.Box}>
                      <span className={styles.Price}>
                        $
                        {currentProduct?.product_price[2]?.price
                          ? currentProduct?.product_price[2]?.price
                          : currentProduct?.product_price[0]?.price}
                      </span>
                      <span className={styles.Qty}>
                        {currentProduct?.product_price[2]?.quantity
                          ? currentProduct?.product_price[2]?.quantity
                          : currentProduct?.product_price[0]?.quantity}
                        + pcs
                      </span>
                    </div>
                  </div>
                  <div className={styles.ProductFooterSection}>
                    <Button
                      className={styles.Request}
                      style={{ visibility: "hidden" }}
                    >
                      Request for Product
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={styles.ProductGrid}>
                  <div className={styles.ProductImage}>
                    <Image
                      // src="/images/products/category.png"
                      src={
                        process.env.PRODUCT_CDN_URL +
                        compareProduct.product_media_list[0].path
                      }
                      alt=""
                      className={styles.logoImage}
                    />
                  </div>
                  <div className={styles.ProductDetail}>
                    <TableContainer className={styles.TableContainer}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Model
                            </TableCell>
                            <TableCell align="right">
                              {compareProduct.name}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Type
                            </TableCell>
                            <TableCell align="right">
                              {
                                compareProduct.categoryHeirarchy[0].name.split(
                                  "/"
                                )[0]
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Certificate
                            </TableCell>
                            <TableCell align="right">
                              {compareProduct.product_certificate
                                ? compareProduct.product_certificate[0]
                                    .CertificateName
                                : "No Certificate"}
                            </TableCell>
                          </TableRow>
                          {/* <TableRow>
                            <TableCell component="th" scope="row">
                              Size
                            </TableCell>
                            <TableCell align="right">
                              34mm x 450mm x 19mm
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Warranty
                            </TableCell>
                            <TableCell align="right">2 Years</TableCell>
                          </TableRow> */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className={styles.ProductPriceSection}>
                    <div className={styles.Box}>
                      <span className={styles.Price}>
                        ${compareProduct.priceJson[0].price}
                      </span>
                      <span className={styles.Qty}>
                        {compareProduct?.priceJson[0]?.quantity} -{" "}
                        {compareProduct?.priceJson[1]?.quantity
                          ? compareProduct?.priceJson[1]?.quantity
                          : compareProduct?.priceJson[0]?.quantity}{" "}
                        pcs
                      </span>
                    </div>
                    <div className={styles.Box}>
                      <span className={styles.Price}>
                        $
                        {compareProduct?.priceJson[1]?.price
                          ? compareProduct?.priceJson[1]?.price
                          : compareProduct?.priceJson[0]?.price}
                      </span>
                      <span className={styles.Qty}>
                        {compareProduct?.priceJson[1]?.quantity
                          ? compareProduct?.priceJson[1]?.quantity
                          : compareProduct?.priceJson[0]?.quantity}{" "}
                        -{" "}
                        {compareProduct?.priceJson[2]?.quantity
                          ? compareProduct?.priceJson[2]?.quantity
                          : compareProduct?.priceJson[0]?.quantity}{" "}
                        pcs
                      </span>
                    </div>
                    <div className={styles.Box}>
                      <span className={styles.Price}>
                        $
                        {compareProduct?.priceJson[2]?.price
                          ? compareProduct?.priceJson[2]?.price
                          : compareProduct?.priceJson[0]?.price}
                      </span>
                      <span className={styles.Qty}>
                        {compareProduct?.priceJson[2]?.quantity
                          ? compareProduct?.priceJson[2]?.quantity
                          : compareProduct?.priceJson[0]?.quantity}
                        + pcs
                      </span>
                    </div>
                  </div>
                  <div className={styles.ProductFooterSection}>
                    <Link href={compareProduct.slug}>
                      <a>
                        <Button className={styles.ViewProduct}>
                          View Product
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </BootstrapDialog>
  );
}

export default CompareProduct;
