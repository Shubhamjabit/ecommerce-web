import React from "react";
import styles from "./PreAssembledSubCat.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../../../shared/Loader/Loader";
import { useRouter } from "next/router";
import PreAssembledSubCatItem from "./PreAssembledSubCatItem";
const PreAssembledSubCatList = ({ preList }) => {
  const PreAssembledGrid = () =>
    preList &&
    preList.map((preSubCat, i) => {
      return (
        <>
          {/* eslint-disable-next-line react/jsx-key */}
          <PreAssembledSubCatItem preSubCat={preSubCat} key={i} />
        </>
      );
    });
  return (
    <>
      <div className={styles.ProductGrid}>
        <PreAssembledGrid />
      </div>
    </>
  );
};

export default PreAssembledSubCatList;
