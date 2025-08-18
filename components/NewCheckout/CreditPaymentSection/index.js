import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./paymentsection.module.scss";
import OrderSummary from "./OrderSummary";

function CreditPaymentSection({}) {
  const dispatch = useDispatch();

  return (
    <Grid container style={{ paddingTop: "5%" }}>
      <OrderSummary />
      {/* <StripePay /> */}
    </Grid>
  );
}

export default CreditPaymentSection;
