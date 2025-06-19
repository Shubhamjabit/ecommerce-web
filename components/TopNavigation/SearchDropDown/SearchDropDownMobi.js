import React from "react";
import { Row, Spinner, Col, Container } from "react-bootstrap";
import ProductItem from "../SearchResutItem/ProductItemMobi";
import Link from "next/link";
const SearchDropDownMobi = ({ product, loading, styles, keyword }) => {
  return (
    <>
      {loading && !product && (
        <Row
          className="justify-content-md-center"
          style={{
            textAlign: "center",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <Spinner className={styles.loader} animation="grow" />
        </Row>
      )}

      <Container>
        {product && product.length <= 0 && (
          <Row
            className="justify-content-md-center"
            style={{ justifyContent: "center" }}
          >
            <p style={{ fontWeight: "bold" }}>no result</p>
          </Row>
        )}
        {product &&
          product.map((p, i) => (
            // <div key={p.id}>
            <ProductItem key={i} product={p} style={styles} />
            //  </div>
          ))}
      </Container>
      {product && (
        <Link
          as={`/search-product?search=${keyword}`}
          href={`/search-product?search=${keyword}`}
        >
          <a
            style={{
              width: "100%",
              display: "block",
              color: "#000",
              textAlign: "center",
              textDecoration: "none",
              fontSize: "14px",
              padding: "10px",
            }}
          >
            Show all results
          </a>
        </Link>
      )}
    </>
  );
};

export default SearchDropDownMobi;
