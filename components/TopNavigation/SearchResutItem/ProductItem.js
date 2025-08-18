import Router from "next/router";
import React, { Component } from "react";
import { Col, Row, Image, Button } from "react-bootstrap";

const ProductItem = ({ product, styles }) => {
  const handleOnClick = () => {
    if (product && product.slug) {
      Router.push(`/${product.slug}`);
    }
  };

  return (
    <Row className={styles.row} onClick={() => handleOnClick()}>
      <Col sm={3} className={styles.col_1}>
        {product.product_media_list ? (
          <Image
            src={
              `${process.env.PRODUCT_CDN_URL}` +
              `${product.product_media_list[0].path}`
            }
            alt={product.name}
            className={styles.ProductImage}
          />
        ) : (
          <Image
            src="/images/default-product.png"
            alt={product.name}
            className={styles.logoImage}
          />
        )}
      </Col>
      <Col sm={9} className={styles.col_2}>
        {product && product.name ? product.name : ""}
      </Col>
    </Row>
  );
};
export default ProductItem;
