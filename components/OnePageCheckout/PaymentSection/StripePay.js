import React, { Component, useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
// import { DELIVERY, PICKUP } from "../../../../data/enums";
import PopUpModal from "../../UserCheckout/components/orderPlacedModal";
import Button from "@mui/material/Button";
import Link from "next/link";
import Styles from "./paymentsection.module.scss";
import { envUrl, endPoint } from "../../../utils/factory";
import Typography from "@mui/material/Typography";
import { validate } from "uuid";
import { removeCart } from "../../../store/actions/cartActions";

import axios from "axios";
// import { saveAddress } from "../../../../store/actions/shippingAddressActions";
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
function PlaceOrderButton() {
  const [modalOpen, setmodalOpen] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  const handleModalOpen = () => setmodalOpen(true);
  const handleModalClose = () => setmodalOpen(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const cartId = useSelector((state) => state.cartReducer.cartId);
  const cartItems = useSelector((state) => state.cartReducer.cart);
  const orderSummary = useSelector((state) => state.cartReducer.orderSummary);
  const validateUser = useSelector((state) => state.userReducer.validateUser);

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorEmptycart, setErrorEmptycart] = useState(null);
  const [buttonText, setButtonText] = useState(false);
  const [localshipping, setLocalshipping] = useState([]);
  const shippingAddress = useSelector(
    (state) => state.shippingAddressReducer.savedAddress
  );
  const quoteId = useSelector((state) => state.cartReducer.quoteId);
  const isQuoted = useSelector((state) => state.cartReducer.isQuoted);
  const saveOrderAPI = async (paymentInfo) => {
    // console.log("^^^^^^^^^^^", paymentInfo);
    let data = {};
    if (user) {
      data = {
        customerData: {
          firstName: user && user.firstName,
          lastName: user && user.lastName,
          phoneNumber:
            shippingAddress && shippingAddress[0].phoneNumber
              ? shippingAddress && shippingAddress[0].phoneNumber
              : user && user.phone_number,
          email: user && user.email,
          streetAddress:
            shippingAddress && shippingAddress[0].streetAddress
              ? shippingAddress && shippingAddress[0].streetAddress
              : user && user.streetAddress,
          city:
            shippingAddress && shippingAddress[0].city
              ? shippingAddress && shippingAddress[0].city
              : user && user.city,
          state:
            shippingAddress && shippingAddress[0].state
              ? shippingAddress && shippingAddress[0].state
              : user && user.state,
          country: "Australia",
          postCode:
            shippingAddress && shippingAddress[0].postCode
              ? shippingAddress && shippingAddress[0].postCode
              : user && user.postcode,
        },
        ordersData: {
          invoiceId: cartId,
          cartItems: cartItems,
          subAmount: orderSummary.subAmount,
          shippingAmount: orderSummary.shippingAmount,
          totalAmount: orderSummary.totalAmount,
          quoteId: quoteId,
          isQuoted: isQuoted,
        },
        paymentInfo: paymentInfo.variables.payment_info,
      };
    } else {
      data = {
        customerData: {
          firstName: shippingAddress && shippingAddress[0].firstName,
          lastName: shippingAddress && shippingAddress[0].lastName,
          phoneNumber: shippingAddress && shippingAddress[0].phoneNumber,
          email: shippingAddress && shippingAddress[0].email,
          streetAddress: shippingAddress && shippingAddress[0].streetAddress,
          city: shippingAddress && shippingAddress[0].city,
          state: shippingAddress && shippingAddress[0].state,
          country: shippingAddress && shippingAddress[0].country,
          postCode: shippingAddress && shippingAddress[0].postCode,
        },
        ordersData: {
          invoiceId: cartId,
          cartItems: cartItems,
          subAmount: orderSummary.subAmount,
          shippingAmount: orderSummary.shippingAmount,
          totalAmount: orderSummary.totalAmount,
          quoteId: quoteId,
          isQuoted: isQuoted,
        },
        paymentInfo: paymentInfo.variables.payment_info,
      };
    }

    // console.log(`${envUrl.baseUrl}${endPoint.placeOrder}`);
    await axios
      .post(
        `${envUrl.baseUrl}${endPoint.placeOrder}`,
        { data },
        {
          headers: {
            "Content-Type": "application/json",
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
          setResponse(response.data.orderData.data);
          dispatch(removeCart());
          Router.replace(
            "/confirmation?ref=" + response.data.orderData.data[0].orderId
          );
          // sendShippingEmail();
        } else {
          setResponse([]);
        }

        handleModalOpen();
        return response;
      })
      .catch((error) => {
        console.log("API error in sending file :::::", error);
        return error;
      })
      .finally(() => {});
  };

  const handlePlaceOrderButton = async (paymentInfo) => {
    saveOrderAPI(paymentInfo);
  };

  const CheckoutForm = () => {
    const handleModalClose = () => {
      setModalOn(false);
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
      let totalPriceInCents = parseInt(orderSummary.totalAmount * 100);
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
                address: {
                  city: user.city,
                  country: "AU",
                  line1: user.streetAddress,
                  line2: null,
                  postal_code: user.postCode,
                  state: user.state,
                },
                email: user.email,
              },
            },
          });

          console.log("ERORP FOM PAYMENT GATE WAY::::::::::::::::::::::::::::");
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
                      payment_info: data.payment_info,
                      shipping_information: data.shipping_information,
                      cart: data.cart,
                      user: data.user,
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
                  console.log("EROR IN SMIOTHHHREHRR:::::::::", error);
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
                Placing order please wait
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
              disabled={validateUser ? false : true}
              onClick={handleSubmit}
              className={
                validateUser ? Styles.PlaceOrder : Styles.buttonDisabled
              }
            >
              Place order
            </Button>
          </>
        )}
        <PopUpModal
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
      {/* <PopUpModal
        show={modalOpen}
        setShow={setmodalOpen}
        handleClose={handleModalClose}
        handleShow={handleModalOpen}
        data={response}
      />
      <Button onClick={handlePlaceOrderButton}>Place Order</Button> */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
}

export default PlaceOrderButton;
