import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./paymentsection.module.scss";
import OrderSummary from "./OrderSummary";
import StripePay from "./StripePay";
function PaymentSection({}) {
  const dispatch = useDispatch();

  return (
    <Grid container>
      {/* <OrderSummary /> */}
      <StripePay />
    </Grid>
  );
}

export default PaymentSection;
