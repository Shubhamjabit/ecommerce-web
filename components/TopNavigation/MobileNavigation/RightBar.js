import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import styles from "./MobileNabiBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { green, pink } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Router from "next/router";
import Tooltip from "@mui/material/Tooltip";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../../services/auth/authService";
import { initUser } from "../../../store/actions/userActions";
export const RightBar = ({ styles }) => {
  const dispatch = useDispatch();
  const cartListcount = useSelector((status) => status.cartReducer.cart.length);
  const user = useSelector((state) => state.userReducer.user);
  const [usermenu, setUserMenu] = useState(null);

  const handleClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenu(null);
  };
  const handleMyAccount = () => {
    setUserMenu(null);
    Router.push("/dashboard");
  };
  const handleLogout = () => {
    setUserMenu(null);
    signOut();
    dispatch(initUser());
    Router.push("/indexMain");
    //alert.show(<div className={styles.message}>Logout Successful</div>);
  };
  const open = Boolean(usermenu);
  const id = open ? "simple-popover" : undefined;
  return (
    <Col xs={6} md={6} className={styles.RightSection}>
      <Stack className={styles.StackBar} direction="row" spacing={2}>
        {user && user ? (
          <>
            <Tooltip title={user && user.firstName + " " + user.lastName}>
              <Avatar
                sx={{ width: 35, height: 35 }}
                className={styles.Avatar}
                onClick={handleClick}
              >
                <UserOutlined />
              </Avatar>
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
            <Link passHref={true} scroll={true} href="/cart">
              <Badge badgeContent={cartListcount} color="error">
                <Avatar
                  sx={{ width: 35, height: 35 }}
                  className={styles.Avatar}
                >
                  <ShoppingCartOutlined />
                </Avatar>
              </Badge>
            </Link>
          </>
        ) : (
          <Link passHref={true} scroll={true} href="/login">
            <a>
              <Avatar sx={{ width: 35, height: 35 }} className={styles.Avatar}>
                <UserOutlined />
              </Avatar>
            </a>
          </Link>
        )}

        {/* hide cart if user not logged in */}
        {/* <Link passHref={true} scroll={true} href="/cart">
          <Badge badgeContent={cartListcount} color="error">
            <Avatar sx={{ width: 35, height: 35 }} className={styles.Avatar}>
              <ShoppingCartOutlined />
            </Avatar>
          </Badge>
        </Link> */}
        {/* <Avatar sx={{ width: 35, height: 35 }} className={styles.Avatar}>
          <BellOutlined />
        </Avatar> */}
      </Stack>
    </Col>
  );
};
