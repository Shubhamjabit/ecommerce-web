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
import Skeleton from "@mui/material/Skeleton";
import { Container, Row, Col } from "react-bootstrap";

function CartItemSkeleton({ Styles }) {
  return (
    <Card className={Styles.cardItemList}>
      <Row>
        <Col sm={6} xs={12} md={3} className={Styles.SectionOne}>
          <Skeleton variant="rect" height={80} animation="wave" />
        </Col>
        <Col sm={6} xs={12} md={9}>
          <div className={Styles.itemDetails}>
            <Skeleton
              variant="rect"
              width="100%"
              height={10}
              animation="wave"
              style={{ marginBottom: "1em" }}
            />

            <Skeleton
              variant="rect"
              width="100%"
              animation="wave"
              style={{ marginBottom: "1em" }}
            />

            <Skeleton
              variant="rect"
              height={10}
              width="100%"
              animation="wave"
              style={{ marginBottom: "1em" }}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default CartItemSkeleton;
