/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import styles from "../Product.module.scss";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
const PriceSection = ({ product, qty }) => {
  console.log("@@pppppppppppppp qty", qty);
  console.log("@@pppppppppppppp0000", product);
  const [maxquantity, setMaxQuantity] = useState(null);
  const [getproduct, setGetProduct] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [price, setPrice] = useState(null);
  console.log("@@pppppppppppppp1111", price);
  const user = useSelector((state) => state.userReducer.user);
  const isDiscount = !!user.productsDiscountJson;
  console.log(user);
  useEffect(() => {
    const getmaxquantity =
      product && product.product_price.sort((b, a) => a.quantity - b.quantity);
    setMaxQuantity(getmaxquantity[0].quantity);
    const getProduct =
      product && product.product_price.sort((a, b) => a.quantity - b.quantity);
    setMaxPrice(getProduct[0].price);
    setGetProduct(getProduct);
  }, [product]);

  console.log("myPrduct>>>>>>>",product)
  const handleDecreaseQty = () => {
    // let Price = 0;
    // DEFAULT PRICE SHOULD BE 1st PRICE IN product_price Array
    let Price = product.product_price[0].price;
    // NEW CONDITION BY FRED ON 07-05-2024 to keep price fixed if user has discount!
    if (!isDiscount) {
      for (let v in product && product.product_price) {
        if (product && product.product_price[v].quantity == qty)
          Price = product && product.product_price[v].price;
        else if (product && product.product_price[v].quantity <= qty)
          Price = product && product.product_price[v].price;
      }
    }
    console.log("@@pppppppppppppp2222", Price);
    setPrice(Price);
  };
  useEffect(() => {
    handleDecreaseQty();
  }, [product, qty]);

  return (
    <Grid className={styles.priceSection}>
      <div className={styles.ProductPriceSection}>
        <div className={styles.ProductPrice}>
          {isDiscount ? (
            <>
              <NumericFormat
                value={
                  price -
                  price *
                    (user.productsDiscountJson[0].discountPercentage / 100)
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                className={styles.main_priceLabel}
              />
              <span className={styles.discount}>
                (-{user.productsDiscountJson[0].discountPercentage}% Off)
              </span>
            </>
          ) : (
            <>
              <NumericFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                className={styles.main_priceLabel}
              />
            </>
          )}
          <span className={styles.Text}> per pack</span>
        </div>

        <div className={styles.qtyPerPackSection}>
          {/* <span className={styles.priceLabel}>{product.qty_per_pack}</span>{" "} */}
          {product && product.qty_type=="unit" ? (
            <span className={styles.Text}>{`1 per unit`}</span>
          ):product && product.qty_type=="bag" ? (
            <>
            <span className={styles.priceLabel}>{product.qty_per_pack}</span> <span className={styles.Text}>{`per pack`}</span>
            </>
          ) :null}
          {/* <span className={styles.Text}>{`(per pack)`}</span> */}
        </div>
      </div>
      <div className={styles.pricePerPieceSection}>
        <div>
          {isDiscount ? (
            <>
              <span className={styles.reg_price}>Regular Price </span>
              <span className={styles.dis_price}>{`$${maxPrice}`}</span>
            </>
          ) : (
            <>
              <span className={styles.reg_price}>Regular Price </span>
              <span className={""}>{`$${maxPrice}`}</span>
            </>
          )}
        </div>

        {product.qty_per_pack && 
        <div>
          <span className={styles.priceLabel}>
            ${(price / product.qty_per_pack).toFixed(2)}{" "}
          </span>
          <span className={styles.per_piece}>per piece</span>
        </div>
        }
      </div>
      <hr className={styles.HR}></hr>
      {/* <div className={styles.ProductPriceSection}>
        {product &&
          product.product_price.map((data, i) => (
            <div className={styles.Box} key={i}>
              <span className={styles.Price}>
                <NumericFormat
                  value={data.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  fixedDecimalScale={true}
                />
                <span className={styles.Text}>/ Per Pack</span>
              </span>
              <span className={styles.Qty}>{data.quantity} + pcs</span>
            </div>
          ))}
      </div> */}

      <List>
        <ListItem secondaryAction="Price (Incl GST)">
          <ListItemText primary="Quantity (pack)" />
        </ListItem>
        {product &&
          product.product_price.map((data, i) => (
            <ListItem
              secondaryAction={
                <NumericFormat
                  value={data.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              }
              key={i}
            >
              <ListItemText>{data.quantity} +</ListItemText>
            </ListItem>
          ))}
      </List>
      <hr className={styles.HR}></hr>
    </Grid>
  );
};

export default PriceSection;
