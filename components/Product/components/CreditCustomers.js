import React, { useEffect, useRef, useState } from "react";
import styles from "../Product.module.scss";
import Image from "react-bootstrap/Image";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Button from "@mui/material/Button";
import ReactToPrint from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import QuotePdf from "../../Cart/QuotePdf";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import {
  toggleIsQuoted,
  totalOrderCalc,
} from "../../../store/actions/cartActions";
import { decryptData } from "../../../services/util/customEncryptDecryprt";
import { endPoint, envUrl } from "../../../utils/factory";

function CreditCustomers() {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const saveQuotation = async () => {
    // if (imageUrl === null) {
    //   setImageError(true);
    // } else {
    //   setImageError(false);
    //   setSubmitLoading(true);
    try {
      const variables = {
        email: user && user.email,
        quoteId: quoteId,
        invoiceId: cartId,
        shippingAmount: orderSummary.shippingAmount ? orderSummary.shippingAmount : 0,
        subAmount: orderSummary.subAmount,
        totalAmount: orderSummary.totalAmount,  
        cartItems: cartItems,
      };
      const token = decryptData("token");
      const data = await axios
        .post(`${envUrl.baseUrl}${endPoint.saveQuotation}`, variables, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then(function (result) {
          // console.log("rrrrrrrrr", result);
          if (result.status == 200) {
            // console.log("result.data.msg = ", result.data.msg);
          }
        })
        .catch(function (error) {
          console.log("Error in saveQuotation AXIOS", error);
        });
    } catch (error) {
      // handleCancel();
      console.log("Error in saveQuotation FUNC", error);
    }
    // }
  };

  const quoteId = useSelector((state) => state.cartReducer.quoteId);
  const isQuoted = useSelector((state) => state.cartReducer.isQuoted);
  console.log("isQuoted", isQuoted);
  const cartData = useSelector((status) => status.cartReducer.cart);
  console.log("cartData", cartData);
  const user = useSelector((state) => state.userReducer.user);
  const cartId = useSelector((state) => state.cartReducer.cartId);
  const orderSummary = useSelector((state) => state.cartReducer.orderSummary);
  console.log("orderSummary", orderSummary);
  const isDiscount = user?.productsDiscountJson;
  const cartItems = useSelector((state) => state.cartReducer.cart);

  const handleQuotation = () => {
    if (cartData.length == 0) {
      // setQuotemessage(true);
      return Promise.reject();
    }
    if (!isQuoted) {
      // let quoteId = uuidv4();
      dispatch(toggleIsQuoted());
    }
    saveQuotation();

    // dispatch(toggleIsQuoted());
  };

  const handlePrintError = () => {
    setQuotemessage(true);
  };

  const [quotemessage, setQuotemessage] = useState(false);
  const handleCloseQuoteMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setQuotemessage(false);
  };
  let vertical = "bottom";
  let horizontal = "right";

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
    <>
      <div className={styles.CreditCustomers}>
        <div className={styles.SectionOne}>
          <div className={styles.Image}>
            <Image src="../images/Logo_w_o_BG_2.png" alt="Credit Customers" />
          </div>

          <div className={styles.Box}>
            <div className={styles.Name}>
              Credit Customers<br></br>
              Sparky Warehouse Australia
            </div>
          </div>
        </div>
        <List className={styles.List}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <VerifiedUserOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Verified Seller" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LanguageOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Worldwide shipping" />
            </ListItemButton>
          </ListItem>
        </List>
        {/* <Button variant="outlined" className={styles.RequestQuote}>
        Request Quote
      </Button> */}
        <ReactToPrint
          // onClick={handleQuotation}
          onBeforeGetContent={handleQuotation}
          // onBeforePrint={handleQuotation}
          // removeAfterPrint={true}
          onPrintError={handlePrintError}
          documentTitle={`Quotation-${quoteId}`}
          trigger={() => (
            <Button variant="outlined" className={styles.RequestQuote}>
              Request Quote
            </Button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div style={{ display: "none" }}>
        <div
          className="Wrapper"
          style={{
            width: "100%",
            margin: "auto",
            height: "auto",
            fontSize: 14,
          }}
          id="head-div"
          ref={componentRef}
        >
          {cartData && quoteId && orderSummary && user && (
            <QuotePdf
              cartData={cartData}
              quoteId={quoteId}
              orderSummary={orderSummary}
              user={user}
            />
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={quotemessage}
        autoHideDuration={4000}
        onClose={handleCloseQuoteMessage}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseQuoteMessage}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please add an item to cart to get a quote
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreditCustomers;
