import styles from "./Product.module.scss";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import ImageArea from "./components/ImageArea";
import ProductData from "./ProductData";
import ProductDetail from "./components/ProductDetail";
import { ProductDetails } from "./ProductDetails";
import { addToCart, incrementQty } from "./../../store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ProductCertificate from "./components/ProductCertificate";
import ImageAreaForCustPreassemble from "./components/ImageAreaForCustPreassemble";
import ProductSkeleton from "./ProductSkeleton";
// import TagManager from 'react-gtm-module';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Product = ({ product, urlPath }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const paths = router.asPath.split("/");
  const [qty, setQty] = useState(1);
  const [cableLength, setCableLength] = useState(1);
  const [cartmessage, setCartMessage] = useState(false);
  const [qtyLimit] = React.useState({
    min: 1,
    max: 10000,
  });
  const [cableLengthLimit] = React.useState({
    min: 0.5,
    max: 100,
  });
  const [T1, setT1] = useState();
  const [T2, setT2] = useState();
  const [cable, setCable] = useState();
  const [heatSinkImageT1, setHeatSinkImageT1] = useState();
  const [heatSinkImageT1Color, setHeatSinkImageT1Color] = useState();
  const [heatSinkImageT2, setHeatSinkImageT2] = useState();
  const [heatSinkImageT2Color, setHeatSinkImageT2Color] = useState();
  // console.log("%%%%%%%%%%%%%%%%%%11111", T1);
  // console.log("%%%%%%%%%%%%%%%%%%2222", T2);
  console.log("%%%%%%%%%%%%%%%%%%333", cable);

  useEffect(() => {
    if (isNaN(qty) === true || qty === 0) {
      setQty(1);
    }
    if (isNaN(cableLength) === true || cableLength === 0) {
      setCableLength(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, cableLength]);

  useEffect(() => {
    var v1 = JSON.parse(localStorage.getItem("preassembleTerminalT1"));
    var v2 = JSON.parse(localStorage.getItem("preassembleTerminalT2"));
    var v3 = JSON.parse(localStorage.getItem("preassembleCable"));
    var v4 = JSON.parse(localStorage.getItem("heatSinkImage"));
    setT1(v1);
    setT2(v2);
    setCable(v3);
    setHeatSinkImageT1(v4?.heatSinkImageT1);
    setHeatSinkImageT1Color(v4?.sixthFilterValue);
    setHeatSinkImageT2(v4?.heatSinkImageT2);
    setHeatSinkImageT2Color(v4?.sixthFilterValueT2);
  }, []);

  const handleIncreaseQty = (type) => {
    // console.log("### type = ", type);
    if (type == "cableLength") {
      if (cableLength < cableLengthLimit.max) {
        const value = cableLength + 0.5;
        setCableLength(value);
      }
    } else {
      if (qty < qtyLimit.max) {
        const value = qty + 1;
        setQty(value);
      }
    }
  };
  const handleDecreaseQty = (type) => {
    if (type == "cableLength") {
      if (cableLength > cableLengthLimit.min) {
        const value = cableLength - 0.5;
        setCableLength(value);
      }
    } else {
      if (qty > qtyLimit.min) {
        const value = qty - 1;
        setQty(value);
      }
    }
  };

  const handleAddQuantity = (evnt, type) => {
    if (type == "cableLength") {
      if (evnt.target.value < cableLengthLimit.max) {
        const value = evnt.target.value;
        setCableLength(parseInt(value));
      } else if (evnt.target.value > cableLengthLimit.min) {
        const value = evnt.target.value;
        setCableLength(parseInt(value));
      }
    } else {
      if (evnt.target.value < qtyLimit.max) {
        const value = evnt.target.value;
        setQty(parseInt(value));
      } else if (evnt.target.value > qtyLimit.min) {
        const value = evnt.target.value;
        setQty(parseInt(value));
      }
    }

    //setQty(parseInt(evnt.target.value));
  };
  const handleAddtoCard = (product, qty, cableLength) => {
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@", product);
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@222", qty);
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@333", cableLength);
    dispatch(addToCart(product, qty, cableLength));
    setCartMessage(true);
    //openModal();
  };

  const handleCloseCartMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCartMessage(false);
  };

  let vertical = "bottom";
  let horizontal = "right";

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <Row className={styles.productOuterBox}>
        <Col md={6} sm={12} xs={12}>
          {urlPath == "customized-product" ? (
            <>
              {T1 &&
              T1.sparkyId !== null &&
              T2 &&
              T2.sparkyId !== null &&
              cable &&
              cable.sparkyId !== null ? (
                <ImageAreaForCustPreassemble
                  T1={T1}
                  T2={T2}
                  cable={cable}
                  heatSinkImageT1={heatSinkImageT1}
                  heatSinkImageT1Color={heatSinkImageT1Color}
                  heatSinkImageT2={heatSinkImageT2}
                  heatSinkImageT2Color={heatSinkImageT2Color}
                />
              ) : (
                <div className={styles.ContentContainer}>
                  {" "}
                  <span style={{ color: "orange", fontWeight: "Bold" }}>
                    {" "}
                    This is not our regular product. We have your requirements
                    now and we will contact you shortly with our best quotation
                    or for any more information we may require.{" "}
                  </span>
                </div>
              )}
            </>
          ) : (
            <ImageArea product={product} />
          )}
        </Col>
        <Col md={6} sm={12} xs={12}>
          <div className={styles.productdetailsBox}>
            <ProductData
              product={product}
              qty={qty}
              cableLength={cableLength}
              handleIncreaseQty={handleIncreaseQty}
              handleDecreaseQty={handleDecreaseQty}
              handleAddtoCard={handleAddtoCard}
              handleAddQuantity={handleAddQuantity}
              urlPath={urlPath}
              T1={T1}
              T2={T2}
              cable={cable}
              heatSinkImageT1={heatSinkImageT1}
              heatSinkImageT1Color={heatSinkImageT1Color}
              heatSinkImageT2={heatSinkImageT2}
              heatSinkImageT2Color={heatSinkImageT2Color}
            />
          </div>
        </Col>
        <Col md={12} sm={12} xs={12}>
          {urlPath == "customized-product" ? (
            <>
              {" "}
              <ProductDetails product={product} T1={T1} T2={T2} cable={cable} />
            </>
          ) : (
            <>
              {" "}
              <ProductCertificate product={product} />
              <ProductDetails product={product} />
            </>
          )}
        </Col>
      </Row>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={cartmessage}
        autoHideDuration={4000}
        onClose={handleCloseCartMessage}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseCartMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Product;
