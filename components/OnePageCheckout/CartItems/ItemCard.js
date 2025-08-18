import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { NumericFormat } from "react-number-format";
import Styles from "./cartitem.module.scss";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

function ItemCard({
  item,
  handleDecrementQty,
  handleIncrementQty,
  handleRemoveItem,
}) {
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.WEB_DOMAIN}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <Card className={Styles.cardItemList}>
        <Row>
          <Col sm={6} xs={12} md={3} className={Styles.SectionOne}>
            <Link passHref={true} scroll={true} href="/">
              <a className={Styles.Link}>
                <Image
                  loader={myLoader}
                  src="images/products/category.png"
                  alt="Name"
                  layout="responsive"
                  quality={100}
                  height={50}
                  width={50}
                />
              </a>
            </Link>
          </Col>
          <Col sm={6} xs={12} md={6} className={Styles.SectionTwo}>
            <div className={Styles.itemDetails}>
              <span className={Styles.Days}>
                Available for 5-7 business days
              </span>
              <Link
                passHref={true}
                style={{ cursor: "pointer" }}
                scroll={true}
                href="/"
              >
                <a className={Styles.Name}>B05-AMXX/6H1.5</a>
              </Link>

              <span className={Styles.Arrive}>Arrive on 24 Jan 2023</span>
            </div>
          </Col>
          <Col sm={6} xs={12} md={3} className={Styles.SectionThree}>
            <IconButton
              color="primary"
              aria-label="remove cart item"
              onClick={() => handleRemoveItem(item.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <NumericFormat
              value={item.price * item.qty.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              fixedDecimalScale={true}
              className={Styles.Price}
            />
            <div className={Styles.ItemQty}>
              <Button
                className={Styles.leftbtn}
                variant="light"
                disabled={item.qty === 1 ? true : false}
                onClick={() => handleDecrementQty(item.id)}
              >
                <RemoveIcon />
              </Button>
              <span className={Styles.quantity}> {item.qty} </span>
              <Button
                className={Styles.rightbtn}
                variant="light"
                //disabled={item.AvlQty > item.qty ? false : true}
                onClick={() => handleIncrementQty(item.id)}
              >
                <AddIcon />
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default ItemCard;
