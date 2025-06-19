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
import {
  totalOrderCalc,
  updateCreditAmount,
} from "../../../store/actions/cartActions";
import { Checkbox } from "antd";
import { toggleIsCreditCheckBox } from "../../../store/actions/userActions";

function OrderSummary() {
  const user = useSelector((status) => status.userReducer.user);
  const orderSummary = useSelector((state) => state.cartReducer.orderSummary);
  const cartData = useSelector((status) => status.cartReducer.cart);
  // console.log("%%%%%%%%%%%%%%%% orderSummary", orderSummary);
  const [subAmount, setsubAmount] = useState(orderSummary?.subAmount);
  const [totalAmount, setTotalAmount] = useState(orderSummary?.totalAmount);
  const [shippingAmount, setShippingAmount] = useState(
    orderSummary?.shippingAmount
  );
  const [loaddata, setLoadData] = useState(false);
  const [checked, setChecked] = useState(false);
  const [creditAmount, setCreditAmount] = useState(user.creditLimit);
  // console.log("++++++++++++++++++++++++++++++++++", totalAmount);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (cartData) {
  //     setLoadData(true);
  //     setTimeout(() => {
  //       setLoadData(false);
  //     }, 2000);
  //   }
  //   let total = 0;

  //   // console.log("#### calculate Amount");
  //   if (cartData && cartData.length > 0) {
  //     for (let index = 0; index < cartData.length; index++) {
  //       total =
  //         parseFloat(total) +
  //         parseFloat(cartData[index].price) * parseFloat(cartData[index].qty);
  //     }

  //     setsubAmount(total);
  //   }
  // }, [cartData]);

  // useEffect(() => {
  //   if (subAmount) {
  //     setTotalAmount(parseFloat(subAmount) + parseFloat(shippingAmount));
  //     // setTotalAmount(1234567);
  //     // console.log(
  //     //   "subAmount, shippingAmount %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
  //     //   subAmount,
  //     //   shippingAmount
  //     // );
  //     // console.log(
  //     //   "TOTAL AMOUNTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
  //     //   totalAmount
  //     // );
  //     dispatch(
  //       totalOrderCalc({
  //         subAmount: subAmount,
  //         shippingAmount: shippingAmount,
  //         totalAmount: totalAmount,
  //       })
  //     );
  //   }
  // }, [shippingAmount, subAmount]);

  // useEffect(() => {
  //   dispatch(
  //     totalOrderCalc({
  //       subAmount: subAmount,
  //       shippingAmount: shippingAmount,
  //       totalAmount: totalAmount,
  //     })
  //   );
  // }, [totalAmount]);

  // useEffect(() => {}, [orderSummary]);

  const onChange = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
    dispatch(toggleIsCreditCheckBox(e.target.checked));
    if (e.target.checked) {
      dispatch(
        updateCreditAmount(
          creditAmount > orderSummary?.totalAmount
            ? orderSummary?.totalAmount
            : creditAmount
        )
      );
    } else {
      dispatch(updateCreditAmount(0));
    }
  };

  return (
    <Col md={12} sm={12} xs={12} className={Styles.OrderSummarySection}>
      {/* <Typography
        variant="h5"
        component="h2"
        className={Styles.CheckoutPageTitle}
      >
        Your order summary
      </Typography> */}
      <List className={Styles.ItemsList}>
        {/* {cartData &&
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
              <span style={{ width: "90%" }}>
                <ListItemText primary={item.name} />
              </span>
            </ListItem>
          ))} */}

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
                  // value={subAmount}
                  // value={orderSummary?.subAmount}
                  value={creditAmount}
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
          <Checkbox checked={checked} onChange={onChange}>
            <ListItemText primary="Pay By Credit" />
          </Checkbox>
        </ListItem>
        {checked ? (
          <>
            <ListItem
              style={{ color: "#F44336" }}
              secondaryAction={
                <NumericFormat
                  // value={shippingAmount}
                  value={
                    orderSummary?.totalAmount - creditAmount < 0
                      ? orderSummary?.totalAmount
                      : creditAmount
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"- $"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  className={Styles.Price}
                />
              }
            >
              <ListItemText primary="Deduction" />
            </ListItem>
            <ListItem
              className={Styles.SubTotal}
              style={{ borderTop: "1px solid #d5d5d5" }}
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
                      // value={totalAmount}
                      value={
                        creditAmount - orderSummary?.totalAmount >= 0
                          ? creditAmount - orderSummary?.totalAmount
                          : 0
                      }
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
              <ListItemText primary="Total Balance" />
            </ListItem>{" "}
          </>
        ) : null}
        {/* <ListItem
          style={{ color: "#F44336" }}
          secondaryAction={
            <NumericFormat
              // value={shippingAmount}
              value={orderSummary?.totalAmount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"- $"}
              decimalScale={2}
              fixedDecimalScale={true}
              className={Styles.Price}
            />
          }
        >
          <ListItemText primary="Deduction" />
        </ListItem>
        <ListItem
          className={Styles.SubTotal}
          style={{ borderTop: "1px solid #d5d5d5" }}
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
                  // value={totalAmount}
                  value={
                    orderSummary?.totalAmount - 100 < 0
                      ? 0
                      : orderSummary?.totalAmount - 100
                  }
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
          <ListItemText primary="Total Balance" />
        </ListItem> */}
      </List>
    </Col>
  );
}

export default OrderSummary;
