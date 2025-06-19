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
import { validateAddressAction } from "../../../store/actions/userActions";
import { decryptData } from "../../../services/util/customEncryptDecryprt";
// import { saveAddress } from "../../../../store/actions/shippingAddressActions";
// const stripePromise = loadStripe(
//   "pk_test_51MokE6DmPekReW9A0ibrIYzLsxWXNZoaaH230PKiD3n3Dq1yApbGwUE2APfX1xgzA6uiwPWMvUw4swO00a44OomT00dzin1zpM"
// );

import env from "../../../next.config";

// console.log("@@env from config", env());

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

// console.log("@@@process.env", process.env);
// console.log("@@@NODE_ENV", process.env.NODE_ENV);
// console.log("@@@STRIPE_PUBLISHABLE_KEY", process.env.STRIPE_PUBLISHABLE_KEY);
// console.log("@@@STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);

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
  // console.log("!!!!!!!!!3333333333");
  // console.log("!!!!!!!!! user", user);
  const cartId = useSelector((state) => state.cartReducer.cartId);
  const cartItems = useSelector((state) => state.cartReducer.cart);
  const orderSummary = useSelector((state) => state.cartReducer.orderSummary);
  // console.log("!!!!!!!!! orderSummary", orderSummary);
  const validateUser = useSelector((state) => state.userReducer.validateUser);

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorEmptycart, setErrorEmptycart] = useState(null);
  const [buttonText, setButtonText] = useState(false);
  const [localshipping, setLocalshipping] = useState([]);
  const shippingAddress = useSelector(
    (state) => state.shippingAddressReducer.savedAddress
  );
  // console.log("!!!!!!!!!!!!!! shippingAddress", shippingAddress);
  const billingAddress = useSelector(
    (state) => state.billingAddressReducer.savedBillAddress
  );
  console.log("bbbbb billingAddress", billingAddress);

  const quoteId = useSelector((state) => state.cartReducer.quoteId);
  const isQuoted = useSelector((state) => state.cartReducer.isQuoted);
  const isCreditChecked = useSelector(
    (state) => state.userReducer.isCreditChecked
  );
  const deliveryInstructions = useSelector(
    (state) => state.userReducer.deliveryInstructions
  );
  // console.log(
  //   "deliveryInstructions}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",
  //   deliveryInstructions
  // );
  const shippingOption = useSelector(
    (state) => state.userReducer.shippingOption
  );
  const [isCartBackOrdered, setIsCartBackOrdered] = useState(false);

  useEffect(() => {
    const isCartBackOrderedLocal = JSON.parse(
      localStorage.getItem("isCartBackOrdered")
    );
    setIsCartBackOrdered(isCartBackOrderedLocal);
  }, []);

  const isSameAddChecked = useSelector(
    (state) => state.userReducer.isSameAddChecked
  );
  const isSameDetailsChecked = useSelector(
    (state) => state.userReducer.isSameDetailsChecked
  );
  const [billingAddressFromLocalStorage, setBillingAddressFromLocalStorage] =
    useState(null);
  useEffect(() => {
    if (isSameAddChecked || isSameDetailsChecked) {
      setBillingAddressFromLocalStorage(
        JSON.parse(localStorage.getItem("BillingshoppingAddressList"))
      );
    }
  }, [isSameAddChecked, isSameDetailsChecked]);

  // useEffect(() => {
  //   if (billingAddress.streetAddress == "") {
  //     dispatch(validateAddressAction(false));
  //   }
  // }, []);

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
          billingFirstName: isSameDetailsChecked
            ? user.firstName
            : billingAddress[0].billingFirstName,
          billingLastName: isSameDetailsChecked
            ? user.lastName
            : billingAddress[0].billingLastName,
          billingEmail: isSameDetailsChecked
            ? user.email
            : billingAddress[0].billingEmail,
          billingMobile: isSameDetailsChecked
            ? user.phone_number
            : billingAddress[0].billingPhoneNumber,
          billingStreetAddress: isSameAddChecked
            ? shippingAddress[0].streetAddress
            : billingAddressFromLocalStorage[0].billingStreetAddress,
          billingCity: isSameAddChecked
            ? shippingAddress[0].city
            : billingAddress[0].billingCity,
          billingState: isSameAddChecked
            ? shippingAddress[0].state
            : billingAddress[0].billingState,
          billingCountry: "Australia",
          billingPostCode: isSameAddChecked
            ? shippingAddress[0].postCode
            : billingAddress[0].billingPostCode,
        },
        ordersData: {
          invoiceId: cartId,
          cartItems: cartItems,
          subAmount: orderSummary.subAmount,
          shippingAmount: orderSummary.shippingAmount,
          creditAmount: orderSummary.creditAmount,
          totalAmount: orderSummary.totalAmount,
          totalAmountAfterCredit: isCreditChecked
            ? orderSummary.totalAmountWithCredit
            : orderSummary.totalAmount,
          quoteId: quoteId,
          isQuoted: isQuoted,
          deliveryInstructions: isCartBackOrdered ? deliveryInstructions : null,
          total_items: orderSummary.totalItems,
          total_pallets: orderSummary.totalPallets,
          total_weight: orderSummary.totalWeight,
          total_cubic: orderSummary.totalCBM,
          shippingOption: JSON.stringify(shippingOption),
          // shippingOption: shippingOption,
        },
        paymentInfo: isCreditChecked
          ? {
              status: "succeeded",
              id: user.email,
              date: "",
              amount: orderSummary.totalAmountWithCredit * 100,
              method:
                orderSummary.totalAmountWithCredit == 0
                  ? "CREDIT"
                  : "CREDIT+STRIPE",
            }
          : paymentInfo.variables.payment_info,
        appliedVoucherObj: orderSummary?.appliedVoucherObj,
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

    console.log("!!!!!!!!!!!!!!333333333 SAVEORDERAPIdata", data);

    // EXAMPLE DATA =>
    //   {
    //     "customerData": {
    //         "firstName": "Ishaan",
    //         "lastName": "Gupta",
    //         "phoneNumber": "+61888888888",
    //         "email": "ishaan@jabitsoft.com",
    //         "streetAddress": "123 Eagle St, Brisbane City QLD 4000, Australia",
    //         "city": "Brisbane City",
    //         "state": "QLD",
    //         "country": "Australia",
    //         "postCode": "4000",
    //         "billingFirstName": "Ishaan",
    //         "billingLastName": "Gupta",
    //         "billingEmail": "ishaan@jabitsoft.com",
    //         "billingMobile": "+61888888888",
    //         "billingStreetAddress": "345 George St, Sydney NSW 2000, Australia",
    //         "billingCity": "Sydney",
    //         "billingState": "NSW",
    //         "billingCountry": "Australia",
    //         "billingPostCode": "2000"
    //     },
    //     "ordersData": {
    //         "invoiceId": "66891e01-2bbb-4a8d-bd96-65836b79227f",
    //         "cartItems": [
    //             {
    //                 "id": 367,
    //                 "name": "A01-AMXX/8B.5WH",
    //                 "image": "/09f91a7a-d833-4d19-b1fa-89324b8a2f32.png",
    //                 "price": 56,
    //                 "price_after_discount": 50.4,
    //                 "qty": 1,
    //                 "pricelist": [
    //                     {
    //                         "price": 56,
    //                         "quantity": 1,
    //                         "discountPrice": 50.4
    //                     },
    //                     {
    //                         "price": 31,
    //                         "quantity": 10,
    //                         "discountPrice": 27.9
    //                     },
    //                     {
    //                         "price": 16,
    //                         "quantity": 20,
    //                         "discountPrice": 14.4
    //                     }
    //                 ],
    //                 "pallets": "0.0000",
    //                 "weight": "10.0000",
    //                 "cbm": "0.008000000000",
    //                 "priceTotal": 56,
    //                 "stock": 0,
    //                 "cableLength": 1,
    //                 "productType": 1,
    //                 "imageArrayIfCust": [
    //                     {
    //                         "path": "/09f91a7a-d833-4d19-b1fa-89324b8a2f32.png",
    //                         "defaultImage": 1,
    //                         "lifestyleImage": 0
    //                     }
    //                 ]
    //             }
    //         ],
    //         "subAmount": 50.4,
    //         "shippingAmount": 23.49,
    //         "totalAmount": 73.89,
    //         "totalAmountAfterCredit": 73.89,
    //         "quoteId": 64653421,
    //         "isQuoted": null,
    //         "deliveryInstructions": 1,
    //         "total_items": 1,
    //         "total_pallets": 0,
    //         "total_weight": 10,
    //         "total_cubic": 0.008,
    //         "shippingOption": "{\"carrier\":\"TLM_IPEC_COMMON\",\"eta\":\"2\",\"cost\":\"23.49\",\"service\":\"ROAD\",\"fuel_levy\":\"0\"}"
    //     },
    //     "paymentInfo": {
    //         "status": "succeeded",
    //         "id": "pi_3Oqy7GDmPekReW9A2XbCJld0",
    //         "date": 1709645590,
    //         "amount": 7389,
    //         "method": "STRIPE"
    //     }
    // }
    // setButtonText(false);
    // return;
    const token = decryptData("token");
    await axios
      .post(
        `${envUrl.baseUrl}${endPoint.saveFinalOrder}`,
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
          dispatch(removeCart());
          Router.replace(
            "/confirmation?ref=" +
              response.data.orderData.data[0].orderId +
              "&email=" +
              user.email
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
      // let totalPriceInCents = parseInt(orderSummary.totalAmount * 100);
      let totalPriceInCents = isCreditChecked
        ? parseInt(orderSummary.totalAmountWithCredit * 100)
        : parseInt(orderSummary.totalAmount * 100);
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
              {/* Place order */}
              Pay $
              {isCreditChecked
                ? orderSummary?.totalAmountWithCredit
                : orderSummary?.totalAmount?.toFixed(2)}
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
        {isCreditChecked && orderSummary?.totalAmountWithCredit == 0 ? (
          <>
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
                  {/* <div className={Styles.cartElement}>
                    <CardElement options={CARD_OPTIONS} />
                  </div> */}

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
                    onClick={saveOrderAPI}
                    className={
                      validateUser ? Styles.PlaceOrder : Styles.buttonDisabled
                    }
                  >
                    {/* Place order */}
                    Pay $
                    {isCreditChecked
                      ? orderSummary?.totalAmountWithCredit
                      : orderSummary?.totalAmount?.toFixed(2)}
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
          </>
        ) : (
          <CheckoutForm />
        )}
      </Elements>
    </>
  );
}

export default PlaceOrderButton;
