import React from "react";
import styles from "../Product.module.scss";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
function Features() {
  return (
    <div className={styles.FeaturesSection}>
      <Typography variant="h6" gutterBottom className={styles.h6}>
        Features
      </Typography>
      <List>
        <ListItem secondaryAction="CU-Flex">
          <ListItemText primary=" Brand Name:" />
        </ListItem>

        <ListItem secondaryAction="Lugs">
          <ListItemText primary="Type of Product:" />
        </ListItem>

        <ListItem secondaryAction=" B05">
          <ListItemText primary="Model No:" />
        </ListItem>

        <ListItem secondaryAction="12">
          <ListItemText primary="Warranty (Months):" />
        </ListItem>
      </List>
    </div>
  );
}

export default Features;
