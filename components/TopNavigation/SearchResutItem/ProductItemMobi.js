import Router from "next/router";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { imageURL } from "../../../../data/Data";
import Image from "next/image";
import { productImageUrl } from "../../../../utils/factory";
const ProductItemMobi = ({ product, style }) => {
  // const category_hierarchy = product.category_hierarchy.length;
  // const categories_0 = product.category_hierarchy[0].name
  //   .replace(/ /g, '-')
  //   .toLowerCase();
  // console.log("###########product", product);
  const imgUrl =
    product && product.product_media && product.product_media.length > 0
      ? imageURL(product.product_media[0])
      : "";
  const handleOnClick = () => {
    if (product && product.slug) {
      Router.push(`/${product.slug}`);
    }
  };

  return (
    <div>
      <Row
        className={style.row}
        onClick={() => {
          handleOnClick();
        }}
      >
        <Row xs={4} sm={4} className={style.col_1}>
          <img
            src={`${productImageUrl.PRODUCT_CDN_URL}${product.product_media_list[0].path} `}
            width={60}
          />
          {/* <Image
            src={`${productImageUrl.PRODUCT_CDN_URL}${product.product_media_list[0].path} `}
            alt={`${product.name}`}
            layout="responsive"
            height={60}
            width={60}
            quality={100}
          /> */}
        </Row>
        <Row className={style.col_2}>
          {product && product.name ? product.name.substring(0, 20) + "..." : ""}
        </Row>
      </Row>
    </div>
  );
};
export default ProductItemMobi;
