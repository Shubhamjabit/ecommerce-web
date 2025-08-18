import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Link from "next/link";

const ProductItemHome = ({ styles, productItem }) => {
  const router = useRouter();
  const handleProductItem = (productId) => {
    if (productId) {
      router.push({
        pathname: "product_details",
        query: { productId: productId },
      });
    }
  };
  return (
    // <Link passHref={false} scroll={false} href={"/"}>
    <Link
      passHref={true}
      scroll={true}
      href={{ pathname: `/${productItem.slug}` }}
    >
      <a>
        <div className={styles.productItemBoxHome}>
          <div className={styles.productImage}>
            <Image
              width={100}
              height={100}
              // src={"/images/products/image 74.png"}
              src={
                `${process.env.PRODUCT_CDN_URL}` +
                `${productItem && productItem.media_url}`
              }
              alt=""
              className={styles.Image}
            />
          </div>
          <div className={styles.productName}>
            {productItem && productItem.name}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductItemHome;
