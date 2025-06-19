import styles from "./Product.module.scss";
import React, { useState, useEffect } from "react";
import Features from "./components/Features";
import QtySection from "./components/QtySection";
import Button from "@mui/material/Button";
import StarRow from "./components/StarRow";
import PriceSection from "./components/PriceSection";
import IconButton from "@mui/material/IconButton";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { envUrl, endPoint } from "../../utils/factory";
import PreassemblePriceSection from "./components/PreassemblePriceSection";
import { useRouter } from "next/router";
import { Alert, Snackbar } from "@mui/material";
import { decryptData } from "../../services/util/customEncryptDecryprt";
import moment from "moment-timezone";

const ProductData = ({
  product,
  handleAddtoCard,
  handleDecreaseQty,
  handleIncreaseQty,
  handleAddQuantity,
  qty,
  cableLength,
  urlPath,
  T1,
  T2,
  cable,
}) => {
  console.log("ccccccccccccc1111 product", product);
  console.log("ccccccccccccc222 product", qty - parseFloat(product?.stock));
  const [maxquantity, setMaxQuantity] = useState(null);
  const [getproduct, setGetProduct] = useState(null);
  const [custProduct, setCustProduct] = useState({});
  console.log("ccccccccccccc custProduct", custProduct);
  const user = useSelector((state) => state.userReducer.user);
  console.log("user", user);
  const [loading, setLoading] = useState(false);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState(false);
  const [quoteId, setQuoteId] = useState(null);
  let vertical = "bottom";
  let horizontal = "right";
  const handleCloseWishlistMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWishlistMessage(false);
  };
  const router = useRouter();

  const addToWishlist = async (data) => {
    console.log("!!router fro product wishlist", data);
    try {
      const token = decryptData("token");
      console.log("token in addToWishlist", token);
      setLoading(true);
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
        setIsProductInWishlist(true);
        setWishlistMessage(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteFromWishlist = async (productId) => {
    try {
      const token = decryptData("token");
      const response = await axios.post(
        `${envUrl.baseUrl}${endPoint.wishlist}`,
        {
          user_id: user.id,
          product_id: productId,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
          params: {
            type: "delete",
          },
        }
      );
      console.log("!!del wishlist", response);
      if (response.data.data.success) {
        setIsProductInWishlist(false);
        setWishlistMessage(true);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  async function getWishlist(productId, userId) {
    console.log("!!get Wishlist", productId, userId);
    try {
      const token = decryptData("token");
      setLoading(true);
      const response = await axios.get(
        `${envUrl.baseUrl}${endPoint.wishlist}/${userId}`,
        {
          headers: { "Content-Type": "application/json", Authorization: token },
          params: {
            productId,
          },
        }
      );
      if (response.data.data.length > 0) {
        setIsProductInWishlist(true);
      }
    } catch (error) {
      console.log("!!error in fetching wishlist for a product", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (product) {
      const getmaxquantity =
        product &&
        product.product_price.sort((b, a) => a.quantity - b.quantity);
      setMaxQuantity(getmaxquantity[0].quantity);
      const getProduct =
        product &&
        product.product_price.sort((a, b) => a.quantity - b.quantity);
      setGetProduct(getProduct);
    }
    if (user && product) {
      getWishlist(product.id, user.id);
    }
    setQuoteId(
      `${user?.id}${moment().format("DD/MM/YYYY").replaceAll("/", "")}${
        user?.cust_product_count
      }`
    );
  }, [product, user]);

  const handleRequestQuote = async () => {
    console.log(
      "handleRequetQuote T1",
      localStorage.getItem("preassembleTerminalT1")
    );
    console.log(
      "handleRequetQuote T2 ",
      localStorage.getItem("preassembleTerminalT2")
    );
    console.log(
      "handleRequetQuote Cable",
      localStorage.getItem("preassembleCable")
    );
    let customProductNotRegular = {
      T1: JSON.parse(localStorage.getItem("preassembleTerminalT1")),
      T2: JSON.parse(localStorage.getItem("preassembleTerminalT2")),
      cable: JSON.parse(localStorage.getItem("preassembleCable")),
      email: user.email,
      quote_date: moment().tz("Australia/Sydney").format("DD/MM/YYYY"),
      customer_name: user.firstName + " " + user.lastName,
      cust_quote_id: `${user.id}${moment()
        .format("DD/MM/YYYY")
        .replaceAll("/", "")}${user.cust_product_count}`,
      customer_id: user.id,
      // cust_quote_id: `${user.id}${moment().unix()}${user.cust_product_count}`,
    };
    console.log(
      "handleRequetQuote customProductNotRegular",
      customProductNotRegular
    );

    //     const obj = {"vervaldatum_apk": "20210402", "datum_tenaamstelling": "20100318"};
    // const res = Object.fromEntries(
    //   Object.entries(obj).map(([k, v]) => [k, new Date(v.replace(/(\d+)(\d{2})(\d{2})/g, '$1-$2-$3'))])
    // );
    // console.log(res);
    // return;
    try {
      const token = decryptData("token");
      // setLoading(true);
      const response = await axios.post(
        `${envUrl.baseUrl}${endPoint.saveCustomProductQuote}`,
        { customProductNotRegular },
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          // params: {
          //   type: "add",
          // },
        }
      );
      console.log("!! handleRequetQuote", response);
      if (response?.data?.data?.success) {
        // setIsProductInWishlist(true);
        // setWishlistMessage(true);
        console.log("data in handleRequetQuote request", response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <span className={styles.inStockBlock}>
        <CheckOutlinedIcon />
        In Stock
      </span>
      <div>
        {qty > parseFloat(product?.stock) ? parseFloat(product?.stock) : qty}{" "}
        dispatches now
      </div>
      <div>
        <span style={{ color: "red" }}>
          {qty > product?.stock ? qty - product?.stock : 0}
        </span>{" "}
        backordered
      </div>
      {/* <span className={styles.outStockBlock}>Out of stock</span> */}
      {urlPath == "customized-product" ? (
        <h1 className={styles.Title}>
          Your custom Lead {user ? `- ${quoteId}` : ""}
        </h1>
      ) : (
        <h1 className={styles.productName}>{product.name}</h1>
      )}
      {urlPath == "customized-product" ? (
        <>
          {/* <div className={styles.InfoSection}>
          <span>
            Sparky ID - <strong>1111111</strong>
          </span>
          <span>
            Manufacturer ID - <strong>111111</strong>
          </span>
        </div> */}
        </>
      ) : (
        <>
          <div className={styles.InfoSection}>
            {product.sparky_id && (
              <span>
                Sparky ID - <strong>{product.sparky_id}</strong>
              </span>
            )}
            {product.manufacturer_id && (
              <span>
                Manufacturer ID - <strong>{product.manufacturer_id}</strong>
              </span>
            )}
          </div>
          {/* <StarRow /> */}
        </>
      )}

      {/* check for price if user */}
      {user ? (
        <>
          {(product && product.product_type == 2) ||
          urlPath == "customized-product" ? (
            <>
              {(T1 && T1.sparkyId && T2 && T2.sparkyId && cable.sparkyId) ||
              product?.product_type == 2 ? (
                <PreassemblePriceSection
                  product={product}
                  qty={qty}
                  cableLength={cableLength}
                  handleDecreaseQty={handleDecreaseQty}
                  handleIncreaseQty={handleIncreaseQty}
                  handleAddQuantity={handleAddQuantity}
                  urlPath={urlPath}
                  T1={T1}
                  T2={T2}
                  cable={cable}
                  setCustProduct={setCustProduct}
                />
              ) : (
                <h3 className={styles.CustTitle2}>
                  {" "}
                  This is not a regular product
                </h3>
              )}
            </>
          ) : (
            <PriceSection product={product} qty={qty} />
          )}
          {/* <PriceSection product={product} qty={qty} /> */}
          {/* <Features /> */}
          {urlPath == "customized-product" &&
          (T1?.sparkyId == null ||
            T2?.sparkyId == null ||
            cable?.sparkyId == null) ? (
            <div className={styles.ButtonContainer}>
              {" "}
              <Button variant="contained" onClick={handleRequestQuote}>
                Request for Quote
              </Button>{" "}
            </div>
          ) : (
            <>
              {" "}
              <QtySection
                handleDecreaseQty={handleDecreaseQty}
                handleIncreaseQty={handleIncreaseQty}
                handleAddQuantity={handleAddQuantity}
                qty={qty}
              />
              <div className={styles.BuySection}>
                <div className={styles.ProductPriceSection}>
                  {(product && product.product_type == 2) ||
                  urlPath == "customized-product" ? null : (
                    <>
                      {maxquantity < qty && (
                        <div className={styles.RequestPrice}>
                          <Link
                            className={styles.RequestButton}
                            variant="light"
                            href="#"
                          >
                            request for best price
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                  {/* {maxquantity < qty && (
                <div className={styles.RequestPrice}>
                  <Link
                    className={styles.RequestButton}
                    variant="light"
                    href="#"
                  >
                    request for best price
                  </Link>
                </div>
              )} */}
                </div>
                <div style={{ display: "flex" }}>
                  <Button
                    className={styles.addtoCart}
                    onClick={() => {
                      handleAddtoCard(
                        product ? product : custProduct,
                        qty,
                        cableLength
                      );
                    }}
                    // disabled={custProduct?.price > 0 ? false : true}
                  >
                    Add to cart
                  </Button>
                  {product ? (
                    <IconButton
                      aria-label="delete"
                      size="small"
                      className={
                        isProductInWishlist.toString() === "true"
                          ? styles.wishlist
                          : styles.no_wishlist
                      }
                      disabled={loading}
                      onClick={() => {
                        isProductInWishlist
                          ? deleteFromWishlist(
                              product ? product.id : custProduct.id
                            )
                          : addToWishlist(
                              product
                                ? {
                                    product_id: product.id,
                                    product_type: 1,
                                    product_name: product.name,
                                    product_image:
                                      product.product_media[0].path,
                                    product_price:
                                      product.product_price[0].price,
                                    product_category:
                                      product.category_hierarchy[0].name,
                                    user_id: user.id,
                                    user_email: user.email,
                                  }
                                : {
                                    product_id: custProduct.id,
                                    product_type: custProduct.product_type,
                                    product_name: custProduct.name,
                                    product_image:
                                      custProduct.product_media_list[0],
                                    product_price: custProduct.price,
                                    product_category: "",
                                    user_id: user.id,
                                    user_email: user.email,
                                  }
                            );
                      }}
                    >
                      {/* <FavoriteBorderIcon fontSize="small" /> */}
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                  ) : null}
                </div>
                {/* <Button variant="contained">Buy Now</Button> */}
              </div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 1,
                  m: 1,
                }}
                className={styles.dispatchSection}
              >
                <span>* same day dispatch</span>
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <Row style={{ paddingTop: "4%", fontSize: "large" }}>
            {" "}
            <Col>
              Please <Link href="/login">Log in</Link> or{" "}
              <Link href="/registration">Sign up</Link> to view prices
            </Col>
          </Row>
        </>
      )}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={wishlistMessage}
        autoHideDuration={4000}
        onClose={handleCloseWishlistMessage}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseWishlistMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          {isProductInWishlist
            ? "Product added to wishlist!"
            : "Product removed from wishlist!"}
        </Alert>
      </Snackbar>
    </>
  );
};
export default ProductData;
