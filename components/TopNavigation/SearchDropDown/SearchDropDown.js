/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component, useEffect, useState } from "react";
import { Row, Spinner, Col, Container } from "react-bootstrap";
import ProductItem from "../SearchResutItem/ProductItem";
import Link from "next/link";
import { Bars } from "react-loader-spinner";
const SearchDropDown = ({ product, loading, styles, keyword }) => {
  return (
    <>
      {loading && !product && (
        <Row className={styles.loader}>
          <Bars
            height="50"
            width="50"
            color="#2595d4"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Row>
      )}

      {product && product.length <= 0 && (
        <Row className="justify-content-md-center">
          <p style={{ padding: "10px" }}> No result</p>
        </Row>
      )}
      <Container>
        {product &&
          product.map((p, index) => (
            <ProductItem key={index} product={p} styles={styles} />
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

export default SearchDropDown;
