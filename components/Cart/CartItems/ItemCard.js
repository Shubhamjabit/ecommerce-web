import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Alert,
  Dialog,
  DialogContent,
  Snackbar,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { NumericFormat } from "react-number-format";
import Styles from "./cartitem.module.scss";
import CloseIcon from "@mui/icons-material/Close";
// import Image from "next/image";
import Image from "react-bootstrap/Image";
import { Col, Row } from "antd";

import { useDispatch, useSelector } from "react-redux";

function ItemCard({
  item,
  handleDecrementQty,
  handleIncrementQty,
  handleRemoveItem,
  index,
  isDiscount,
  totalDiscount,
  deleteConfirmModal,
  handleDeleteButton,
  handleMoveToWishlist,
  handleClose,
}) {


  const myLoader = ({ src, width, quality }) => {
    return `${process.env.WEB_DOMAIN}${src}?w=${width}&q=${quality || 75}`;
  };
  // console.log("!!!!!!!@@@@@@@@ heatSinkImageT1 = ", item);
  // console.log("shuitems" , item)

  return (
    <>
      <Card className={Styles.cardItemList} style={{ boxShadow: "none" }}>
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
          <Col style={{ textAlign: "center" }} span={1} className="gutter-row">
            {index + 1}
          </Col>
          <Col
            style={{ textAlign: "center" }}
            span={3}
            // style={{ textAlign: "center" }}
            className={`${Styles.SectionOne} gutter-row`}
          >
            {item.productType == 3 ? (
              <>
                <div className={Styles.ProductImageSection}>
                  <div>
                    <Image
                      loader={myLoader}
                      src={
                        item.imageArrayIfCust[0].pathT1
                          ? `${process.env.PRODUCT_CDN_URL}` +
                            `${item.imageArrayIfCust[0].pathT1}`
                          : "/images/leftsockt.png"
                      }
                      alt="Left Image"
                      layout="responsive"
                      quality={100}
                      height={45}
                      width={15}
                      style={{
                        marginTop: "2px",
                      }}
                    />
                  </div>
                  {item.heatSinkImageT1 ? (
                    <div>
                      <Image
                        loader={myLoader}
                        src="/images/Connector2.svg"
                        // src={
                        //   item.imageArrayIfCust[0].pathT1
                        //     ? `${process.env.PRODUCT_CDN_URL}` +
                        //       `${item.imageArrayIfCust[0].pathT1}`
                        //     : "/images/Connector2.svg"
                        // }
                        alt="Left Image"
                        layout="responsive"
                        quality={100}
                        height={10}
                        width={15}
                        style={{
                          backgroundColor: item.heatSinkImageT1Color
                            ? `${item.heatSinkImageT1Color}`
                            : "",
                          transform: "translateX(-6px)",
                        }}
                      />
                    </div>
                  ) : null}
                  {/* {item.heatSinkImageT1 && item.heatSinkImageT1Color} */}
                  {/* {item.heatSinkImageT2 && item.heatSinkImageT2Color} */}
                  <div>
                    <Image
                      loader={myLoader}
                      src={`/images/1-Shades.svg`}
                      // style={{ border: "1px solid black" }}
                      alt="Name"
                      layout="responsive"
                      quality={100}
                      // height={50}
                      width={70}
                      style={{
                        backgroundColor: item.imageArrayIfCust[0].colorCable
                          ? `${item.imageArrayIfCust[0].colorCable}`
                          : "",
                        transform: "translate(-7px)",
                      }}
                    />
                  </div>
                  {/* <img
                  src="/images/1-Shades.svg"
                  alt="cable image"
                  style={{
                    backgroundColor: item.imageArrayIfCust[0].colorCable
                      ? `${item.imageArrayIfCust[0].colorCable}`
                      : "",
              
                  }}
                /> */}
                  {item.heatSinkImageT2 ? (
                    <div
                      style={{
                        transform: "translate(-7px, 0px)",
                        zIndex: "10",
                      }}
                    >
                      <Image
                        loader={myLoader}
                        src="/images/Connector2.svg"
                        // src={
                        //   item.imageArrayIfCust[0].pathT2
                        //     ? `${process.env.PRODUCT_CDN_URL}` +
                        //       `${item.imageArrayIfCust[0].pathT2}`
                        //     : "/images/Connector2.svg"
                        // }
                        alt="Cable Image"
                        layout="responsive"
                        quality={100}
                        height={10}
                        width={15}
                        style={{
                          backgroundColor: item.heatSinkImageT2Color
                            ? `${item.heatSinkImageT2Color}`
                            : "",
                        }}
                      />
                    </div>
                  ) : null}

                  <div style={{ transform: "translate(-13px, 0px)" }}>
                    <Image
                      loader={myLoader}
                      src={
                        item.imageArrayIfCust[0].pathT2
                          ? `${process.env.PRODUCT_CDN_URL}` +
                            `${item.imageArrayIfCust[0].pathT2}`
                          : "/images/rightsoket.png"
                      }
                      alt="Cable Image"
                      layout="responsive"
                      quality={100}
                      height={45}
                      width={15}
                      style={{
                        transform: "rotate(180deg)",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <Link
                passHref={true}
                scroll={true}
                href={`${process.env.PRODUCT_CDN_URL}` + `${item.image}`}
                target="_blank"
              >
                <a className={Styles.Link} target="_blank">
                  <Image
                    loader={myLoader}
                    src={`${process.env.PRODUCT_CDN_URL}` + `${item.image}`}
                    alt="Right Image"
                    layout="responsive"
                    quality={100}
                    height={100}
                    width={100}
                    style={{ border: "1px solid #BDBDBD", padding: "5px" }}
                  />
                </a>
              </Link>
            )}
            {/* <Link
              passHref={true}
              scroll={true}
              href={`${process.env.PRODUCT_CDN_URL}` + `${item.image}`}
              target="_blank"
            >
              <a className={Styles.Link} target="_blank">
                <Image
                  loader={myLoader}
                  src={`${process.env.PRODUCT_CDN_URL}` + `${item.image}`}
                  alt="Name"
                  layout="responsive"
                  quality={100}
                  height={100}
                  width={100}
                />
              </a>
            </Link> */}
          </Col>
          <Col
            span={2}
            style={{
              textAlign: "center",
            }}
            className={`${Styles.SectionTwo} gutter-row`}
          >
            <div className={Styles.itemDetails}>
              {/* <span className={Styles.Days}>
                Available for 5-7 business days
              </span> */}
              {/* <Link
                passHref={true}
                style={{ cursor: "pointer" }}
                scroll={true}
                href="/"
              >
                <a className={Styles.Name}>{item.name}</a>
              </Link> */}
              <span className={Styles.Name}>
                {item.name}{" "}
                {item.productType != 1 ? "(" + item.cableLength + "m)" : null}
                {/* {item.id} */}
              </span>

              {/* <span className={Styles.Arrive}>Arrive on 24 Jan 2023</span> */}
            </div>
          </Col>
          <Col
            style={{
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
            }}
            span={isDiscount ? 2 : 4}
            className={`${Styles.SectionThree} gutter-row`}
          >
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
          <Col span={isDiscount ? 3 : 6} style={{ textAlign: "center" }}>
            {item.productType !== 3 ? (
              <>
                <p>
                  {item.qty > item.stock ? item.stock : item.qty} dispatches now
                </p>
                <p style={{ color: "red" }}>
                  {item.qty - item.stock > 0 ? item.qty - item.stock : 0}{" "}
                  backordered
                </p>
              </>
            ) : (
              <>
                <p>{item.qty} dispatches now</p>
                <p style={{ color: "red" }}>0 backordered</p>
              </>
            )}
            {/* <p>
              {item.qty > item.stock ? item.stock : item.qty} dispatches now
            </p>
            <p style={{ color: "red" }}>
              {item.qty - item.stock > 0 ? item.qty - item.stock : 0}{" "}
              backordered
            </p> */}
          </Col>
          <Col span={3} style={{ textAlign: "center" }}>
              {/* unit price aud */}
              <NumericFormat
                value={
                  item.productType == 2
                    ? (item.cable_pricing_permeter * item.cableLength) + item.price
                    : item.price
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                className={Styles.Price}
              />
            </Col>

            <Col span={3} style={{ textAlign: "center" }}>
              {/* ext price aud */}
              <NumericFormat
                value={
                item.productType == 2
                  ? (
                      ((item.cable_pricing_permeter * item.cableLength) + item.price) * item.qty
                    ).toFixed(2)
                  : (item.price * item.qty).toFixed(2)
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                className={Styles.Price}
              />
            </Col>
          {isDiscount && (
            <>
              {/*  discount  */}
              <Col
                span={2}
                className="gutter-row"
                style={{ textAlign: "center" }}
              >
                -{totalDiscount}%
              </Col>
              {/* total discount price */}
              {item.cableLength ? (
                <>
                  {item.productType == 2 ? (
                    <Col
                      span={4}
                      className="gutter-row"
                      style={{ textAlign: "center" }}
                    >
                      $
                      {(
                        item.price_after_discount *
                        item.qty *
                        item.cableLength
                      ).toFixed(2)}
                    </Col>
                  ) : (
                    <Col
                      span={4}
                      className="gutter-row"
                      style={{ textAlign: "center" }}
                    >
                      ${(item.price_after_discount * item.qty).toFixed(2)}
                    </Col>
                  )}
                  {/* <Col span={3} className="gutter-row">
                    ${item.price_after_discount * item.qty * item.cableLength}
                  </Col> */}
                </>
              ) : (
                <>
                  <Col
                    span={3}
                    className="gutter-row"
                    style={{ textAlign: "center" }}
                  >
                    ${(item.price_after_discount * item.qty).toFixed(2)}
                  </Col>
                </>
              )}
              {/* <Col span={3} className="gutter-row">
                ${item.price_after_discount * item.qty.toFixed(2)}
              </Col> */}
            </>
          )}
          <Col span={1} style={{ textAlign: "end" }}>
            <IconButton
              color="primary"
              aria-label="remove cart item"
              // onClick={() => handleRemoveItem(item.id)}
              onClick={() => handleDeleteButton(item.id)}
            >
              {/* <DeleteIcon fontSize="small" /> */}
              <img src="icons/delete.svg" width={25} />
            </IconButton>
          </Col>
        </Row>
      </Card>
      <Dialog
        open={deleteConfirmModal}
        fullWidth={true}
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className={Styles.IconWrap}>
            <div className={Styles.CloseIconDiv} onClick={handleClose}>
              <CloseIcon />
            </div>
          </div>

          {/* <ProductPage /> */}
          <div className={Styles.ModalContainerDiv}>
            <div className={Styles.ModalTextContainerDiv}>
              <h4>Are you sure?</h4>
              <p>
                {/* Your request for the customized product has been sent to our
                team. The details are sent to your email address. */}
                Feel free to add the item to your wishlist for future reference!
              </p>
              {/* <h5>Thank You!</h5> */}
            </div>
            <div className={Styles.ModalButtonContainerDiv}>
              <Button
                variant="outlined"
                className={Styles.CustomizeNewProduct}
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove Item from cart
              </Button>
              {item.product_type != 3 && (
                <Button
                  variant="outlined"
                  onClick={() => handleMoveToWishlist(item)}
                  className={Styles.BrowsePopularProducts}
                >
                  Move Item to wishlist
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ItemCard;
