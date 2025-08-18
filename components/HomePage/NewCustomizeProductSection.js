import React from "react";
import styles from "./Styles/CustomizeProductSection.module.scss";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mui/material";

const NewCustomizeProductSection = () => {
  const router = useRouter();
  // handle Customization
  const handleCustomization = () => {
    router.replace("/customization");
  };
  const matches = useMediaQuery("(max-width:851px)");
  return (
    <Row>
      <div className={styles.CustomizeProductSection}>
        {/* Left Image */}
        <img
          src="images/product-newleft-image.png"
          alt="Cable"
          className={styles.CustomizeProductLeftImage}
        />

        {/* Banner Text */}
        <div className={styles.CustomizeProductContent}>
          <h3>
            CustomiseCable Leads & Harnesses <br></br>
            <span className={styles.highlight}>Limitless Choices</span>{" "}
            <br></br>
            <span>Infinite Possibilities</span>
          </h3>
          <button
            className={styles.CustomizeNowBtn}
            onClick={() => handleCustomization()}
          >
            CustomiseNow
          </button>
        </div>

        {/* Right Image */}
        <img
          src="images/product-newright-image.png"
          alt="Wires"
          className={styles.CustomizeProductRightImage}
        />
      </div>
    </Row>
  );
};

export default NewCustomizeProductSection;
