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
import { Badge, Card, Space, Tag } from "antd";
import { totalOrderCalc } from "../../../store/actions/cartActions";

function OrderSummary() {
  const orderSummary = useSelector((state) => state.cartReducer.orderSummary);
  const user = useSelector((state) => state.userReducer.user);
  console.log("%%%%%%%%%%%%%%%% orderSummary", orderSummary);
  const [subAmount, setsubAmount] = useState(orderSummary?.subAmount);
  const [totalAmount, setTotalAmount] = useState(orderSummary?.totalAmount);
  const [shippingAmount, setShippingAmount] = useState(
    orderSummary?.shippingAmount
  );
  const [loaddata, setLoadData] = useState(false);
  // console.log("++++++++++++++++++++++++++++++++++", totalAmount);

  const dispatch = useDispatch();
  const cartData = useSelector((status) => status.cartReducer.cart);
  // console.log("RRRRRRRRRRRRRRRRRR1111111111111111 cartData", cartData);
  // console.log("shucartData", cartData);

  // start - bring order summary useEffect
  //  const [subAmount, setsubAmount] = useState(0);
  //  const [totalAmount, setTotalAmount] = useState(0);
  //  const [shippingAmount, setShippingAmount] = useState(0);
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
    let total_items = 0;
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
        // totalPallets += parseFloat(cartData[index].pallets);
        // totalWeight += parseFloat(cartData[index].weight);
        // totalCBM += parseFloat(cartData[index].cbm);
        totalPallets += parseFloat(cartData[index].pallets);
        totalWeight += parseFloat(cartData[index].weight) * cartData[index].qty;
        totalCBM += parseFloat(cartData[index].cbm) * cartData[index].qty;
        total_items += cartData[index].qty;
      }
      if (user?.productsDiscountJson) {
        total =
          total -
          (total * user.productsDiscountJson[0].discountPercentage) / 100;
      }
      setsubAmount(total);
      setTotalPWC({
        // totalItems: cartData.length,
        totalItems: total_items,
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
    let total_items = 0;
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
        // totalPallets += parseFloat(cartData[index].pallets);
        // totalWeight += parseFloat(cartData[index].weight);
        // totalCBM += parseFloat(cartData[index].cbm);

        totalPallets += parseFloat(cartData[index].pallets);
        totalWeight += parseFloat(cartData[index].weight) * cartData[index].qty;

        totalCBM += parseFloat(cartData[index].cbm) * cartData[index].qty;
        total_items += cartData[index].qty;
      }
      if (user?.productsDiscountJson) {
        total =
          total -
          (total * user.productsDiscountJson[0].discountPercentage) / 100;
      }
      setsubAmount(total);
      setTotalPWC({
        // totalItems: cartData.length,
        totalItems: total_items,
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

  const badge = () => {
    return (
      // <Badge.Ribbon
      //   text={"Voucher" + orderSummary?.appliedVoucherObj?.voucherName}
      //   // style={{ width: "100%", height: 50 }}
      // >
      //   <div style={{ width: "100%", height: 50 }}></div>
      // </Badge.Ribbon>
      <Tag color="#87d068">
        {"Voucher - " + orderSummary?.appliedVoucherObj?.voucherName}
      </Tag>
    );
  };

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
                      value={
                        !user?.productsDiscountJson
                          ? item.productType == 2
                            ? (
                                ((item.cable_pricing_permeter * item.cableLength) +
                                  item.price) * item.qty
                              ).toFixed(2)
                            : (item.price * item.qty).toFixed(2)
                          : item.productType == 2
                          ? (
                              ((item.cable_pricing_permeter * item.cableLength) +
                                item.price_after_discount) * item.qty
                            ).toFixed(2)
                          : (item.price_after_discount * item.qty).toFixed(2)
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
              {/* <ListItemText primary="B05-AMXX/6H1.5" /> */}
              <span style={{ width: "70%" }}>
                <ListItemText
                  primary={
                    item.productType !== 1
                      ? item.name +
                        " (" +
                        item.cableLength +
                        "m)" +
                        " (" +
                        item.qty +
                        " pcs)"
                      : item.name + " (" + item.qty + " pcs)"
                  }
                />
              </span>
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
                  // value={subAmount}
                  value={orderSummary?.subAmount}
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
        {orderSummary.appliedVoucherObj &&
        orderSummary?.appliedVoucherObj?.flatAmount != 0 &&
        orderSummary?.appliedVoucherObj?.amountTobeDeductedIfPercentage != 0 ? (
          <ListItem
            className={Styles.AppliedVoucher}
            secondaryAction={
              <NumericFormat
                // value={shippingAmount}
                value={
                  orderSummary?.appliedVoucherObj?.amountType == 0
                    ? orderSummary?.appliedVoucherObj?.flatAmount
                    : orderSummary?.appliedVoucherObj
                        ?.amountTobeDeductedIfPercentage
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
            {/* <Badge.Ribbon text={orderSummary?.appliedVoucherObj?.voucherName}> */}
            {/* <ListItemText primary="Voucher" style={{ minWidth: "10px" }} /> */}
            <ListItemText primary={badge()} />
            {/* </Badge.Ribbon> */}
          </ListItem>
        ) : null}

        <ListItem
          // className={Styles.AppliedVoucher}
          secondaryAction={
            <NumericFormat
              // value={shippingAmount}
              value={orderSummary?.shippingAmount}
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
                  // value={totalAmount}
                  value={orderSummary?.totalAmount}
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
