import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./myorders.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { envUrl, endPoint } from "../../../utils/factory";
import Image from "react-bootstrap/Image";
import { decryptData } from "../../../services/util/customEncryptDecryprt";
import { Empty } from "antd";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import { Bars } from "react-loader-spinner";
import Link from "next/link";

const Custom_Image = ({
  product_image_T1,
  product_image_T2,
  product_image_cable,
}) => {
  return (
    <div className={styles.Custom_Image}>
      <Image
        // loader={myLoader}
        src={`${product_image_T1}`}
        alt="Left Image"
        layout="responsive"
        quality={100}
        height={45}
        width={"30%"}
      />
      <Image
        // loader={myLoader}
        src={`/images/1-Shades.svg`}
        alt="Name"
        layout="responsive"
        quality={100}
        // height={50}
        width={"30%"}
        style={{
          backgroundColor: `${product_image_cable}`,
        }}
      />

      <Image
        // loader={myLoader}
        src={`${product_image_T2}`}
        // style={
        //   product_image_T2 != "null" ? { transform: "rotate(180deg)" } : {}
        // }
        alt="Cable Image"
        layout="responsive"
        quality={100}
        height={45}
        width={"30%"}
      />
    </div>
  );
};

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" align="center">
          {index + 1}
        </TableCell>
        <TableCell align="center">{row?.orderID || "NA"}</TableCell>
        <TableCell align="center">{row?.status || "NA"}</TableCell>
        {/* <TableCell align="center">{row?.subTotal || "NA"}</TableCell>
        <TableCell align="center">
          {row?.voucherDiscountAmount || "NA"}
        </TableCell>
        <TableCell align="center">{row?.deliveryCharge || "NA"}</TableCell>
        <TableCell align="center">{row?.totalTaxes || "NA"}</TableCell>
        <TableCell align="center">{row?.grandTotal || "NA"}</TableCell>
        <TableCell align="center">{row?.creditAmount || "NA"}</TableCell> */}
        <TableCell align="center">
          {row?.grandTotalAfterCredit
            ? "$" + parseFloat(row?.grandTotalAfterCredit).toFixed(2)
            : "NA"}
        </TableCell>
        <TableCell align="center">
          {new Date(row?.createdDate).toLocaleString() || "NA"}
        </TableCell>
        <TableCell align="center">
          {row.trackingNumber ? (
            <Link
              href={`https://tlm.saviy.com.au/als_dma_prog/v20220912/saviy_tracking_public_v2.php?site_path=d:/tdx/html/dma-triangle/v20220912_s/&cn_number=${row.trackingNumber}&ui=public`}
            >
              <a target="_blank">
                <button className={styles.table_action_button}>
                  {row.trackingNumber}
                </button>
              </a>
            </Link>
          ) : (
            <span>NA</span>
          )}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "550" }} align="center">
                      Product Image
                    </TableCell>
                    <TableCell style={{ fontWeight: "550" }} align="center">
                      Product
                    </TableCell>
                    <TableCell style={{ fontWeight: "550" }} align="center">
                      Unit Price
                    </TableCell>
                    <TableCell style={{ fontWeight: "550" }} align="center">
                      Qty
                    </TableCell>
                    <TableCell style={{ fontWeight: "550" }} align="center">
                      Discount Amount
                    </TableCell>
                    <TableCell style={{ fontWeight: "550" }} align="center">
                      Subtotal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productLineItems?.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <div className={styles.product_image_container}>
                          {historyRow.img_url !== "undefined" ? (
                            <img
                              src={
                                process.env.PRODUCT_CDN_URL + historyRow.img_url
                              }
                            />
                          ) : (
                            <Custom_Image
                              product_image_T1={"/images/leftsockt.png"}
                              product_image_T2={"/images/rightsoket.png"}
                              product_image_cable="green"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {historyRow?.productName || "NA"}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow?.productPrice || "NA"}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow?.productQty || "NA"}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow?.discountAmount || "NA"}
                      </TableCell>
                      <TableCell align="center">
                        ${historyRow?.subTotal || "NA"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function MyOrders() {
  const user = useSelector((state) => state.userReducer.user);
  // const [orders, setOrders] = React.useState([]);
  const [orders, setOrders] = React.useState(null);
  console.log("oooooooooo MyOrders", orders);

  async function getOrders() {
    try {
      const token = decryptData("token");
      const { data } = await axios.get(
        `${envUrl.baseUrl}${endPoint.myOrders}`,
        {
          headers: { "Content-Type": "application/json", Authorization: token },
          params: { email: user.email },
        }
      );
      // console.log("!!order response", data);
      setOrders(data.data);
      // setOrders([]);
    } catch (error) {
      console.log("error in fetching orders", error);
    }
  }
  React.useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);

  return (
    <div className="order_table">
      <div style={{ position: "relative" }}>
        <h1 className={styles.topic}>My Orders</h1>
        <hr />
        <div className={styles.divider}></div>
      </div>
      <TableContainer component={Paper}>
        <Table size={"small"} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: 800 }}>
                S No.
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 800 }}>
                Order ID
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 800 }}>
                Status
              </TableCell>
              {/* <TableCell align="center">Total Amount</TableCell>
              <TableCell align="center">Total Discount</TableCell>
              <TableCell align="center">Delivery Charges</TableCell>
              <TableCell align="center">Total Tax</TableCell>
              <TableCell align="center">Grand Total</TableCell>
              <TableCell align="center">Credit Amount</TableCell> */}
              <TableCell align="center" style={{ fontWeight: 800 }}>
                Final Amount
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 800 }}>
                Date & Time
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 800 }}>
                Track Order
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody colSpan={6}>
            {orders ? (
              <TableRow>
                {orders.length > 0 ? (
                  orders.map((row, index) => (
                    <Row key={row.orderID} row={row} index={index} />
                  ))
                ) : (
                  <>
                    <TableCell colSpan={6} align="center">
                      <Empty />
                    </TableCell>
                  </>
                )}
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <div className={styles.LoaderOrderSection}>
                    <Bars
                      height="80"
                      width="80"
                      color="#2595d4"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      align="center"
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}
          {orders ? (
            <TableBody>
              {orders.length > 0 ? (
                orders.map((row, index) => (
                  <Row key={row.orderID} row={row} index={index} />
                ))
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Empty />
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          ) : (
            <>
              {/* <div className={styles.LoaderSection}> */}
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <div className={styles.LoaderOrderSection}>
                    <Bars
                      height="80"
                      width="80"
                      color="#2595d4"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                    {/* </div> */}
                  </div>
                </TableCell>
              </TableRow>
            </>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
