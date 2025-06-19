import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./indexprofile.module.scss";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useSelector, useDispatch } from "react-redux";
import { Bars } from "react-loader-spinner";
import { PersonalInformation } from "./PersonalInformation/PersonalInformation";
import { MyOrders } from "./MyOrders/MyOrders";
import { Wishlist } from "./Wishlist/Wishlist";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import { CreditAccount } from "./CreditAccount/CreditAccount";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function UserDashboard() {
  // if (typeof window !== "undefined") {
  //   var user = JSON.parse(localStorage.getItem("user"));
  // }
  const user = useSelector((state) => state.userReducer.user);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className={styles.UserProfile}>
      {user && user ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  className={styles.Tabs}
                >
                  <Tab
                    className={styles.Tab}
                    label="Account Details"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={styles.Tab}
                    label="Credit Membership"
                    {...a11yProps(1)}
                  />
                  <Tab
                    className={styles.Tab}
                    label="My Orders"
                    {...a11yProps(2)}
                  />
                  <Tab
                    className={styles.Tab}
                    label="My Wishlist"
                    {...a11yProps(3)}
                  />
                  <Tab
                    className={styles.Tab}
                    label="Change Password"
                    {...a11yProps(4)}
                  />
                </Tabs>
              </Grid>
              <Grid item lg={9} md={6} sm={6} xs={12}>
                <TabPanel value={value} index={0} className={styles.TabPanel}>
                  <Card>
                    <CardContent className={styles.CardContent}>
                      <PersonalInformation />
                    </CardContent>
                  </Card>
                </TabPanel>
                <TabPanel value={value} index={1} className={styles.TabPanel}>
                  <Card>
                    <CardContent className={styles.CardContent}>
                      <CreditAccount />
                    </CardContent>
                  </Card>
                </TabPanel>
                <TabPanel value={value} index={2} className={styles.TabPanel}>
                  <Card>
                    <CardContent className={styles.CardContent}>
                      <MyOrders />
                    </CardContent>
                  </Card>
                </TabPanel>
                <TabPanel value={value} index={3} className={styles.TabPanel}>
                  <Card>
                    <CardContent
                      className={`${styles.CardContent} ${styles.CardContentWishlist}`}
                    >
                      <Wishlist />
                    </CardContent>
                  </Card>
                </TabPanel>
                <TabPanel value={value} index={4} className={styles.TabPanel}>
                  <Card>
                    <CardContent className={styles.CardContent}>
                      <ChangePassword />
                    </CardContent>
                  </Card>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} className={styles.UserProfileLoader}>
          <Grid item xs={12}>
            <Bars
              height="80"
              width="80"
              color="#2595d4"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default UserDashboard;
