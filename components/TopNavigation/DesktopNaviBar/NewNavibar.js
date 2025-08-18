import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import styles from "./DesktopNaviBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { green, pink } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import CategoeyMenu from "./CategoeyMenu";
import CountryView from "./CountryView";
import SearchBox from "./SearchBox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
export const NewNavibar = ({
  handleOpenMenu,
  handleCloseMenu,
  navi,
  industriesList,
  assemblySolutionsList,
}) => {
  const cartListcount = useSelector((status) => status.cartReducer.cart.length);
  // console.log("&&&&&&&&&&&& industriesList", industriesList);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Row>
      <div className={styles.navbarMenu}>
        <Container>
          <Row>
            <div className={styles.navbar}>
              {/* <Col sm={3}>
                <CategoeyMenu
                  styles={styles}
                  handleOpenMenu={handleOpenMenu}
                  handleCloseMenu={handleCloseMenu}
                  navi={navi}
                />
              </Col> */}

              <Col sm={12}>
                <div className={styles.MenuRightSection}>
                  {/* <div className={styles.SearchSection}>
                    <SearchBox styles={styles} />
                  </div>
                  <CountryView styles={styles} /> */}
                  {/*
           ===============================================================================
             Menu Replaced According Figma design
           ===============================================================================
            */}
                  <Nav className={styles.mainmenu}>
                    <li>
                      {/* <span className={styles.categorySpan}>Products</span> */}
                      <CategoeyMenu
                        styles={styles}
                        handleOpenMenu={handleOpenMenu}
                        handleCloseMenu={handleCloseMenu}
                        navi={navi}
                      />
                    </li>
                    <li>
                      {/* <Link passHref={true} scroll={true} href="/preassembles"> */}
                      {/* <a> */}
                      {/* <span className={styles.categorySpan}> */}
                      {/* drop down for assembly solutions */}
                      {/* <Button
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                          style={{ color: "white" }}
                        >
                          Assembly Solutions
                        </Button> */}
                      <span
                        className={styles.basicButton}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        // style={{ color: "white" }}
                      >
                        Assembly Solutions
                      </span>
                      <Menu
                        style={{ top: "2%" }}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {assemblySolutionsList?.map((m, index) => {
                          return (
                            <Link
                              passHref={true}
                              scroll={true}
                              href={`/${m.name}`}
                              key={index}
                            >
                              <a>
                                <MenuItem
                                  style={{ color: "white", fontFamily: "Muli" }}
                                  onClick={handleClose}
                                >
                                  {m.name}
                                </MenuItem>
                              </a>
                            </Link>
                          );
                        })}
                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                      </Menu>
                      {/* </span> */}
                      {/* </a> */}
                      {/* </Link> */}
                    </li>
                    <li>
                      <Link passHref={true} scroll={true} href="/industry">
                        <a>
                          <span className={styles.categorySpan}>Industry</span>
                        </a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        passHref={true}
                        scroll={true}
                        href="/under-construction"
                      >
                        <a>
                          <span className={styles.categorySpan}>
                            New Products
                          </span>
                        </a>
                      </Link>
                    </li> */}
                    <li className={styles.brandMenu}>
                      <Link passHref={true} scroll={true} href="/brands">
                        <a>
                          <span className={styles.categorySpan}>Brands</span>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link passHref={true} scroll={true} href="/resources">
                        <a>
                          <span className={styles.categorySpan}>Resources</span>
                        </a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        passHref={true}
                        scroll={true}
                        href="/under-construction"
                      >
                        <a>
                          <span className={styles.categorySpan}>Services</span>
                        </a>
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link
                        passHref={true}
                        scroll={true}
                        href="/under-construction"
                      >
                        <a>
                          <span className={styles.categorySpan}>Projects</span>
                        </a>
                      </Link>
                    </li> */}
                  </Nav>
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    </Row>
  );
};
