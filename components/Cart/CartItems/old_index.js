import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./cartitem.module.scss";
import ItemCard from "./ItemCard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import jsPDF from "jspdf";
import {
  decrementQty,
  incrementQty,
  removeCartItem,
  totalOrderCalc,
  removeCart,
  toggleIsQuoted,
} from "../../../store/actions/cartActions";
import CartItemSkeleton from "../CartItemSkeleton";
import QuoteTemplate from "../QuoteTemplate";
// import { Container, Row, Col } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import DeliveryOptions from "../DeliveryOptions";
import ShippingOptions from "../ShippingOptions";
import { Space } from "antd";
import { Col, Row, Typography, Button } from "antd";
import OrderSummaryList from "../OrderSummaryList";
import Link from "next/link";
const { Title, Text } = Typography;
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReactToPrint from "react-to-print";
import QuotePdf from "../QuotePdf";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { envUrl, endPoint } from "../../../utils/factory";
import { DeleteTwoTone } from "@ant-design/icons";
import { decryptData } from "../../../services/util/customEncryptDecryprt";
import { Alert, Snackbar } from "@mui/material";

function CartItems({}) {
  const dispatch = useDispatch();
  const componentRef = useRef();
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
    // console.log("********* handleDecrementQty", productID);
    setLoadData(true);
    dispatch(decrementQty(productID));
  };
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  console.log("deleteConfirmModal", deleteConfirmModal);

  const handleDeleteButton = () => {
    setDeleteConfirmModal(true);
  };

  const handleRemoveItem = (id) => {
    console.log("DELETED ID", id);
    // setLoadData(true);
    // dispatch(removeCartItem(id));
    // setDeleteConfirmModal(false);
  };

  const handleMoveToWishlist = (product) => {
    console.log("product", product);
    const data = {
      product_id: product.id,
      product_type: product.productType,
      product_name: product.name,
      product_image: product.image,
      product_price: product.pricelist[0].price,
      // product_category: product.category_hierarchy[0].name,
      user_id: user.id,
      user_email: user.email,
      product_cable_length: product.product_type == 2 ? cableLength : null,
    };
    console.log("DATA", data);
    addToWishlist(data);
    handleRemoveItem(product.id);
    setDeleteConfirmModal(false);
  };

  const addToWishlist = async (data) => {
    console.log("!!router fro product wishlist", data);
    // return;
    try {
      const token = decryptData("token");
      console.log("token in addToWishlist", token);
      // setLoading(true);
      const response = await axios.post(
        `${envUrl.baseUrl}${endPoint.wishlist}`,
        { ...data },
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          params: {
            type: "add",
          },
        }
      );
      console.log("!!add wishlist", response);
      if (response?.data?.data?.success) {
        // setIsProductInWishlist(true);
        // setWishlistMessage(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
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
  const quoteId = useSelector((state) => state.cartReducer.quoteId);
  const user = useSelector((state) => state.userReducer.user);
  const cartId = useSelector((state) => state.cartReducer.cartId);
  const cartItems = useSelector((state) => state.cartReducer.cart);
  const orderSummary = useSelector((state) => state.cartReducer.orderSummary);
  const isDiscount = user?.productsDiscountJson;
  // console.log(isDiscount);
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
        shippingAmount: orderSummary.shippingAmount,
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
  const isQuoted = useSelector((state) => state.cartReducer.isQuoted);
  const handleQuotation = () => {
    // console.log("callleddddddddd");
    if (!isQuoted) {
      // let quoteId = uuidv4();
      dispatch(toggleIsQuoted());
    }
    saveQuotation();

    // dispatch(toggleIsQuoted());
  };

  // variabled, states and function for snackbar
  let vertical = "bottom";
  let horizontal = "right";

  const [deleteCartMessage, setDeleteCartMessage] = useState(false);
  console.log("ttttttttttt", deleteCartMessage);

  const handleCloseDeleteCartMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteCartMessage(false);
  };

  const handleDeleteCart = () => {
    setDeleteCartMessage(true);
    // putting this in timeout as alert message doesnt come if done immediately
    setTimeout(() => {
      dispatch(removeCart());
    }, 500);
  };
  return (
    <>
      <Grid container>
        {/* Cart Item in Full View */}
        <Grid className={Styles.cardItemSection}>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={16}>
              <Typography
                variant="h5"
                component="h2"
                className={Styles.CheckoutPageTitle}
              >
                Cart
              </Typography>
            </Col>
            <Col className="gutter-row" span={5}>
              <Row style={{ paddingLeft: "40%" }}>
                <span onClick={handleQuotation}>
                  <ReactToPrint
                    onClick={handleQuotation}
                    // onBeforeGetContent={handleQuotation}
                    documentTitle={`Quotation-${quoteId}`}
                    trigger={() => (
                      <Button
                        onClick={handleQuotation}
                        className={Styles.DownloadQuote}
                      >
                        View & Download Quote
                      </Button>
                    )}
                    content={() => componentRef.current}
                  />
                </span>
              </Row>
              {/* <Row style={{ paddingLeft: "40%" }}>
              <Text italic style={{ color: "#FF0000" }}>
                *Delete cart to make new Quote
              </Text>
            </Row> */}
            </Col>
            <Col className="gutter-row" span={3}>
              <Button
                type="primary"
                danger
                className={Styles.DeleteCart}
                onClick={handleDeleteCart}
              >
                Delete Cart
                {/* <DeleteTwoTone twoToneColor="#FF0000" /> */}
              </Button>
            </Col>
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
                <QuotePdf
                  cartData={cartData}
                  quoteId={quoteId}
                  orderSummary={orderSummary}
                  user={user}
                />
              </div>
            </div>
            {/* <Button onClick={handleGeneratePdf} className={Styles.DownloadQuote}>
            View & Download Quote
          </Button> */}
          </Row>
          <Row style={{ paddingLeft: "76%", marginTop: "-1%" }}>
            <Text italic style={{ color: "#FF0000" }}>
              *Delete cart to make new Quote
            </Text>
          </Row>
          <div className={Styles.quoteTemplate}>
            <div ref={reportTemplateRef}>
              <QuoteTemplate />
            </div>
          </div>
          {loaddata ? (
            <CartItemSkeleton Styles={Styles} />
          ) : (
            <>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
                // justify="space-between"
                // style={{ textAlign: "center" }}
              >
                <Col span={1} className="gutter-row">
                  Item
                </Col>
                <Col span={3} className="gutter-row">
                  Product Image
                </Col>
                <Col span={2} className="gutter-row">
                  Description
                </Col>
                <Col
                  span={isDiscount ? 2 : 4}
                  className="gutter-row"
                  // style={{ textAlign: "center" }}
                >
                  Quantity
                </Col>
                <Col span={isDiscount ? 3 : 6} className="gutter-row">
                  Availability
                </Col>
                <Col span={3} className="gutter-row">
                  Unit Price AUD.
                </Col>
                <Col span={3} className="gutter-row">
                  Ext. Price AUD
                </Col>
                {isDiscount && (
                  <>
                    <Col span={2} className="gutter-row">
                      Discount
                    </Col>
                    <Col span={4} className="gutter-row">
                      Total Price After Discount
                    </Col>
                  </>
                )}
              </Row>
              <Divider
                style={{
                  background: "#2595d4",
                  borderBottomWidth: 3,
                  opacity: "inherit",
                }}
              />
              {cartData &&
                cartData.map((item, index) => (
                  <>
                    <ItemCard
                      handleDecrementQty={(id) => handleDecrementQty(id)}
                      handleIncrementQty={(id) => handleIncrementQty(id)}
                      handleRemoveItem={(id) => handleRemoveItem(id)}
                      item={item}
                      index={index}
                      isDiscount={isDiscount}
                      totalDiscount={
                        (user?.productsDiscountJson &&
                          user?.productsDiscountJson[0]?.discountPercentage) ||
                        0
                      }
                      deleteConfirmModal={deleteConfirmModal}
                      handleDeleteButton={handleDeleteButton}
                      handleMoveToWishlist={handleMoveToWishlist}
                    />
                    <Divider
                      style={{
                        background: "#2595d4",
                        borderBottomWidth: 3,
                        opacity: "inherit",
                      }}
                    />
                  </>
                ))}

              {/* <Row style={{ paddingTop: "2%" }}>
              <Col span={8}>
                <DeliveryOptions />
              </Col>
              <Col span={8}>
                <ShippingOptions />
              </Col>
              <Col span={8}>
                <OrderSummaryList />
              </Col>
            </Row> */}
              <Row style={{ paddingTop: "2%" }}>
                <Col span={6} offset={11}>
                  <Title
                    level={2}
                    //  className={Styles.continueShoppingText}
                  >
                    <Link href="/">
                      <span className={Styles.continueShoppingText}>
                        Continue Shopping
                      </span>
                      {/* &#62; */}
                    </Link>
                  </Title>
                </Col>
                <Col span={6}>
                  <Link href="/checkout">
                    <Button type="primary">PROCEED TO CHECKOUT</Button>
                  </Link>
                </Col>
              </Row>
            </>
          )}
        </Grid>
        {/*=========================================================================================================*/}
        {/* Responsive Cart Item Section For Mobile*/}
        <Grid className={Styles.ResponsiveCartItemSection}>
          <Grid className={Styles.HeaderContainerBox}>
            <h3>Cart</h3>
            <span style={{ paddingRight: "2%" }}>
              <Button
                onClick={handleGeneratePdf}
                className={Styles.DownloadQuote}
              >
                View & Download Quote
              </Button>
            </span>
            <span>
              <Button
                type="primary"
                danger
                className={Styles.DeleteCart}
                onClick={handleDeleteCart}
              >
                Delete Cart
                {/* <DeleteTwoTone twoToneColor="#FF0000" /> */}
              </Button>
            </span>
          </Grid>
          {cartData &&
            cartData.map((item, i) => (
              <Grid className={Styles.CartItemBox} key={i}>
                <Grid className={Styles.CartItemHeader}>
                  <Grid className={Styles.Title}>
                    <p>
                      Item <span>{i + 1}</span>
                    </p>
                  </Grid>
                  <Grid className={Styles.RemoveIcon}>
                    <img
                      src="/images/remove-Icon.png"
                      alt="icon"
                      // onClick={() => handleRemoveItem(item.id)}
                      onClick={handleDeleteButton}
                    />
                  </Grid>
                </Grid>
                <Grid className={Styles.ItemBody}>
                  <Grid className={Styles.TopItemInfoBox}>
                    <Grid className={Styles.ProductDetails}>
                      <h3>Product Image</h3>
                      <img
                        src={`${process.env.PRODUCT_CDN_URL}` + `${item.image}`}
                        alt="proct"
                      />
                    </Grid>
                    <Grid className={Styles.ProductDesc}>
                      <Grid className={Styles.InfoItem}>
                        <h3>Description</h3>
                        <span>{item.name}</span>
                      </Grid>
                      <Grid className={Styles.InfoItem}>
                        <h3>Availability</h3>
                        <span>18 dispatches now</span>
                        <br></br>
                        <span className={Styles.Redtext}>2 backordered</span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <hr className={Styles.HRLine}></hr>
                  <Grid className={Styles.BottomItemInfoBox}>
                    <Grid className={Styles.QuntityInfo}>
                      <h3>Quantity</h3>
                      <Grid className={Styles.QtyRanger}>
                        <button onClick={() => handleDecrementQty(item.id)}>
                          -
                        </button>
                        <div className={Styles.Counter}>{item.qty}</div>
                        <button onClick={() => handleIncrementQty(item.id)}>
                          +
                        </button>
                      </Grid>
                    </Grid>
                    <Grid className={Styles.PriceInfo}>
                      <Grid className={Styles.InfoItem}>
                        <h3>Unit Price AUD</h3>
                        <span>${item.price}</span>
                      </Grid>
                      <Grid className={Styles.InfoItem}>
                        <h3>Ext. Price AUD</h3>
                        <span>${item.price * item.qty.toFixed(2)}</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          <Grid className={Styles.HRLine}></Grid>
          {/* <Grid className={Styles.DeliverOptionBox}>
          <button>See Delivery Options</button>
          <p>
            Your cart contains backordered items. How would you like them
            shipped?
          </p>
          <Grid className={Styles.RadioGroupOption}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Send items as they become available. (Multiple Shipments)"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Wait until all items are in stock. (1 Shipment)"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid className={Styles.ShippingOption}>
          <button>See Shipping Options</button>
          <Grid className={Styles.OrderDetailsBox}>
            <Grid className={Styles.DetailsItem}>
              <label>Toll (Overnight)</label>
              <span>$100.00</span>
            </Grid>
            <Grid className={Styles.DetailsItem}>
              <label>IPEC-Common (Road)</label>
              <span>$60.00</span>
            </Grid>
            <Grid className={Styles.DetailsItem}>
              <label>Jyade (Road)</label>
              <span>$50.00</span>
            </Grid>
            <Grid className={Styles.DetailsItem}>
              <label>Aussifact</label>
              <span>$55.00</span>
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <Grid className={Styles.OrderDetailsBox}>
            <Grid className={Styles.DetailsItem}>
              <label>Sub Total</label>
              <span>$810.00</span>
            </Grid>
            <Grid className={Styles.DetailsItem}>
              <label>Best Shipping</label>
              <span>$50.00</span>
            </Grid>
            <Grid className={Styles.DetailsItem}>
              <label>TAX</label>
              <span>$5.00</span>
            </Grid>
            <Grid className={Styles.DetailsItem}>
              <label>Total Amount(INC. GST)</label>
              <span>$865.00</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={Styles.HRLine}></Grid> */}
          <Grid className={Styles.ButtonContainer}>
            <Link href="/checkout">
              <button>PROCEED TO CHECKOUT</button>
            </Link>
            <Link href="/">
              <a>
                <button>
                  <span>Continue Shopping</span>
                  {/* <ArrowForwardIosIcon /> */}
                </button>
              </a>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={deleteCartMessage}
        autoHideDuration={4000}
        onClose={handleCloseDeleteCartMessage}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseDeleteCartMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cart Deleted!
        </Alert>
      </Snackbar>
    </>
  );
}

export default CartItems;
