import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import styles from "../Product.module.scss";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Input } from "antd";
const QtySection = ({
  handleDecreaseQty,
  handleIncreaseQty,
  qty,
  handleAddQuantity,
}) => {
  return (
    <div className={styles.qtySection}>
      {/* <p className={styles.storeOptionTitle}>Select Quantity:</p> */}
      <Typography variant="h6" gutterBottom className={styles.h6}>
        Quantity
      </Typography>
      <div className={styles.qtyBox}>
        <Button
          className={qty > 1 ? styles.qtyButton : styles.qtyButtonDisable}
          variant="light"
          onClick={() => {
            handleDecreaseQty();
          }}
          disabled={qty === 1 ? true : false}
        >
          <RemoveIcon />
        </Button>

        <Input
          className={styles.qtyButtonText}
          //defaultValue={qty}
          onChange={(evnt) => handleAddQuantity(evnt)}
          name="qty"
          value={qty}
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
            handleIncreaseQty();
          }}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};

export default QtySection;
