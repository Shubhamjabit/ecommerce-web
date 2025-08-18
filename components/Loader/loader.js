import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./loader.module.scss";
import { Image } from "react-bootstrap";

function Loader() {
  return (
    <Grid className={styles.wrapper}>
      <Image src="/favicon.ico" alt="logo" />
      <Grid className={styles.loader}></Grid>
    </Grid>
  );
}

export default Loader;
