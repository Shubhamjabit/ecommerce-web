import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "../../../shared/Products/Products.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Link from "next/link";

const PreAssembledProductItem = ({ product }) => {
  return (
    <Link passHref={true} scroll={true} href={{ pathname: `/${product.slug}` }}>
      <a>
        <div className={styles.CategoryItemBox}>
          <div className={styles.CategoryOuterBox}>
            <div className={styles.Title}>{product.name}</div>
            <Row>
              <Col className={styles.productimage}>
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    className={styles.logoImage}
                  />
                ) : (
                  <Image
                    src="/images/default-product.png"
                    alt={product.name}
                    className={styles.logoImage}
                  />
                )}
              </Col>
            </Row>
            <div className={styles.Box}>
              <div className={styles.Name}>{product.name}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PreAssembledProductItem;
