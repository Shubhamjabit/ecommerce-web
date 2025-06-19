/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import styles from "../Product.module.scss";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Row, Col, Button } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Input } from "antd";
import { useSelector } from "react-redux";
import { parse } from "@fortawesome/fontawesome-svg-core";
import { useMemo } from "react";
import { useCallback } from "react";
const PreassemblePriceSection = ({
  product,
  qty,
  cableLength,
  handleDecreaseQty,
  handleIncreaseQty,
  handleAddQuantity,
  urlPath,
  T1,
  T2,
  cable,
  heatSinkImageT1,
  heatSinkImageT1Color,
  heatSinkImageT2,
  heatSinkImageT2Color,
  setCustProduct,
}) => {
  console.log(
    "^^^^^^^^^^^^^ PreassemblePriceSection => product,qty,cableLength,T1,T2,cable",
    product,
    qty,
    cableLength,
    T1,
    T2,
    cable
  );
  const [maxquantity, setMaxQuantity] = useState(null);
  const [getproduct, setGetProduct] = useState(null);

  var wastePercentage = 5;
  var fixedCharges = 3.77;                
  var gpPercentage = 50;                                                                                                                                                                                               

  // const [price, setPrice] = useState(product.product_price[0].price);
  // const [originalPrice, setOriginalPrice] = useState(
  //   product.product_price[0].price
  // );
  const [price, setPrice] = useState(null);
  console.log("pppppppp PreassemblePriceSection price", price);
  console.log("pppppppp PreassemblePriceSection qty", qty);
  // console.log("cable.pricingPerMeter", cable.pricingPerMeter || "Not defined");
  console.log("originalPrice", originalPrice); 
  console.log("cableLength", cableLength);
  console.log("cable", cable);
  // console.log(product ,"producthero");

  const [originalPrice, setOriginalPrice] = useState(null);
  

  const user = useSelector((state) => state.userReducer.user);                                                                       
  // console.log("^^^^^^^^^^^^ user =", user);
  // console.log("^^^^^^^^^^^^ product =", product);
  // console.log("^^^^^^^^^^^^ T1 =", T1);
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
  }, [product]);

  const handleDecreaseQty2 = () => {
    let Price = 0;
    for (let v in product && product.product_price) {
      if (product && product.product_price[v].quantity == qty)
        Price = product && product.product_price[v].price;
      else if (product && product.product_price[v].quantity <= qty)
        Price = product && product.product_price[v].price;
    }

    setPrice(Price);
  };

  const handleChangePrice = () => {
    if (!cable || !originalPrice) {
      console.error("Cable or original price data is missing.");
      return;
    }
    console.log("cable , originalPrice , cableLength" ,cable , originalPrice , cableLength)
      let pricepercable = product.cable_pricing_permeter * cableLength;
  
      let p = pricepercable + originalPrice;
      console.log("original-price" , p)
      setPrice(p);
  };
  useEffect(() => {
    if (product) {
      // handleDecreaseQty2();
      setOriginalPrice(product.product_price[0].price);
      handleChangePrice();
    }
    calculateCustPreassemblePrice();
      // setCustProduct({
      //   id: T1.sparkyId + "+" + cable.sparkyId + "+" + T2.sparkyId,
      //   name: "Custom Lead",
      //   T1: T1,
      //   T2: T2,
      //   cable: cable,
      //   product_type: 3,
      //   pallets: "0.000",
      //   weight: "10.000",
      //   cbm: "0.0070",
      //   price: parseFloat(price / qty),
      //   product_media_list: [
      //     {
      //       pathT1: T1.img_url,
      //       pathT2: T2.img_url,
      //       colorCable: cable.jacket_colour,
      //     },
      //   ],
      //   product_price: [
      //     {
      //       price: parseFloat(parseFloat(price) / qty),
      //       quantity: qty,
      //       discountPrice: user.productsDiscountJson
      //         ? parseFloat(
      //             parseFloat(price) -
      //               (parseFloat(price) *
      //                 user.productsDiscountJson[0].discountPercentage) /
      //                 100
      //           )
      //         : null,
      //     },
      //   ],
      // });
  }, [product, qty, cableLength]);

  useEffect(() => {
    console.log("Initial useEffect triggered.");
    // Set a default value for cable_pricing_permeter if it's null
    

    // Check if all necessary values are available
    if (product && product.product_price[0].price !== undefined) {
      const cablePricingPerMeter = product?.cable_pricing_permeter !== null ? product.cable_pricing_permeter : 0;
      console.log("Product details:", product, product.product_price[0].price, cablePricingPerMeter);

      // Calculate price per cable
      let pricepercable = cablePricingPerMeter * cableLength;
      console.log({ pricepercable, cable, product }, "Calculation with cable pricing:", cablePricingPerMeter);

      // Add price per cable to original price
      let p = pricepercable + product.product_price[0].price;
      console.log("Calculated price:", p);

      // Set calculated price to state
      setPrice(p);
    } else {
      // Log missing values for debugging
      console.error("Missing one or more required values:", {
        product,
        cableLength,
        cable_pricing_permeter: product?.cable_pricing_permeter,
        originalPrice: product?.product_price[0].price,
      });
    }

    // Calculate customer preassemble price (ensure this runs after setting the price)
    calculateCustPreassemblePrice();

  }, [product, cable, cableLength, originalPrice, product?.cable_pricing_permeter]);

    


  const calculateCustPreassemblePrice = () => {
    if (product == undefined && T1 && T2 && cable) {
  
    // Calculate Component & Assembly Charges
    const a =
      parseFloat(T1.price || 0) +
      parseFloat(T1.assemblyCharges || 0) +
      parseFloat(T2.price || 0) +
      parseFloat(T2.assemblyCharges || 0);
  
    // Calculate Cable Cost
    const b = parseFloat(cable.pricingPerMeter || 0) * cableLength;
    console.log(a , "terminal price")
    // Calculate Final Pricing
    let totalCosting = a + b;
    let H = (wastePercentage * totalCosting) / 100;
    let displayPricing =
        (totalCosting + H + fixedCharges) * (1 + gpPercentage);
      // let finalDisplayPricing = displayPricing * qty;
      let finalDisplayPricing = displayPricing;
  
    // Log intermediate values for debugging
    console.log('totalCosting', totalCosting);
    // console.log('Hanuman', H);  
    console.log('finalDisplayPricing', finalDisplayPricing);
  
    // Update price state
    setPrice(finalDisplayPricing);
    return finalDisplayPricing;
    }
    
  };
  
  
  

  // console.log("###222 product = ", product);
  // console.log("####333 price = ", price);

  const memoPrice = useMemo(() => {
    if (product == undefined && T1 && T2 && cable) {
    if (product == undefined && T1 && T2 && cable) {
  
    // Calculate Component & Assembly Charges
    const a =
      parseFloat(T1.price || 0) +
      parseFloat(T1.assemblyCharges || 0) +
      parseFloat(T2.price || 0) +
      parseFloat(T2.assemblyCharges || 0);
  
    // Calculate Cable Cost
    const b = parseFloat(cable.pricingPerMeter || 0) * cableLength;
  
    // Calculate Final Pricing
    let totalCosting = a + b;
    let H = (wastePercentage * totalCosting) / 100;
    let displayPricing =
        (totalCosting + H + fixedCharges) * (1 + gpPercentage);
      // let finalDisplayPricing = displayPricing * qty;
      let finalDisplayPricing = displayPricing;
  
    // Log intermediate values for debugging
    console.log('totalCosting', totalCosting);
    // console.log('Hanuman', H);  
    console.log('finalDisplayPricing', finalDisplayPricing);
  
    // Update price state
    setPrice(finalDisplayPricing);
    return finalDisplayPricing;
    }
  }
  }, [
    T1?.price,
    T1?.assemblyCharges,
    T2?.price,
    T2?.assemblyCharges,
    cable?.pricingPerMeter,
    cableLength,
  ]);

  useEffect(() => {
    setCustProduct({
      id: T1?.sparkyId + "+" + cable?.sparkyId + "+" + T2?.sparkyId,
      name: "Custom Lead",
      T1: T1,
      T2: T2,
      cable: cable,
      product_type: 3,
      pallets: "0.000",
      weight: "10.000",
      cbm: "0.0070",
      price: parseFloat(memoPrice / qty),
      product_media_list: [
        {
          pathT1: T1?.img_url,
          pathT2: T2?.img_url,
          colorCable: cable?.jacket_colour,
        },
      ],
      product_price: [
        {
          price: parseFloat(parseFloat(memoPrice) / qty),
          quantity: qty,
          discountPrice: user.productsDiscountJson
            ? parseFloat(
                parseFloat(memoPrice) -
                  (parseFloat(memoPrice) *
                    user.productsDiscountJson[0].discountPercentage) /
                    100
              )
            : null,
        },
      ],
      heatSinkImageT1: heatSinkImageT1,
      heatSinkImageT1Color: heatSinkImageT1Color,
      heatSinkImageT2: heatSinkImageT2,
      heatSinkImageT2Color: heatSinkImageT2Color,
    });
  }, [memoPrice]);

  return (
    <Grid className={styles.priceSection}>
      <div className={styles.ProductPriceSection}>
        <div className={styles.ProductPrice}>
          <NumericFormat
            // value={qty > 1 ? (price / qty)?.toFixed(2) : price?.toFixed(2)}
            value={price?.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            fixedDecimalScale={true}
            className={styles.priceLabel}
          />
          <span className={styles.Text}> per Lead</span>
        </div>
      </div>

      <div className={`${styles.qtySection} ${styles.qtySectionPreassemble}`}>
        {/* <p className={styles.storeOptionTitle}>Select Quantity:</p> */}
        <Typography variant="h6" gutterBottom className={styles.h6}>
          Enter lead length to view pricing (in Meters)
        </Typography>
        <div className={styles.qtyBox}>
          <Button
            // className={styles.qtyButton}
            className={
              cableLength > 0.5 ? styles.qtyButton : styles.qtyButtonDisable
            }
            variant="light"
            onClick={() => {
              handleDecreaseQty("cableLength");
            }}
            disabled={cableLength === 0.5 ? true : false}
          >
            <RemoveIcon />
          </Button>
          <Input
            className={styles.qtyButtonText}
            onChange={(evnt) => {
              const value = evnt.target.value;
                handleAddQuantity(evnt, "cableLength");
            }}
            name="cable_length"
            value={cableLength}  
          />
          {/* <Button
          className={styles.qtyButtonText}
          variant="light"
          disabled={true}
        >
          {qty}
        </Button> */}
          <Button
            className={styles.qtyButton}
            variant="light"
            onClick={() => {
              handleIncreaseQty("cableLength");
            }}
          >
            <AddIcon />
          </Button>
        </div>
        {/* <div className={styles.meterDiv}>
          <span>Meters</span>
        </div> */}
      </div>
    </Grid>
  );
};

export default PreassemblePriceSection;
