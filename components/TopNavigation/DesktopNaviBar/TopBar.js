import React from "react";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./DesktopNaviBar.module.scss";
import Image from "next/image";
import Link from "next/link";
export const TopBar = () => {
  return (
    <container-fluid>
      <Row>
        <div className={styles.Backbg}>
          <Col sm="12">
            Extra 10% OFF on your first purchase. Use Code FIRSTBUY10 at the
            time of checkout.
          </Col>
        </div>
      </Row>
    </container-fluid>
  );
};
