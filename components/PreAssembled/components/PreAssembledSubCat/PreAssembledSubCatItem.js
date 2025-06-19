import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "../../../shared/CategoryItem/Category.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Link from "next/link";
const PreAssembledSubCatItem = ({ preSubCat }) => {
  return (
    <>
      <Link
        passHref={true}
        scroll={true}
        href={{
          pathname: `preassembled/${preSubCat.name
            .replace(/ /g, "-")
            .toLowerCase()}`,
        }}
      >
        <a>
          <div className={styles.CategoryItemBox}>
            <div className={styles.CategoryOuterBox}>
              <Row>
                <Col className={styles.productimage}>
                  {preSubCat.image_url.length > 0 ? (
                    <Image
                      src={process.env.CATEGORY_CDN_URL + preSubCat.image_url}
                      alt={preSubCat.name}
                      className={styles.logoImage}
                    />
                  ) : (
                    <Image
                      src="/images/default-product.png"
                      alt={preSubCat.name}
                      className={styles.logoImage}
                    />
                  )}
                </Col>
              </Row>
              <div className={styles.Box}>
                {/* <div className={styles.Name}>{preSubCat.name.split("/")[0]}</div> */}
                <div className={styles.Title}>{preSubCat.name}</div>
              </div>
              {/* <div className={styles.Box}>
                <div className={styles.Title}>{preSubCat.tagName}</div>
              </div> */}
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default PreAssembledSubCatItem;
