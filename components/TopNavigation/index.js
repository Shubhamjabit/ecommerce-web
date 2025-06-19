import styles from "./TopNavigation.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Row } from "react-bootstrap";
import { TopBar } from "./DesktopNaviBar/TopBar";
import { Header } from "./DesktopNaviBar/Header";
// import { NaviBar } from "./DesktopNaviBar/NaviBar";
import { MobileNaviBar } from "./MobileNavigation/MobileNaviBar";
import { initCart } from "../../store/actions/cartActions";
import { initUser } from "../../store/actions/userActions";
import { initPreassemble } from "../../store/actions/preassembleActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { endPoint, envUrl } from "../../utils/factory";
import { useAlert } from "react-alert";
import { signOut } from "../../services/auth/authService";
import axios from "axios";
import { NaviBar } from "./DesktopNaviBar/NaviBar";
export const TopNavigation = ({
  handleOpenMenu,
  handleCloseMenu,
  navi,
  industriesList,
  assemblySolutionsList,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const router = useRouter();
  const matches = useMediaQuery("(max-width:851px)");
  useEffect(() => {
    dispatch(initCart());
    dispatch(initUser());
    dispatch(initPreassemble());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserStatus = async (email) => {
    try {
      const jsonToPost = {
        email: email,
      };
      const data = await axios
        .post(
          `${envUrl.baseUrl}${endPoint.eyJhdHRyaWJ1dGVzIjp7InVzZXJfYXR0cmlidXRlIjoicmFzaHBhbDI5QGdtYWlsLmNvbSJ9LCJ1c2VySWQiOm51bGx9}`,
          jsonToPost,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          if (response.data.data.message === "success") {
            if (response.data.data.user[0].loginstatus != user.loginstatus) {
              handleLogout();
            }
          } else {
            //console.log("error FROM RESPONSE AddFilterModal::::: ");
          }
        })
        .catch(function (error) {
          console.log("error in SAVING AddFilterModal::::: ", error.message);
          return { state: false, message: error.message };
        });
    } catch (error) {
      console.log("error signIn:", error.message);
    }
  };
  const handleLogout = () => {
    signOut();
    dispatch(initUser());
    router.push("/indexMain");
    //alert.show(<div className={styles.message}>Logout Successful</div>);
  };
  useEffect(() => {
    if (user) {
      getUserStatus(user && user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user && user.length > 0 && router]);

  return (
    <>
      {matches ? (
        <MobileNaviBar
          navi={navi}
          assemblySolutionsList={assemblySolutionsList}
        />
      ) : (
        <div
          className={styles.WebNaviBar}
          style={{
            position: "sticky",
            left: 0,
            right: 0,
            top: 0,
            zIndex: 9,
            background: "#fff",
          }}
        >
          <Header />

          <NaviBar
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            navi={navi}
            industriesList={industriesList}
            assemblySolutionsList={assemblySolutionsList}
          />
        </div>
      )}
    </>
  );
};
