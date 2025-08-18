import React, { Component, useState, useEffect } from "react";
import styles from "./Styles/Home.module.scss";
import Image from "next/image";
import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
const SectionThree = ({}) => {
  return (
    <div className={styles.sectionthree}>
      <Row>
        <Col lg={6} md={6} xl={3} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>1.</div>
            <div className={styles.content}>
              <h6>Easy to use</h6>
              <p>Things on a very small that you have any direct.</p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={3} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>2.</div>
            <div className={styles.content}>
              <h6>Easy to use</h6>
              <p>Things on a very small that you have any direct.</p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={3} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>3.</div>
            <div className={styles.content}>
              <h6>Easy to use</h6>
              <p>Things on a very small that you have any direct.</p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={3} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>4.</div>
            <div className={styles.content}>
              <h6>Easy to use</h6>
              <p>Things on a very small that you have any direct.</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SectionThree;
