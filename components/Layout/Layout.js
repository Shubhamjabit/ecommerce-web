import React, { useState, useEffect } from "react";
import { TopNavigation } from "../TopNavigation";
// import { Footer } from "../Footer/Footer";
import { Container, Row } from "react-bootstrap";
import styles from "./Layout.module.scss";
import Head from "next/head";
import { SideBarMenu } from "../SideBar";
import { Footer } from "../Footer/Footer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useRouter } from "next/router";
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from "react-alert";
import { CleaningServices } from "@mui/icons-material";
export const Layout = (props) => {
  // console.log("props in Layout", props);
  const router = useRouter();
  const matches = useMediaQuery("(max-width:851px)");
  const [openmenu, setOpenMenu] = React.useState(false);
  const [custommargin, setCustomMargin] = React.useState(false);

  const handleOpenMenu = () => {
    //  console.log("@@@@@-----------------@@@@@@@ 11111");
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    // console.log("@@@@@-----------------@@@@@@@");
    setOpenMenu(false);
  };

  useEffect(() => {
    if (router.asPath.length > 1) {
      setCustomMargin(true);
    }
  }, [router]);

  let navbluebgClasses = [styles.ContainerSection];

  if (openmenu) {
    navbluebgClasses.push(styles.CustomShadow);
  }
  if (custommargin) {
    navbluebgClasses.push(styles.CustomMargin);
  }

  const options = {
    timeout: 3000,
    position: positions.TOP_CENTER,
  };

  return (
    <>
      <Container fluid>
        <TopNavigation
          handleOpenMenu={handleOpenMenu}
          handleCloseMenu={handleCloseMenu}
          navi={props.CategoryData}
          industriesList={props.industriesList}
          assemblySolutionsList={props.assemblySolutionsList}
        />
        <Provider template={AlertTemplate} {...options}>
          <container-fluid>
            <div className={navbluebgClasses.join(" ")}>{props.children}</div>
          </container-fluid>
          <Footer />
        </Provider>
      </Container>
    </>
  );
};
