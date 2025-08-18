import React, { Component } from "react";
import { Row } from "react-bootstrap";
import styles from "../Product.module.scss";
import Link from "next/link";
import Rating from "@mui/material/Rating";
const StarRow = () => {
  return (
    <div className={styles.starSection}>
      <div className={styles.star}>
        <Rating
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="simple-controlled"
          value={5}
          readOnly
        />
      </div>
      {/* <div className={styles.rate}>{reviews && reviews.mean_start_rating}</div> */}
      <div>|</div>

      <div className={styles.review}>
        <a href="#">12 Review</a>
      </div>
    </div>
  );
};

export default StarRow;
