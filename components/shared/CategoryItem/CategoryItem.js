import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./Category.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Link from "next/link";

const CategoryItem = ({ category }) => {
  return (
    <Link
      passHref={true}
      scroll={true}
      href={{ pathname: `/${category.name.replace(/ /g, "-").toLowerCase()}` }}
    >
      <a>
        <div className={styles.CategoryItemBox}>
          <div className={styles.CategoryOuterBox}>
            <Row>
              <Col className={styles.productimage}>
                {category.image_url.length > 0 ? (
                  <Image
                    src={
                      `${process.env.CATEGORY_CDN_URL}` +
                      `${category.image_url}`
                    }
                    alt={category.name}
                    className={styles.logoImage}
                  />
                ) : (
                  <Image
                    src="/images/default-product.png"
                    alt={category.name}
                    className={styles.logoImage}
                  />
                )}
              </Col>
            </Row>
            <div className={styles.Box}>
              {/* <div className={styles.Name}>{category.name.split("/")[0]}</div> */}
              <div className={styles.Title}>{category.name.split("/")[1]}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CategoryItem;
