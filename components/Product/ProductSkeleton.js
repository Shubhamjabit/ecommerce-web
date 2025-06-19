import styles from "./Product.module.scss";
import React, { useState, useEffect } from "react";
import Features from "./components/Features";
import QtySection from "./components/QtySection";
import Button from "@mui/material/Button";
import StarRow from "./components/StarRow";
import PriceSection from "./components/PriceSection";
import IconButton from "@mui/material/IconButton";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { envUrl, endPoint } from "../../utils/factory";
import PreassemblePriceSection from "./components/PreassemblePriceSection";
import { useRouter } from "next/router";
import { Alert, Skeleton, Snackbar } from "@mui/material";
import { decryptData } from "../../services/util/customEncryptDecryprt";
import moment from "moment-timezone";

const ProductSkeleton = () => {
  return (
    <>
      <Row className={styles.productOuterBoxf}>
        <Col md={6} sm={12} xs={12}>
          <Skeleton variant="rounded" className={styles.SkeletonBox} />
        </Col>
        <Col md={6} sm={12} xs={12}>
          <div className={styles.productdetailsBox}>
            <Skeleton variant="rounded" className={styles.SkeletonBox} />
          </div>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <div style={{ marginTop: "30px" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "90%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "60%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "50%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "20%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "10%" }} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductSkeleton;
