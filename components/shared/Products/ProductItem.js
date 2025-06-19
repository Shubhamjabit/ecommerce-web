import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./Products.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Link from "next/link";

const ProductItem = ({ product }) => {
  return (
    <Link passHref={true} scroll={true} href={{ pathname: `/${product.slug}` }}>
      <a>
        <div className={styles.CategoryItemBox}>
          <div className={styles.CategoryOuterBox}>
            {/* <div className={styles.Title}>
              {product.category_hierarchy[0].name.split("/")[1]}
            </div> */}
            <Row>
              <Col className={styles.productimage}>
                {product.product_media_list ? (
                  <Image
                    src={
                      `${process.env.PRODUCT_CDN_URL}` +
                      `${product.product_media_list[0].path}`
                    }
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

export default ProductItem;
