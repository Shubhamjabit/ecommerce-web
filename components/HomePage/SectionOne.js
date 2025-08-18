import React, { Component, useState, useEffect } from "react";
import styles from "./Styles/Home.module.scss";
import Image from "next/image";
import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
const SectionOne = ({}) => {
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.WEB_DOMAIN}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className={styles.sectionone}>
      <h2 className={styles.Title}>
        Connecting Innovation with Precision: Powering Your Electronics.
      </h2>
      <Row>
        <Col lg={6} md={6} xl={6} xs={12}>
          <div className={styles.SectionBox}>
            <Image
              src="images/SectionImage-1.jpg"
              loader={myLoader}
              alt="banner"
              // className={styles.bannerImageHolder}
              layout="responsive"
              width={500}
              height={415}
              quality={100}
            />
            <div className={styles.BoxOne}>
              <h2>Top notch quality Products</h2>
              <Link passHref={true} scroll={true} href="/">
                <a className={styles.HoverEffect}>EXPLORE ITEMS</a>
              </Link>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={6} xs={12}>
          <Row>
            <Col xs={12} md={12}>
              <div className={styles.SectionBoxTwo}>
                <Image
                  src="images/SectionImage-3.jpg"
                  loader={myLoader}
                  alt="banner"
                  // className={styles.bannerImageHolder}
                  layout="responsive"
                  width={500}
                  height={200}
                  quality={100}
                />
                <div className={styles.BoxTwo}>
                  <h2>Safety Equipments</h2>
                  <Link passHref={true} scroll={true} href="/">
                    <a className={styles.HoverEffect}>EXPLORE ITEMS</a>
                  </Link>
                </div>
              </div>
            </Col>
            <Col xs={12} md={12} className={styles.Pd10}></Col>
            <Col xs={12} md={12}>
              <div className={styles.SectionBox}>
                <Image
                  src="images/SectionImage-2.jpg"
                  loader={myLoader}
                  alt="banner"
                  // className={styles.bannerImageHolder}
                  layout="responsive"
                  width={500}
                  height={200}
                  quality={100}
                />
                <div className={styles.BoxTwo}>
                  <h2>Wires & Cables</h2>
                  <Link passHref={true} scroll={true} href="/">
                    <a className={styles.HoverEffect}>EXPLORE ITEMS</a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SectionOne;
