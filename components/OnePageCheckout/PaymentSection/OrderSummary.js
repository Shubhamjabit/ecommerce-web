import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Styles from "./paymentsection.module.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { NumericFormat } from "react-number-format";
import Skeleton from "@mui/material/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { totalOrderCalc } from "../../../store/actions/cartActions";

function OrderSummary() {
  const [subAmount, setsubAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(100);
  const [loaddata, setLoadData] = useState(false);
  // console.log("++++++++++++++++++++++++++++++++++", totalAmount);

  const dispatch = useDispatch();
  const cartData = useSelector((status) => status.cartReducer.cart);

  useEffect(() => {
    if (cartData) {
      setLoadData(true);
      setTimeout(() => {
        setLoadData(false);
      }, 2000);
    }
    let total = 0;

    // console.log("#### calculate Amount");
    if (cartData && cartData.length > 0) {
      for (let index = 0; index < cartData.length; index++) {
        total =
          parseFloat(total) +
          parseFloat(cartData[index].price) * parseFloat(cartData[index].qty);
      }

      setsubAmount(total);
    }
  }, [cartData]);

  useEffect(() => {
    if (subAmount) {
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
      })
    );
  }, [totalAmount]);
  return (
    <Col md={12} sm={12} xs={12} className={Styles.OrderSummarySection}>
      <Typography
        variant="h5"
        component="h2"
        className={Styles.CheckoutPageTitle}
      >
        Your order summary
      </Typography>
      <List className={Styles.ItemsList}>
        {cartData &&
          cartData.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  {loaddata ? (
                    <Skeleton
                      variant="rectangular"
                      width={80}
                      height={10}
                      animation="wave"
                    />
                  ) : (
                    <NumericFormat
                      value={item.price * item.qty.toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      className={Styles.Price}
                    />
                  )}
                </>
              }
            >
              <ListItemText primary="B05-AMXX/6H1.5" />
            </ListItem>
          ))}

        <ListItem
          className={Styles.SubTotal}
          secondaryAction={
            <>
              {loaddata ? (
                <Skeleton
                  variant="rect"
                  width={80}
                  height={10}
                  animation="wave"
                />
              ) : (
                <NumericFormat
                  value={subAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  className={Styles.Price}
                />
              )}
            </>
          }
        >
          <ListItemText primary="Sub Total" />
        </ListItem>
        <ListItem
          secondaryAction={
            <NumericFormat
              value={shippingAmount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"+ $"}
              decimalScale={2}
              fixedDecimalScale={true}
              className={Styles.Price}
            />
          }
        >
          <ListItemText primary="Shipping Charges" />
        </ListItem>
        <ListItem
          className={Styles.SubTotal}
          secondaryAction={
            <>
              {loaddata ? (
                <Skeleton
                  variant="rect"
                  width={80}
                  height={10}
                  animation="wave"
                />
              ) : (
                <NumericFormat
                  value={totalAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  className={Styles.Price}
                />
              )}
            </>
          }
        >
          <ListItemText primary="Total Amount" />
        </ListItem>
      </List>
    </Col>
  );
}

export default OrderSummary;
