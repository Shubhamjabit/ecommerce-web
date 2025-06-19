import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./DesktopNaviBar.module.scss";
//import Image from "next/image";
import { Container } from "react-bootstrap";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Stack from "@mui/material/Stack";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Router from "next/router";
import Tooltip from "@mui/material/Tooltip";
import { initUser } from "../../../store/actions/userActions";
import { useAlert } from "react-alert";
import Alert from "@mui/material/Alert";
import { signOut } from "../../../services/auth/authService";
import SearchBox from "./SearchBox";
import CountryView from "./CountryView";

export const Header = () => {
  const dispatch = useDispatch();
  //const alert = useAlert();
  const cartListcount = useSelector((status) => status.cartReducer.cart.length);
  const user = useSelector((state) => state.userReducer.user);

  const [usermenu, setUserMenu] = useState(null);

  const handleClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenu(null);
  };
  const open = Boolean(usermenu);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    setUserMenu(null);
    signOut();
    dispatch(initUser());
    Router.push("/indexMain");
    //alert.show(<div className={styles.message}>Logout Successful</div>);
  };
  const handleMyAccount = () => {
    setUserMenu(null);
    Router.push("/dashboard");
  };

  return (
    <>
      <Row>
        <div
          className={styles.Header}
          // style={{ maxWidth: "95%", margin: "auto" }}
        >
          {/* <Nav.Link href="/"> */}

          <Nav.Link href="/indexMain">
            <Image
              src={"/new-logo.png"}
              alt="Logo"
              className={styles.logoImage}
              layout="fixed"
              height={70}
              width={220}
              quality={100}
            />
          </Nav.Link>

          {/* 
          ==================================================================
          Old Header 
          ==================================================================
            <div className={styles.RightSection}>
            <Nav className={styles.mainmenu}>
              <li>
                <Link passHref={true} scroll={true} href="/under-construction">
                  <a>
                    <span className={styles.categorySpan}>Industries</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link passHref={true} scroll={true} href="/preassembled">
                  <a>
                    <span className={styles.categorySpan}>Pre-assembles</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link passHref={true} scroll={true} href="/under-construction">
                  <a>
                    <span className={styles.categorySpan}>Brands</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link passHref={true} scroll={true} href="/under-construction">
                  <a>
                    <span className={styles.categorySpan}>Resources</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link passHref={true} scroll={true} href="/under-construction">
                  <a>
                    <span className={styles.categorySpan}>Services</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link passHref={true} scroll={true} href="/under-construction">
                  <a>
                    <span className={styles.categorySpan}>Projects</span>
                  </a>
                </Link>
              </li>
            </Nav>
            
            <Stack className={styles.StackBar} direction="row" spacing={2}>
              
              <Link passHref={true} scroll={true} href="/checkout">
                <a>
                  <Button
                    variant="outlined"
                    className={styles.CartButton}
                    startIcon={
                      <Badge badgeContent={cartListcount} color="error">
                        <ShoppingCartOutlined />
                      </Badge>
                    }
                  >
                    Cart
                  </Button>
                </a>
              </Link>
              {user && user ? (
                <>
                  <Tooltip title={user && user.firstName + " " + user.lastName}>
                    <Avatar
                      style={{
                        textTransform: "uppercase",
                        background: "#2595d4",
                      }}
                      onClick={handleClick}
                    />
                  </Tooltip>
                  <Popover
                    open={open}
                    anchorEl={usermenu}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Menu
                      id="basic-menu"
                      anchorEl={usermenu}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleMyAccount}>My account</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Popover>
                </>
              ) : (
                <Link passHref={true} scroll={true} href="/login">
                  <a>
                    <Button variant="outlined" className={styles.SignIn}>
                      Sign In
                    </Button>
                  </a>
                </Link>
              )}
            </Stack>
          </div>
           */}
          {/*
           ===============================================================================
             Header Replaced According Figma design
           ===============================================================================
            */}
          <div className={styles.SearchSection}>
            <SearchBox styles={styles} />
          </div>
          <div className={styles.RightSection}>
            <CountryView styles={styles} />
            <Stack className={styles.StackBar} direction="row" spacing={2}>
              {/* hide cart icon if user not logged in */}
              {/* <Link passHref={true} scroll={true} href="/cart">
                <a>
                  <Button
                    variant="outlined"
                    className={styles.CartButton}
                    startIcon={
                      <Badge badgeContent={cartListcount} color="error">
                        <ShoppingCartOutlined />
                      </Badge>
                    }
                  >
                    Cart
                  </Button>
                </a>
              </Link> */}
              {user && user ? (
                <>
                  <Link passHref={true} scroll={true} href="/cart">
                    <a>
                      <Button
                        variant="outlined"
                        className={styles.CartButton}
                        startIcon={
                          <Badge badgeContent={cartListcount} color="error">
                            <ShoppingCartOutlined />
                          </Badge>
                        }
                      >
                        Cart
                      </Button>
                    </a>
                  </Link>
                  <Tooltip title={user && user.firstName + " " + user.lastName}>
                    <Avatar
                      style={{
                        textTransform: "uppercase",
                        background: "#2595d4",
                      }}
                      onClick={handleClick}
                    />
                  </Tooltip>
                  <Popover
                    open={open}
                    anchorEl={usermenu}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Menu
                      id="basic-menu"
                      anchorEl={usermenu}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleMyAccount}>My account</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Popover>
                </>
              ) : (
                <Link passHref={true} scroll={true} href="/login">
                  <a>
                    <Button variant="outlined" className={styles.SignIn}>
                      Sign In
                    </Button>
                  </a>
                </Link>
              )}
            </Stack>
          </div>
        </div>
      </Row>
    </>
  );
};
