import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./cartitem.module.scss";
import ItemCard from "./ItemCard";
import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";
import {
  decrementQty,
  incrementQty,
  removeCartItem,
  totalOrderCalc,
  removeCart,
} from "../../../store/actions/cartActions";
import CartItemSkeleton from "../CartItemSkeleton";
import QuoteTemplate from "../QuoteTemplate";
function CartItems({}) {
  const dispatch = useDispatch();
  const reportTemplateRef = useRef(null);
  const cartData = useSelector((status) => status.cartReducer.cart);
  const [loaddata, setLoadData] = useState(false);

  useEffect(() => {
    if (cartData) {
      setTimeout(() => {
        setLoadData(false);
      }, 2000);
    }
  }, [cartData]);

  const handleIncrementQty = (productID) => {
    setLoadData(true);
    dispatch(incrementQty(productID, 1));
  };
  const handleDecrementQty = (productID) => {
    setLoadData(true);
    dispatch(decrementQty(productID));
  };
  const handleRemoveItem = (id) => {
    setLoadData(true);
    dispatch(removeCartItem(id));
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("Test");
      },
    });
  };
  return (
    <Grid container>
      <Grid className={Styles.cardItemSection}>
        <Typography
          variant="h5"
          component="h2"
          className={Styles.CheckoutPageTitle}
        >
          Cart
          {/* <Button variant="contained">View & Download Quote</Button> */}
          <Button onClick={handleGeneratePdf} className={Styles.DownloadQuote}>
            View & Download Quote
          </Button>
        </Typography>
        <div className={Styles.quoteTemplate}>
          <div ref={reportTemplateRef}>
            <QuoteTemplate />
          </div>
        </div>
        {loaddata ? (
          <CartItemSkeleton Styles={Styles} />
        ) : (
          <>
            {cartData &&
              cartData.map((item, index) => (
                <ItemCard
                  handleDecrementQty={(id) => handleDecrementQty(id)}
                  handleIncrementQty={(id) => handleIncrementQty(id)}
                  handleRemoveItem={(id) => handleRemoveItem(id)}
                  item={item}
                  key={index}
                />
              ))}
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default CartItems;
