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
    <>
      {matches ? (
        <div className={styles.CustomizeProductSection}>
          <div className={styles.CustomizeProductImageSectionMobile}>
            <Image
              className={styles.CustomizeProductImage}
              src="/images/mobile-banner.svg"
              // src="/images/customize_section_image_with_border.png"
              alt="Customize Product"
              layout="responsive"
              quality={100}
              height={280}
              width={315}
              // class="object-fit-contain"
            />
          </div>
          <div className={styles.CustomizeProductButtonSection}>
            <button
              className={styles.CustomizeProductButton}
              // style={{
              //   border: "none",
              //   background: "#f6821f",
              //   padding: "10px 50px",
              //   color: "#fff",
              //   borderRadius: "5px",
              //   fontWeight: "bold",
              //   boxShadow: ,

              //   // position: "absolute",
              //   // top: "45%",
              //   // right: "5%",
              // }}
              onClick={() => handleCustomization()}
            >
              Customize Now
            </button>
          </div>
        </div>
      ) : (
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
              Customize Cable Leads & Harnesses <br></br>
              <span className={styles.highlight}>Limitless Choices</span>{" "}
              <br></br>
              <span>Infinite Possibilities</span>
            </h3>
            <button
              className={styles.CustomizeNowBtn}
              onClick={() => handleCustomization()}
            >
              Customize Now
            </button>
          </div>

          {/* Right Image */}
          <img
            src="images/product-newright-image.png"
            alt="Wires"
            className={styles.CustomizeProductRightImage}
          />
        </div>
      )}
    </>
  );
};

export default NewCustomizeProductSection;
