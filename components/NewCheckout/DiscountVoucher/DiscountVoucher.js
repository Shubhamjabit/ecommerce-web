import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Spinner } from "react-bootstrap";

// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from "@material-ui/icons/Close";
import {
  // TextField,
  Typography,
  Button,
  // FormControl,
  // InputLabel,
  IconButton,
  // InputAdornment,
  Paper,
  InputBase,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Styles from "./discountVoucher.module.scss";
import { NumericFormat } from "react-number-format";
import CheckIcon from "@material-ui/icons/Check";
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";
import { updateAppliedVoucher } from "../../../store/actions/cartActions";
import { Tooltip } from "antd";
function DiscountVoucher() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const orderSummary = useSelector((status) => status.cartReducer.orderSummary);
  const user = useSelector((state) => state.userReducer.user);
  //   const vouchersJson = JSON.parse(user.vouchersJson);
  const vouchersJson = user?.vouchersJson;
  // console.log("uuuuuuuuuuuuuu user.vouchersJson", user.vouchersJson);
  const [selectnote, setSelectNote] = useState(null);
  const [creditamount, setCreditAmount] = useState(0);
  const [creditcode, setCreditCode] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [discountMessage, setDiscountMessage] = React.useState({
    msg: "",
    status: false,
  });
  const handleChange = (i, amount, code, appliedVoucherObj) => {
    dispatch(updateAppliedVoucher(appliedVoucherObj));
    //console.log('Apply Credit Note  >>>>>>>>>>>>>', i, amount, code);
    setDiscountMessage({ msg: "", status: false });
    if (cart.length > 0) {
      setSelectNote(i);
      setCreditAmount(amount);
      setCreditCode(code);
      //   setTimeout(() => {
      //     setLoadingCart(false);
      //   }, 3000);
    } else {
      setDiscountMessage({
        msg: "Please add an item to apply credit note",
        status: false,
      });
    }
  };
  const handleRemove = (appliedVoucherObj) => {
    dispatch(
      updateAppliedVoucher({
        ...appliedVoucherObj,
        flatAmount: 0,
        discountPercentage: 0,
        maxAmountIfPercentage: 0,
      })
    );
    setSelectNote(null);
    setCreditAmount(0);
    setCreditCode(null);
    // setTimeout(() => {
    //   setLoadingCart(false);
    // }, 3000);
  };
  const router = useRouter();
  React.useEffect(() => {
    if (orderSummary && orderSummary.total_price == "0") {
      handleRemove();
    }
  }, [orderSummary]);

  React.useEffect(() => {
    if (
      orderSummary &&
      router.query &&
      router.query.checkoutId !== undefined &&
      router.query.result === "approved" &&
      router.query.creditcode !== "null"
    ) {
      const getCreditnote = creditnote.filter(
        (i) => i.Voucher_code == router.query.creditcode
      );
      handleChange(
        router.query.creditvalue,
        getCreditnote[0].vouc_balance,
        getCreditnote[0].Voucher_code
      );
    }
  }, [orderSummary]);
  return (
    <>
      <Col md={12} sm={12} xs={12} className={Styles.DiscountSection}>
        <Typography variant="h6" component="h6" className={Styles.Titles}>
          Apply Voucher
        </Typography>
        <div>
          <List className={Styles.creditnoteSection}>
            {vouchersJson &&
              vouchersJson.map((item, i) => {
                return (
                  <ListItem className={Styles.creditnoteList} key={i}>
                    <ListItemIcon className={Styles.ListItemIcon}>
                      {selectnote == i && (
                        <CheckIcon style={{ color: "#43B963" }} />
                      )}

                      {!loading ? (
                        <span className={Styles.creditnoteCode}>
                          {item.voucherName}
                        </span>
                      ) : (
                        <Skeleton
                          className={Styles.skeletonColor}
                          style={{ marginRight: "10px" }}
                          // animation="wave"
                          variant="rect"
                          width={50}
                          height={5}
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <>
                          {loading ? (
                            <Skeleton
                              className={Styles.skeletonColor}
                              // animation="wave"
                              variant="rect"
                              width={50}
                              height={5}
                            />
                          ) : item.amountType == 0 ? (
                            <NumericFormat
                              value={item.flatAmount}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                              suffix={" off"}
                              className={Styles.Amount}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />
                          ) : (
                            <NumericFormat
                              value={item.discountPercentage}
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={
                                "% off upto $" + item.maxAmountIfPercentage
                              }
                              className={Styles.Amount}
                              decimalScale={0}
                              fixedDecimalScale={true}
                            />
                          )}
                        </>
                      }
                    />
                    <ListItemText className={Styles.ListItemText}>
                      {selectnote == i ? (
                        <>
                          {loading ? (
                            <Skeleton
                              className={Styles.skeletonColor}
                              // animation="wave"
                              style={{ display: "inline-block" }}
                              variant="rect"
                              width={50}
                              height={5}
                            />
                          ) : (
                            <Button
                              onClick={() => handleRemove(item)}
                              className={Styles.RemoveButton}
                              variant="text"
                            >
                              REMOVE
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          {loading ? (
                            <Skeleton
                              className={Styles.skeletonColor}
                              style={{ display: "inline-block" }}
                              // animation="wave"
                              variant="rect"
                              width={50}
                              height={5}
                            />
                          ) : (
                            <>
                              {orderSummary.subAmount < item.minCartAmount ? (
                                <>
                                  <Tooltip
                                    title={
                                      "Minimum Amount in Cart should be $" +
                                      item.minCartAmount +
                                      " to apply this voucher"
                                    }
                                    color="red"
                                    key="red"
                                    placement="top"
                                    // trigger={focus}
                                    // mouseLeaveDelay={0}
                                  >
                                    <Button
                                      className={Styles.InvalidButton}
                                      disabled={
                                        orderSummary &&
                                        orderSummary.total_price == "0"
                                          ? true
                                          : false
                                      }
                                      variant="text"
                                    >
                                      INVALID
                                    </Button>
                                  </Tooltip>
                                </>
                              ) : (
                                <Button
                                  onClick={() =>
                                    handleChange(
                                      i,
                                      item.flatAmount,
                                      item.voucherName,
                                      item
                                    )
                                  }
                                  className={Styles.ApplyButton}
                                  disabled={
                                    orderSummary &&
                                    orderSummary.total_price == "0"
                                      ? true
                                      : false
                                  }
                                  variant="text"
                                >
                                  TAP TO APPLY
                                </Button>
                              )}
                              {/* <Button
                            onClick={() =>
                              handleChange(
                                i,
                                item.flatAmount,
                                item.voucherName,
                                item
                              )
                            }
                            className={Styles.ApplyButton}
                            disabled={
                              orderSummary && orderSummary.total_price == "0"
                                ? true
                                : false
                            }
                            variant="text"
                          >
                            TAP TO APPLY
                          </Button> */}
                            </>
                          )}
                        </>
                      )}
                    </ListItemText>
                  </ListItem>
                );
              })}
          </List>
          <p
            style={{ fontSize: "14px" }}
            className={
              discountMessage.status
                ? Styles.discountTextApplied
                : Styles.discountTextInvalid
            }
          >
            {discountMessage.msg}
          </p>
        </div>
      </Col>
    </>
  );

  //   return <> qweawmdbjh</>;
}

export default DiscountVoucher;
