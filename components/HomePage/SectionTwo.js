import React, { Component, useState, useEffect } from "react";
import styles from "./Styles/Home.module.scss";
import Image from "next/image";
import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
const SectionTwo = ({}) => {
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.WEB_DOMAIN}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className={styles.sectiontwo}>
      <Row>
        <Col lg={6} md={6} xl={6} xs={12}>
          <Image
            src="images/SectionTwoImage-1.jpg"
            loader={myLoader}
            alt="banner"
            // className={styles.bannerImageHolder}
            layout="responsive"
            width={500}
            height={400}
            quality={100}
          />
        </Col>
        <Col lg={6} md={6} xl={6} xs={12}>
          <div className={styles.SectionBox}>
            <div className={styles.BoxOne}>
              <h2>PRE ASSEMBLED PRODUCTS</h2>
              <p>
                Assemble your products by your self and with <br></br>
                top quality products and get them delivered <br></br>
                to you on your door step
              </p>
              <Link passHref={true} scroll={true} href="/">
                <a className={styles.HoverEffect}>EXPLORE ITEMS</a>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SectionTwo;
