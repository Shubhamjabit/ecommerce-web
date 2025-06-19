import React, { useState, useEffect } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Styles from "./index.module.scss";
// import UserAddress from "./UserAddress/index";
import UserAddress from "./UserAddress/indexNew";
import PaymentSection from "./PaymentSection";
import Image from "next/image";
import Link from "next/link";
import OrderSummary from "./PaymentSection/OrderSummary";
import { Space } from "antd";
// import BillingDetails from "./BillingDetails/index";
import BillingDetails from "./BillingDetails/indexNew";
import DeliveryOptions from "../Cart/DeliveryOptions";
import ShippingOptions from "../Cart/ShippingOptions";
import CreditPaymentSection from "./CreditPaymentSection";
import DiscountVoucher from "./DiscountVoucher/DiscountVoucher";
import { totalOrderCalc } from "../../store/actions/cartActions";

const NewCheckout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  if (typeof window !== "undefined") {
    var user = JSON.parse(localStorage.getItem("user"));
  }
  const billingAddress = useSelector(
    (state) => state.billingAddressReducer.savedBillAddress
  );
  const [pageload, setPageLoad] = useState(false);
  const cartData = useSelector((status) => status.cartReducer.cart);
  const [isCartBackOrdered, setIsCartBackOrdered] = useState(false);
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
  useEffect(() => {
    if (billingAddress && billingAddress.streetAddress == "") {
      dispatch(validateAddressAction(false));
    }
  }, []);

  // start - bring order summary useEffect
  const [subAmount, setsubAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [OSloaddata, setOsLoadData] = useState(false);
  const [totalPWC, setTotalPWC] = useState({});
  // const cartData = useSelector((status) => status.cartReducer.cart);
  // console.log("++++++++++++++++++++++++++++++++++ cartData", cartData);

  useEffect(() => {
    const isCartBackOrderedLocal = JSON.parse(
      localStorage.getItem("isCartBackOrdered")
    );
    setIsCartBackOrdered(isCartBackOrderedLocal);
    if (cartData) {
      setOsLoadData(true);
      setTimeout(() => {
        setOsLoadData(false);
      }, 2000);
    }
    let total = 0;
    let totalPallets = 0;
    let totalWeight = 0;
    let totalCBM = 0;
    // console.log("#### calculate Amount");
    if (cartData && cartData.length > 0) {
      for (let index = 0; index < cartData.length; index++) {
        total =
          parseFloat(total) +
          parseFloat(cartData[index].price) *
            parseFloat(cartData[index].qty) *
            (cartData[index].productType == 2
              ? cartData[index].cableLength
              : 1);
        totalPallets += parseFloat(cartData[index].pallets);
        totalWeight += parseFloat(cartData[index].weight);
        totalCBM += parseFloat(cartData[index].cbm);
      }
      if (user?.productsDiscountJson) {
        total =
          total -
          (total * user.productsDiscountJson[0].discountPercentage) / 100;
      }
      setsubAmount(total);
      setTotalPWC({
        totalItems: cartData.length,
        totalPallets: totalPallets,
        totalWeight: totalWeight,
        totalCBM: totalCBM,
      });
    }
    if (subAmount) {
      console.log("$$$$$$$$$$");
      setTotalAmount(parseFloat(subAmount) + parseFloat(shippingAmount));
      // setTotalAmount(1234567);
      // console.log(
      //   "subAmount, shippingAmount %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
      //   subAmount,
      //   shippingAmount
      // );
      // console.log(
      //   "TOTAL AMOUNTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      //   totalAmount
      // );
      dispatch(
        totalOrderCalc({
          subAmount: subAmount,
          shippingAmount: shippingAmount,
          totalAmount: totalAmount,
          totalItems: totalPWC.totalItems,
          totalPallets: totalPWC.totalPallets,
          totalWeight: totalPWC.totalWeight,
          totalCBM: totalPWC.totalCBM,
        })
      );
    }
    dispatch(
      totalOrderCalc({
        subAmount: subAmount,
        shippingAmount: shippingAmount,
        totalAmount: totalAmount,
        totalItems: totalPWC.totalItems,
        totalPallets: totalPWC.totalPallets,
        totalWeight: totalPWC.totalWeight,
        totalCBM: totalPWC.totalCBM,
      })
    );
  }, []);
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
              {/* <Col md={4} sm={12} xs={12}>
                <OrderSummary />
              </Col> */}
              <Col md={4} sm={12} xs={12}>
                <Space direction="vertical">
                  <UserAddress
                    handleValidStreetAddress={handleValidStreetAddress}
                  />
                  <BillingDetails
                    handleValidStreetAddress={handleValidStreetAddress}
                  />
                </Space>
              </Col>
              <Col
                md={4}
                sm={12}
                xs={12}
                // style={{ paddingTop: "5%" }}
                // className={Styles.DeliveryAndShippingSection}
              >
                <Row>
                  <Col
                    md={4}
                    sm={12}
                    xs={12}
                    style={{ width: "100%" }}
                    className={Styles.DeliveryAndShippingSection}
                  >
                    {isCartBackOrdered ? (
                      <Row>
                        <DeliveryOptions />
                      </Row>
                    ) : null}
                    <Row style={{ paddingTop: "5%" }}>
                      <ShippingOptions />
                    </Row>
                  </Col>
                </Row>
                {user?.vouchersJson?.length > 0 ? (
                  <Row style={{ paddingTop: "5%" }}>
                    <Col
                      md={4}
                      sm={12}
                      xs={12}
                      style={{ width: "100%" }}
                      className={Styles.DeliveryAndShippingSection}
                    >
                      <DiscountVoucher />
                    </Col>
                  </Row>
                ) : null}
              </Col>
              <Col md={4} sm={12} xs={12}>
                <OrderSummary />
                {user?.credit_status == 2 ? <CreditPaymentSection /> : null}

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
};

export default NewCheckout;
