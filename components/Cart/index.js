import React, { useState, useEffect } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Styles from "./index.module.scss";
import CartItems from "./CartItems";
import Image from "next/image";
import Link from "next/link";
import { totalOrderCalc } from "../../store/actions/cartActions";
function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pageload, setPageLoad] = useState(false);
  const cartData = useSelector((status) => status.cartReducer.cart);
  // console.log("%%%%% cartData", cartData);
  const user = useSelector((state) => state.userReducer.user);
  // console.log("%%%%% user", user);
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
  // start - bring order summary useEffect
  const [subAmount, setsubAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [OSloaddata, setOsLoadData] = useState(false);
  const [totalPWC, setTotalPWC] = useState({});
  // const cartData = useSelector((status) => status.cartReducer.cart);
  // console.log("++++++++++++++++++++++++++++++++++ cartData", cartData);

  useEffect(() => {
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
        if (cartData[index].productType !== 3) {
          if (cartData[index].stock < cartData[index].qty) {
            localStorage.setItem("isCartBackOrdered", true);
          } else {
            localStorage.setItem("isCartBackOrdered", false);
          }
        }
      }
      if (user.productsDiscountJson) {
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

    // getShippingCharges(totalPallets, totalWeight, totalCBM);
  }, [cartData]);

  useEffect(() => {
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
  }, [shippingAmount, subAmount]);

  useEffect(() => {
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
  }, [totalAmount]);
  // end
  return (
    <div className={Styles.OnePageCheckout}>
      {pageload ? (
        <>
          {cartData && cartData.length === 0 ? (
            <Row style={{ justifyContent: "center", display: "flex" }}>
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
              <Col md={12} sm={12} xs={12}>
                <CartItems />
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

export default Cart;
