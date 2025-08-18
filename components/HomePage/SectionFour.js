import React, { Component, useState, useEffect } from "react";
import styles from "./Styles/Home.module.scss";
//import Image from "next/image";
import { Row, Col, Container, Image } from "react-bootstrap";
import Link from "next/link";
const SectionFour = ({}) => {
  return (
    <div className={styles.sectionfour}>
      <Row>
        <Col lg={6} md={6} xl={4} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>
              <Image src="/images/box-tick.png" alt="Free delivery" />
            </div>
            <div className={styles.content}>
              <h6>Free delivery</h6>
              <p>on order above $50,00</p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={4} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>
              <Image src="/images/crown.png" alt="Best quality" />
            </div>
            <div className={styles.content}>
              <h6>Best quality</h6>
              <p>best quality in low price</p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={4} xs={12}>
          <div className={styles.servicebox} style={{ marginBottom: 0 }}>
            <div className={styles.icon}>
              <Image src="/images/shield-security.png" alt="1 year warranty" />
            </div>
            <div className={styles.content}>
              <h6>1 year warranty</h6>
              <p>Avaliable warranty</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SectionFour;
