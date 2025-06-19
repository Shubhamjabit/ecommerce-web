import React, { useState, useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Nav from "react-bootstrap/Nav";
//import Image from "next/image";
import SideBarCategory from "./SideBarCategory";
export const TopBar = ({
  styles,
  setMobileSearch,
  MobileSearchPop,
  assemblySolutionsList,
}) => {
  const [SwipeableDrawerOpen, setSwipeableDrawerOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setSwipeableDrawerOpen(newOpen);
  };

  return (
    <>
      <Row className={styles.TopBar}>
        <Col xs={6} md={6}>
          <Nav.Link href="/indexMain">
            <Image
              src={"/new-logo.png"}
              alt="Logo"
              layout="fixed"
              height={35}
              width={91}
              quality={100}
            />
          </Nav.Link>
        </Col>
        <Col xs={6} md={6}>
          <Stack className={styles.StackBar} direction="row" spacing={1}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() =>
                setMobileSearch(MobileSearchPop.open, MobileSearchPop.defer)
              }
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Col>
      </Row>
      <SideBarCategory
        SwipeableDrawerOpen={SwipeableDrawerOpen}
        toggleDrawer={toggleDrawer}
        styles={styles}
        assemblySolutionsList={assemblySolutionsList}
      />
    </>
  );
};
