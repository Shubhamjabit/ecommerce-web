import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Container, Spinner, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
// import { DELIVERY, PICKUP } from "../../../../data/enums";
import PopUpModalForCreditPayment from "../PopUpModalForCreditPayment/PopUpModalForCreditPayment";
import Button from "@mui/material/Button";
import Link from "next/link";
import Styles from "./creditPaySection.module.scss";
import { envUrl, endPoint } from "../../../../../utils/factory";
import Typography from "@mui/material/Typography";
import { validate } from "uuid";
import { removeCart } from "../../../../../store/actions/cartActions";

import axios from "axios";
import { validateAddressAction } from "../../../../../store/actions/userActions";
import { Card, Statistic, Row, Col } from "antd";
import { decryptData } from "../../../../../services/util/customEncryptDecryprt";
const moment = require("moment");
const stripePromise = loadStripe(
  "pk_test_51MokE6DmPekReW9A0ibrIYzLsxWXNZoaaH230PKiD3n3Dq1yApbGwUE2APfX1xgzA6uiwPWMvUw4swO00a44OomT00dzin1zpM"
);

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: 700,
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#000000",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const createPaymentIntent = async (content) => {
  return fetch("/api/payment-intent", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (paymentIntent) {
      return paymentIntent;
    });
};

function CreditPaySection({ creditFormsList }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  const handleModalOpen = () => setmodalOpen(true);
  const handleModalClose = () => setmodalOpen(false);

  const user = useSelector((state) => state.userReducer.user);
  console.log("!!!!!!!!!3333333333");
  console.log("!!!!!!!!! user", user);
  const cartId = useSelector((state) => state.cartReducer.cartId);
  const cartItems = useSelector((state) => state.cartReducer.cart);
  const orderSummary = useSelector((state) => state.cartReducer.orderSummary);
  console.log("!!!!!!!!! orderSummary", orderSummary);
  const validateUser = useSelector((state) => state.userReducer.validateUser);

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorEmptycart, setErrorEmptycart] = useState(null);
  const [buttonText, setButtonText] = useState(false);
  const [localshipping, setLocalshipping] = useState([]);
  const [creditDue, setCreditDue] = useState(
    user.creditLimit - user.creditBalance
  );
  const shippingAddress = useSelector(
    (state) => state.shippingAddressReducer.savedAddress
  );
  // console.log("!!!!!!!!!!!!!! shippingAddress", shippingAddress);
  const billingAddress = useSelector(
    (state) => state.billingAddressReducer.savedBillAddress
  );
  // console.log("!!!!!!!!!!!!!!22222 billingAddress", billingAddress);

  const quoteId = useSelector((state) => state.cartReducer.quoteId);
  const isQuoted = useSelector((state) => state.cartReducer.isQuoted);
  const isCreditChecked = useSelector(
    (state) => state.userReducer.isCreditChecked
  );
  const deliveryInstructions = useSelector(
    (state) => state.userReducer.deliveryInstructions
  );
  const shippingOption = useSelector(
    (state) => state.userReducer.shippingOption
  );

  // useEffect(() => {
  //   if (billingAddress.streetAddress == "") {
  //     dispatch(validateAddressAction(false));
  //   }
  // }, []);

  const saveCreditPaymentAPI = async (paymentInfo) => {
    // console.log("^^^^^^^^^^^", paymentInfo);
    let data = {
      customerData: { cust_id: user?.id, email: user?.email },
      paymentInfo: paymentInfo.variables.payment_info,
    };

    console.log("!!!!!!!!!!!!!!333333333 data", data);
    // setButtonText(false);
    // return;
    const token = decryptData("token");
    await axios
      .post(
        `${envUrl.baseUrl}${endPoint.saveCreditPayment}`,
        { data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((response) => {
        // console.log(
        //   "response from server after place order =============>1",
        //   response
        // );
        // console.log("!!!!!!!!!!!!!!!!!!!!",response.data.data)
        if (response.data.orderData.message == "Success") {
          console.log("------------------------", response.data.orderData.data);
          setResponse(response.data.orderData.data);
          // dispatch(removeCart());
          // Router.replace(
          //   "/confirmation?ref=" + response.data.orderData.data[0].orderId
          // );
          // sendShippingEmail();
          router.reload();
        } else {
          setResponse([]);
        }

        handleModalOpen();
        return response;
      })
      .catch((error) => {
        console.log("saveCreditPaymentAPI error in catch  :::::", error);
        return error;
      })
      .finally(() => {
        setButtonText(false);
      });
  };

  const handlePlaceOrderButton = async (paymentInfo) => {
    saveCreditPaymentAPI(paymentInfo);
  };
  const CheckoutForm = () => {
    const handleModalClose = () => {
      setModalOn(false);
      // setmodalOpen(false);
    };
    useEffect(() => {
      setLocalshipping(localStorage.getItem("shoppingAddressList"));
    }, [localshipping]);

    const cart = useSelector((status) => status.cartReducer.cart);
    const loggedInUser = useSelector((state) => state.userReducer.user);

    const stripe = useStripe();
    const elements = useElements();

    const AddOrder = (payment, address) => {
      let localtempdata = JSON.parse(localshipping);
      const data = {
        payment_info: payment,
        shipping_information: {
          first_name: localtempdata && localtempdata[0].firstName,
          last_name: localtempdata && localtempdata[0].lastName,
          email: localtempdata && localtempdata[0].email,
          phone:
            (localtempdata && localtempdata[0].phone) ||
            (localtempdata && localtempdata[0].phoneNumber),
          unit: (localtempdata && localtempdata[0].units) || "",
          street_address: localtempdata && localtempdata[0].streetAddress,
          suburb: localtempdata && localtempdata[0].city,
          state: localtempdata && localtempdata[0].state,
          postcode:
            (localtempdata && localtempdata[0].postCode) ||
            (localtempdata && localtempdata[0].postCode),
          country: localtempdata && localtempdata[0].country,
          option_lift: (localtempdata && localtempdata[0].lift) || false,
          floor: (localtempdata && localtempdata[0].floor) || "",
          option_stairs: (localtempdata && localtempdata[0].stairs) || false,
        },

        user: {
          email: address.email,
          firstname: address.firstName,
          lastname: address.lastName,
        },
        cart: {
          id: cartId,
          cart_items: cart.map((c) => {
            return {
              quantity: c.qty,
              product: { id: c.id },
            };
          }),
        },
      };
      return data;
    };
    // const handleSubmit = () => {
    // placeOrder();
    // };

    const handleSubmit = async (event) => {
      // setLoader(true);

      event.preventDefault();
      // console.log("stripe :", stripe, " elements :", elements);
      if (!stripe || !elements) {
        return;
      }
      // console.log("totalPriceInCents : 2");
      // let totalPriceInCents = parseInt(orderSummary.totalAmount * 100);
      let totalPriceInCents = parseInt(creditDue * 100);

      let paymentIntent = await createPaymentIntent({
        amount: totalPriceInCents,
      });
      // console.log("totalPriceInCents : 3", totalPriceInCents);
      // console.log("payment intent :", paymentIntent);
      if (paymentIntent.error) {
        setErrorMessage(paymentIntent.error);
      } else {
        try {
          // console.log(" STRIPE IN ELSE");
          // dispatch(setLoading(true));
          let card = await elements.getElement(CardElement);
          // console.log(" payment intent card :", card);
          let user = loggedInUser || shippingAddress[0];
          // console.log("stripe user :", user);
          // console.log("totalPriceInCents : 4", totalPriceInCents);
          // console.log("totalPriceInCents : 5", paymentIntent);
          const {
            error,
            paymentIntent: { id, amount, status, created },
          } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
            payment_method: {
              card: card,
              billing_details: {
                name: user.firstName + user.lastName,
                // address: {
                //   city: user.city,
                //   country: "AU",
                //   line1: user.streetAddress,
                //   line2: null,
                //   postal_code: user.postCode,
                //   state: user.state,
                // },
                address: {
                  city: "Somerton",
                  country: "AU",
                  line1: "57-61 Freight Drive",
                  line2: null,
                  postal_code: "3062",
                  state: "VIC",
                },
                email: user.email,
              },
            },
          });

          console.log("ERROR FOM PAYMENT GATE WAY::::::::::::::::::::::::::::");
          ///////for testing with out payment///////
          // const status = "succeeded";
          // const error = false;
          // const amount = totalPriceInCents;
          // const id = JSON.stringify(Math.random().toFixed(2));
          // const created = 20852591;
          //////////
          // console.log(
          //   'payment intent confirm pay error :',
          //   confirmCard.error,
          // );
          if (error) {
            // console.log("totalPriceInCents : 5");
            console.log(" in error confirm card :", error.message);
            setErrorMessage(error.message);
          } else {
            // console.log("totalPriceInCents : 6");
            if (paymentIntent) {
              if (status === "succeeded") {
                setButtonText(true);
                // console.log("totalPriceInCents : 7");
                // console.log("Payment success");
                let paymentInfo = {
                  status: status,
                  id: id,
                  date: created,
                  amount: amount,
                  method: "STRIPE",
                };
                // console.log(
                //   " in side if of succeeded ===========>",
                //   paymentInfo
                // );
                // console.log("totalPriceInCents : 8");
                const data = AddOrder(paymentInfo, user);
                // console.log("stripe user : ORDER ADDED CALLED :", data);

                // console.log("totalPriceInCents : 9");
                try {
                  // console.log("totalPriceInCents : 10");
                  const orderPayload = {
                    variables: {
                      payment_info: paymentInfo,
                      // payment_info: data.payment_info,
                      // shipping_information: data.shipping_information,
                      // cart: data.cart,
                      // user: data.user,
                    },
                  };
                  // console.log(
                  //   'CART in data =======BEFORE GRAPGH QL===========>',
                  //   data,
                  // );
                  // console.log("======Order PAYLOAD======>", orderPayload);
                  // const createOrderStatus = await AddOrder(orderPayload);
                  const createOrderStatus = await handlePlaceOrderButton(
                    orderPayload
                  );
                } catch (error) {
                  console.log("ERROR IN SMIOTHHHREHRR:::::::::", error);
                  // dispatch(setLoading(false));
                  setErrorMessage(
                    "Something went wrong with the shipping information. Please contact us."
                  );
                }
              } else if (status === "requires_action") {
                setErrorMessage("Need further actions from the customer");
                // dispatch(setLoading(false));
              } else {
                setErrorMessage("Unsuccessful payment");
                // dispatch(setLoading(false));
              }
            }
          }
        } catch (error) {
          console.log("======error error======>", error);
          setErrorMessage(
            "Payment failed. Please verify the details provided."
          );
          //dispatch(setLoading(false));
        }
      }
    };

    return (
      <Container className={Styles.cardSummeryContainer}>
        {errorMessage && (
          <span className={Styles.cardError}> {errorMessage} </span>
        )}
        {errorEmptycart && (
          <span className={Styles.cardError}> {errorEmptycart} </span>
        )}

        {buttonText === true ? (
          <>
            <div style={{ textAlign: "center", padding: "10px 0px" }}>
              <Spinner
                animation="grow"
                style={{ display: "block", margin: "auto" }}
              />
              <Typography variant="caption" color="textSecondary">
                Processing payment please wait
              </Typography>
            </div>
          </>
        ) : (
          <>
            <div className={Styles.cartElement}>
              <CardElement options={CARD_OPTIONS} />
            </div>

            {/* <Button
                  type="button"
                  disabled={!validateUser ? true : false}
                  onClick={handleSubmit}
                  className={
                    validateUser ? Styles.PlaceOrder : Styles.buttonDisabled
                  }
                >
                  Place order
                </Button> */}
            <Button
              type="button"
              // disabled={validateUser ? false : true}
              onClick={handleSubmit}
              // className={
              //   validateUser ? Styles.PlaceOrder : Styles.buttonDisabled
              // }
              className={Styles.PlaceOrder}
            >
              {/* Place order */}
              Pay ${creditDue.toFixed(2)}
            </Button>
          </>
        )}
        <PopUpModalForCreditPayment
          show={modalOpen}
          setShow={setmodalOpen}
          handleClose={handleModalClose}
          handleShow={handleModalOpen}
          data={response}
        />
      </Container>
    );
  };

  return (
    <>
      <Row gutter={[16, 12]}>
        <Col lg={8} md={12} sm={12} xs={24}>
          <Card bordered={true}>
            <Statistic
              title="Credit Limit"
              value={user.creditLimit}
              precision={2}
              valueStyle={{
                color: "#3f8600",
                // fontSize: "13px",
              }}
              // prefix={<ArrowUpOutlined />}
              prefix="$"
              // suffix="%"
            />
          </Card>
        </Col>
        <Col lg={8} md={12} sm={12} xs={24}>
          <Card bordered={true}>
            <Statistic
              title="Credit Balance"
              value={user.creditBalance}
              precision={2}
              valueStyle={{
                color: "#fadb14",
                // fontSize: "13px",
                // color: "yellow",
              }}
              // prefix={<ArrowUpOutlined />}
              prefix="$"
              className="creditValue"
              // suffix="%"
            />
          </Card>
        </Col>
        <Col lg={8} md={12} sm={12} xs={24}>
          <Card bordered={true}>
            <Statistic
              title="Payment Due"
              value={creditDue}
              precision={2}
              valueStyle={{
                color: "#cf1322",
                // fontSize: "13px",
              }}
              // prefix={<ArrowDownOutlined />}
              prefix="$"
              // suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingTop: "3%" }}>
        <Card
          className="CustomCard"
          style={{
            width: "100%",
            borderColor: "#f5222d",
            borderWidth: "3px",
          }}
        >
          {/* <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p> */}
          <Row
            gutter={[16, 12]}
            // gutter={{
            //   xs: 8,
            //   sm: 16,
            //   md: 24,
            //   lg: 32,
            // }}
          >
            <Col className="gutter-row" lg={12} md={16} sm={16} xs={24}>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col className="gutter-row" span={12}>
                  <div
                    style={{
                      fontWeight: "900",
                    }}
                  >
                    Payment Due Date
                  </div>
                </Col>
                <Col className="gutter-row" span={12}>
                  31st August 2023
                </Col>
              </Row>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <span
                  style={{
                    color: "#f5222d",
                    fontSize: "80%",
                    paddingLeft: "2%",
                  }}
                >
                  To Ensure Uninterrupted Transactions: Timely Payment of Dues
                  Keeps Things Running Smoothly.
                </span>
              </Row>
            </Col>
            <Col className="gutter-row" lg={12} md={16} sm={16} xs={24}>
              {/* <div>col-12</div> */}
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
}

export default CreditPaySection;
