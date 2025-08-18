import React from "react";
import { Row, Image, Col } from "antd";
import { useState } from "react";
import axios from "axios";
import Product from "../Product";

const ProductCertificate = ({ product }) => {
  const [certificates, setCertificates] = useState(product.product_certificate);
  // console.log("*************** product", product);
  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="certificateImageRow"
      >
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
          // visible={false}
        >
          {certificates &&
            certificates.map((c, index) => (
              <Col className="gutter-row" span={5} key={index}>
                <Image
                  width={50}
                  src={process.env.PRODUCT_CDN_URL + c.CertificateImage}
                  placeholder={
                    <Image
                      preview={false}
                      src={process.env.PRODUCT_CDN_URL + c.CertificateImage}
                      width={200}
                    />
                  }
                />
              </Col>
            ))}
        </Image.PreviewGroup>
      </Row>
    </>
  );
};

export default ProductCertificate;
