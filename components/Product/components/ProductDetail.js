import React from "react";
import styles from "../Product.module.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
function ProductDetail() {
  return (
    <div className={styles.ProductDetailSection}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/images/icons/100Original.svg" />
          </ListItemAvatar>
          <ListItemText primary="Warranty As Per RMG" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/images/icons/Warranty.svg" />
          </ListItemAvatar>
          <ListItemText primary="100% Original Products" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/images/icons/Buyer Protection.svg" />
          </ListItemAvatar>
          <ListItemText primary="Secure Payment" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/images/icons/Secure Payment.svg" />
          </ListItemAvatar>
          <ListItemText primary="100% Buyer Protection" />
        </ListItem>
      </List>
    </div>
  );
}

export default ProductDetail;
