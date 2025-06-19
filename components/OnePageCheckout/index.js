import React, { useState, useEffect } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Styles from "./index.module.scss";
import CartItems from "./CartItems";
import UserAddress from "./UserAddress";
import PaymentSection from "./PaymentSection";
import Image from "next/image";
import Link from "next/link";
const moment = require("moment");

function OnePageCheckout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pageload, setPageLoad] = useState(false);
  const cartData = useSelector((status) => status.cartReducer.cart);
  useEffect(() => {
    setTimeout(() => {
      setPageLoad(true);
    }, 1000);
  }, [router.query]);
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.WEB_DOMAIN}${src}?w=${width}&q=${quality || 75}`;
  };
  const [streetadddress, setValidStreetAddress] = React.useState();
  const handleValidStreetAddress = (e) => {
    setValidStreetAddress(e);
  };
  return (
    <div className={Styles.OnePageCheckout}>
      {pageload ? (
        <>
          {cartData && cartData.length === 0 ? (
            <Row style={{ justifyContent: "center" }}>
              <Col md={3} sm={12} xs={12}>
                <div className={Styles.emptyCart}>
                  <div className={Styles.Text}>
                    <span>
                      <Image
                        loader={myLoader}
                        src="images/cartempty.jpg"
                        alt="Cart Empty"
                        layout="responsive"
                        quality={100}
                        height={50}
                        width={50}
                      />
                    </span>
                    <h1>Your cart is currently empty</h1>
                    <p>
                      Before proceed to checkout you must add some products to
                      your shopping cart. You will find a lot of interesting
                      products on our Shop page.
                    </p>
                  </div>
                  <Link passHref={true} scroll={true} href="/">
                    <a>Start Shopping</a>
                  </Link>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col md={4} sm={12} xs={12}>
                <CartItems />
              </Col>
              <Col md={4} sm={12} xs={12}>
                <UserAddress
                  handleValidStreetAddress={handleValidStreetAddress}
                />
              </Col>
              <Col md={4} sm={12} xs={12}>
                <PaymentSection />
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Row>
          <Col
            md={12}
            sm={12}
            xs={12}
            style={{ paddingBottom: "100px", paddingTop: "100px" }}
          >
            <Spinner
              animation="grow"
              style={{ display: "block", margin: "auto" }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default OnePageCheckout;
