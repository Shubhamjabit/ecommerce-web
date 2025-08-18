import React, { useEffect, useState, useRef } from "react";
import styles from "./Category.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../shared/Loader/Loader";
import { useRouter } from "next/router";
import CategoryItem from "../shared/CategoryItem/CategoryItem";

const CategotyList = ({ subcategory }) => {
  const defaultPageSize = 18;
  const router = useRouter();
  const urlPath = router.query.index;
  const subUrlPath = router.query.indextwo;
  const subsubUrlPath = router.query.indexthree;
  const paths = router.asPath.replace("/", "").replace(/-/g, " ");
  const CategoryGrid = () =>
    subcategory &&
    subcategory
      .sort((a, b) => a.priority - b.priority)
      .map((category, i) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <CategoryItem category={category} key={i} />
        );
      });
  return (
    <>
      <div className={styles.ProductGrid}>
        <CategoryGrid />
      </div>
    </>
  );
};

export default CategotyList;
