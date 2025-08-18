import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Link from "next/link";
//import Image from "next/image";
const CategoryItem = ({ styles, submenu }) => {
  const router = useRouter();
  const handleCatfilter = () => {
    router.push(`/categorypage`);
  };
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.CATEGORY_CDN_URL}${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <div
      className={styles.CategoryItemBox}
      //onClick={() => handleCatfilter()}
    >
      {/* <Link
        passHref={true}
        scroll={true}
        href={`/${submenu.name
          .split("/")[0]
          .toLowerCase()
          .replace(/ /g, "-")}/${submenu.name
          .split("/")[1]
          .replace(/ /g, "-")
          .toLowerCase()}/${submenu.name
          .split("/")
          .pop()
          .trim()
          .toLowerCase()
          .replace(/ /g, "-")}`}
      > */}
      <Link
        passHref={true}
        scroll={true}
        href={`/${submenu.name
          .split("/")[0]
          .toLowerCase()
          .replace(/ /g, "-")}/${submenu.name
          .split("/")[1]
          .replace(/ /g, "-")
          .toLowerCase()}`}
      >
        <div className={styles.CategoryOuterBox}>
          <Row>
            <Col className={styles.productimage}>
              {submenu.image_url.length > 0 ? (
                <Image
                  src={`${process.env.CATEGORY_CDN_URL}${submenu.image_url}`}
                  alt={submenu.name.split("/")[1]}
                  className={styles.logoImage}
                  //layout="responsive"
                  //width={200}
                  //loader={myLoader}
                  //height={200}
                />
              ) : (
                <Image
                  src="/images/default-product.png"
                  alt={submenu.name.split("/")[1]}
                  className={styles.logoImage}
                />
              )}
            </Col>
          </Row>
          <div className={styles.Box}>
            {/* <div className={styles.Title}>{submenu.title}</div> */}
            <div className={styles.Title}>{submenu.name.split("/")[1]}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
