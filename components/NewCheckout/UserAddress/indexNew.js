import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Input,
  IconButton,
  Paper,
  FormHelperText,
  InputAdornment,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material/";
// import InputBase from '@material-ui/core/InputBase';
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Styles from "./address.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
// import {
//   validateAddress,
//   validateGoogleAddress,
// } from "../../../services/util/utilServices";
import {
  validateAddress,
  validateGoogleAddress,
} from "../../../services/util/utilServicesNew";
// import {SatelliteSharp} from '@material-ui/icons';
import {
  validateAddressAction,
  initUser,
  saveUser,
  disablePlaceOrder,
  toggleIsSameAddCheckBox,
  toggleIsSameDetailsCheckBox,
} from "../../../store/actions/userActions";
import {
  saveAddress,
  saveGoogleAddress,
  saveEmail,
  initAddressList,
} from "../../../store/actions/shippingAddressActions";
import {
  initBillingAddressList,
  saveBillAddress,
  saveBillingGoogleAddress,
} from "../../../store/actions/billingAddressActions";
import { checkEmailExist } from "../../../services/auth/authService";
import { Checkbox } from "antd";
import { updateShippingAmount } from "../../../store/actions/cartActions";

function UserAddress({ handleValidStreetAddress }) {
  const userAddressAutoComplete = useRef(null);
  var ParsedBillingshoppingAddressList = JSON.parse(
    localStorage.getItem("BillingshoppingAddressList")
  );
  // console.log(
  //   "bbbbbbbbb BillingshoppingAddressList",
  //   BillingshoppingAddressList
  // );
  var BillingshoppingAddressList =
    ParsedBillingshoppingAddressList && ParsedBillingshoppingAddressList[0];
  const user = useSelector((state) => state.userReducer.user);
  // const cart = useSelector((i) => i.cartReducer.cart);
  const dispatch = useDispatch();
  const shippingAddress = useSelector(
    (state) => state.shippingAddressReducer.savedAddress
  );
  const billingAddress = useSelector(
    (state) => state.billingAddressReducer.savedBillAddress
  );
  // console.log("bbbbb", billingAddress);
  const isSameAddChecked = useSelector(
    (state) => state.userReducer.isSameAddChecked
  );
  const [emailCheckStatus, setEmailCheckStatus] = React.useState(true);
  const [emailstatus, setEmailCheck] = React.useState();
  const [enteremail, SetEnterEmail] = React.useState();
  const [addressState, setAddressState] = React.useState({});
  // console.log("ssssssss addressState", addressState);
  const [googlePlace, setGooglePlace] = React.useState("");
  // console.log("gggggggggg googlePlace", googlePlace);
  const [streetaddresvalid, setStreetAddress] = React.useState("");
  const [validAddress, setValidAddress] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    postCode: false,
    city: false,
    state: false,
  });

  console.log("User Address Index New validAddress>>>>>>>>>>>>", validAddress);

  // useEffect(() => {
  //   dispatch(initAddressList());
  // }, []);

  React.useEffect(() => {
    if (addressState.streetAddress !== undefined) {
      setStreetAddress(addressState.streetAddress.length);
      handleValidStreetAddress(addressState.streetAddress.length);
    }
  }, [addressState]);
  React.useEffect(() => {
    if (googlePlace.length === 0) {
      setAddressState({
        ...addressState,
      });
    }

    if (user) {
      const tempAddress = JSON.parse(
        localStorage.getItem("shoppingAddressList")
      );
      // const tempAddress = JSON.parse(localStorage.getItem("saveAddress"));
      // console.log("+++++++++++ tempAddress ", tempAddress);

      if (tempAddress?.length > 0) {
        const address = tempAddress.filter((address) => {
          if (address.default) {
            return address;
          }
        });

        let savedUserAddress = address[0] || tempAddress[0];
        savedUserAddress.phoneNumber = user.phone_number;

        if (googlePlace.length === 0) {
          setAddressState({
            ...addressState,
            ...savedUserAddress,
          });
        }
        console.log(
          "gggggggg11111111111 validateGoogleAddress called from useEffect[user] if"
        );
        const validObj = validateGoogleAddress(address[0] || tempAddress[0]);

        setValidAddress({ ...validAddress, ...validObj });
      } else {
        let savedUserAddress = {};
        savedUserAddress.phoneNumber = user.phone_number;
        savedUserAddress.firstName = user.firstName;
        savedUserAddress.lastName = user.lastName;
        //savedUserAddress.bName = user.bName;
        savedUserAddress.email = user.email;
        savedUserAddress.city = addressState.city ? addressState.city : "";
        savedUserAddress.state = addressState.state ? addressState.state : "";
        savedUserAddress.postCode = addressState.postCode
          ? addressState.postCode
          : "";
        setAddressState({ ...addressState, ...savedUserAddress });

        console.log(
          "gggggggg222222222222222222 validateGoogleAddress called from useEffect[user] else"
        );
        const validObj = validateGoogleAddress(savedUserAddress);

        setValidAddress({ ...validAddress, ...validObj });
      }
    }
  }, [user]);

  const handleRemoveAddress = () => {
    // console.log("************");
    const placeAdd = {
      streetAddress: "",
      city: "",
      postCode: "",
      state: "",
      country: "",
    };
    //console.log('loadaddress =============== 4');
    dispatch(validateAddressAction(false));
    setAddressState({ ...addressState, ...placeAdd });
    setGooglePlace("");
    dispatch(saveAddress({ ...addressState, ...placeAdd }));
    dispatch(updateShippingAmount(0));
    if (isSameAddChecked) {
      dispatch(saveBillAddress({ ...BillingshoppingAddressList, ...placeAdd }));
    }
  };

  const [state, setState] = React.useState({ open: false, defer: false });

  const validateEmailExist = async (email) => {
    dispatch(saveEmail(email));
    //console.log('e.target.value 1:::::::::::' + email);
    SetEnterEmail(email);
    if (emailCheckStatus) {
      const emailCheck = await checkEmailExist(email);
      // console.log('e.target.value 5:::::::::::', emailCheck);
      setEmailCheck(emailCheck);
      if (
        emailCheck.userRes.email !== "" &&
        emailCheck.userRes.msg.includes("user")
      ) {
        // dispatch(validateAddressAction(false));
        //alert.show('This user already exists');
      }
      //setEmailCheckStatus(false);
    }
  };

  const validateVerifyAddress = () => {
    let addressStatus = false;
    for (let i in addressState) {
      if (addressState[i] !== "" || addressState[i] !== undefined) {
        addressStatus = true;
      } else {
        break;
      }
    }
    if (addressStatus) {
      console.log(
        "gggggggg33333333333333333 validateGoogleAddress called from validateVerifyAddress"
      );
      const validObj = validateGoogleAddress(addressState);
      //console.log('setvalid called 3');

      setValidAddress({ ...validAddress, ...validObj });

      // dispatch(manualAddressAction(addressState));
    }
  };

  const handleBlurValidation = (e) => {
    if (e.target.name === "email" && !user) {
      validateEmailExist(e.target.value.trim());
    }
    validateVerifyAddress();
  };

  const handleAddressChange = (e) => {
    // console.log("enter press here! ");
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(
    //   "@@@@@@@@@@@@@@@@@55555555555555 handleAddressChange ===============",
    //   name,
    //   value
    // );
    setAddressState({ ...addressState, [name]: value });
    validateVerifyAddress();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // console.log("enter press here! ");
      return false;
    }
  };

  React.useEffect(() => {
    if (validAddress) {
      let validRst = true;

      // removed this condition as validAddress is not valid here, only after selection it is valid

      for (let valid in validAddress) {
        if (typeof validAddress[valid] == "boolean") {
          // variable is a boolean

          if (validAddress[valid] === false) {
            validRst = false;
            break;
          }
        }
      }

      console.log(
        "useEffectttttttt validAddress",
        "validRst postcode :",
        validRst,
        "validAddress :",
        validAddress,
        "billingAddress  :",
        billingAddress
      );
      if (emailstatus && emailstatus.userRes.email !== "") {
        // dispatch(validateAddressAction(false));
      }
      if (
        billingAddress &&
        billingAddress[0].billingStreetAddress != "" &&
        shippingAddress &&
        shippingAddress[0].streetAddress != ""
      ) {
        // dispatch(validateAddressAction(validRst));
        dispatch(validateAddressAction(true));
      }

      if (validRst) {
        //console.log('===shipping approved saving valid address==');
        const saveAdd = {
          firstName: addressState.firstName,
          lastName: addressState.lastName,
          //bName: addressState.bName,
          phoneNumber: addressState.phoneNumber,
          email: addressState.email,
          streetAddress: addressState.streetAddress,
          city: addressState.city,
          postCode: addressState.postCode,
          country: "Australia",
          state: addressState.state,
        };
        dispatch(saveAddress(saveAdd));
        localStorage.setItem("postCode", addressState.postCode);
        if (!billingAddress || billingAddress[0].billingPostCode == "") {
          dispatch(validateAddressAction(false));
        } else {
          dispatch(validateAddressAction(true));
        }
      } else {
        dispatch(validateAddressAction(false));
      }
    }
  }, [validAddress]);

  React.useEffect(() => {
    if (googlePlace.address_components) {
      // console.log('place select goog', googlePlace);
      //console.log('place select addressState', addressState);
      const suburb = googlePlace.address_components.filter((add) => {
        if (add.types.includes("locality")) return add;
      });
      const postCode = googlePlace.address_components.filter((add) => {
        if (add.types.includes("postal_code")) return add;
      });
      const state = googlePlace.address_components.filter((add) => {
        if (add.types.includes("administrative_area_level_1")) return add;
      });
      const country = googlePlace.address_components.filter((add) => {
        if (add.types.includes("country")) return add;
      });
      const placeAdd = {
        streetAddress: googlePlace.formatted_address,
        city: suburb.length > 0 ? suburb[0].short_name : "",
        postCode: postCode.length > 0 ? postCode[0].long_name : "",
        state: state.length > 0 ? state[0].short_name : "",
        country: country.length > 0 ? country[0].long_name : "",
      };
      localStorage.setItem(
        "postCode",
        postCode.length > 0 ? postCode[0].long_name : 3000
      );
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      // console.log("place select goog 1-----", googlePlace);

      dispatch(saveGoogleAddress(googlePlace));
      if (isSameAddChecked) {
        dispatch(saveBillingGoogleAddress(googlePlace));
      }
      setAddressState({ ...addressState, ...placeAdd });
      console.log(
        "gggggggg444444444444444444 validateGoogleAddress called from useEffect[googleplace]"
      );
      const validObj = validateGoogleAddress(placeAdd);

      setValidAddress({ ...validAddress, ...validObj });
      // console.log("validstateUser from validstate after:", eval(loggedInUser));
      if (loggedInUser) {
        loggedInUser.streetAddress = googlePlace.formatted_address;
        loggedInUser.city = suburb.length > 0 ? suburb[0].long_name : "";
        loggedInUser.postCode =
          postCode.length > 0 ? postCode[0].long_name : "";
        loggedInUser.state = state.length > 0 ? state[0].short_name : "";
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem(
          "shoppingAddressList",
          "[" + JSON.stringify(loggedInUser) + "]"
        );
        localStorage.setItem("postCode", loggedInUser.postCode);

        dispatch(initUser());
        if (isSameAddChecked) {
          loggedInUser.billingStreetAddress = googlePlace.formatted_address;
          loggedInUser.billingCity =
            suburb.length > 0 ? suburb[0].long_name : "";
          loggedInUser.billingState =
            state.length > 0 ? state[0].short_name : "";
          loggedInUser.billingPostCode =
            postCode.length > 0 ? postCode[0].long_name : "";
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          localStorage.setItem(
            "BillingshoppingAddressList",
            "[" + JSON.stringify(loggedInUser) + "]"
          );
          localStorage.setItem("billingpostCode", loggedInUser.postCode);
          dispatch(initBillingAddressList());
        }
      }
    }
  }, [googlePlace]);

  const handleClear = () => {
    // console.log("cccccccccccccc");
  };

  // useEffect(() => {
  //   var close = document.getElementsByClassName("MuiButtonBase-root")[0];
  //   console.log("!!!!!!!!!!!!!!!!!! close", close);
  //   // Add a Click Event Listener to the button
  //   close.addEventListener("click", () => {
  //     alert("Add your Own Functionality Here...");
  //     console.log("!!!!!!!!!!!!!!!!!!222222222222 close", close);
  //     userAddressAutoComplete.current?.clear;
  //   });
  //   close.onClick = function () {
  //     console.log("!!!!!!!!!!!!!!!!!!222222222222 close", close);
  //   };
  //   userAddressAutoComplete.current?.clear;
  // });

  //page start

  const onChangeIsSameAdd = (e) => {
    console.log("eeeee11 e.target.checked = ", e.target.checked);
    dispatch(toggleIsSameAddCheckBox(e.target.checked));
    // if (e.target.checked == true) {
    //   dispatch(validateAddressAction(false));
    // }

    // if (googlePlace.address_components) {
    //   // console.log('place select goog', googlePlace);
    //   //console.log('place select addressState', addressState);
    //   const suburb = googlePlace.address_components.filter((add) => {
    //     if (add.types.includes("locality")) return add;
    //   });
    //   const postCode = googlePlace.address_components.filter((add) => {
    //     if (add.types.includes("postal_code")) return add;
    //   });
    //   const state = googlePlace.address_components.filter((add) => {
    //     if (add.types.includes("administrative_area_level_1")) return add;
    //   });
    //   const country = googlePlace.address_components.filter((add) => {
    //     if (add.types.includes("country")) return add;
    //   });
    //   const placeAdd = {
    //     streetAddress: googlePlace.formatted_address,
    //     city: suburb.length > 0 ? suburb[0].short_name : "",
    //     postCode: postCode.length > 0 ? postCode[0].long_name : "",
    //     state: state.length > 0 ? state[0].short_name : "",
    //     country: country.length > 0 ? country[0].long_name : "",
    //   };
    //   localStorage.setItem(
    //     "postCode",
    //     postCode.length > 0 ? postCode[0].long_name : 3000
    //   );
    //   const loggedInUser = JSON.parse(localStorage.getItem("user"));
    //   // console.log("place select goog 1-----", googlePlace);

    //   dispatch(saveGoogleAddress(googlePlace));
    //   if (isSameAddChecked) {
    //     dispatch(saveBillingGoogleAddress(googlePlace));
    //   }
    //   setAddressState({ ...addressState, ...placeAdd });
    //   console.log(
    //     "gggggggg444444444444444444 validateGoogleAddress called from useEffect[googleplace]"
    //   );
    //   const validObj = validateGoogleAddress(placeAdd);

    //   setValidAddress({ ...validAddress, ...validObj });
    //   // console.log("validstateUser from validstate after:", eval(loggedInUser));
    //   if (loggedInUser) {
    //     loggedInUser.streetAddress = googlePlace.formatted_address;
    //     loggedInUser.city = suburb.length > 0 ? suburb[0].long_name : "";
    //     loggedInUser.postCode =
    //       postCode.length > 0 ? postCode[0].long_name : "";
    //     loggedInUser.state = state.length > 0 ? state[0].short_name : "";
    //     localStorage.setItem("user", JSON.stringify(loggedInUser));
    //     localStorage.setItem(
    //       "shoppingAddressList",
    //       "[" + JSON.stringify(loggedInUser) + "]"
    //     );
    //     localStorage.setItem("postCode", loggedInUser.postCode);

    //     dispatch(initUser());
    //     if (isSameAddChecked) {
    //       loggedInUser.billingStreetAddress = googlePlace.formatted_address;
    //       loggedInUser.billingCity =
    //         suburb.length > 0 ? suburb[0].long_name : "";
    //       loggedInUser.billingState =
    //         state.length > 0 ? state[0].short_name : "";
    //       loggedInUser.billingPostCode =
    //         postCode.length > 0 ? postCode[0].long_name : "";
    //       localStorage.setItem("user", JSON.stringify(loggedInUser));
    //       localStorage.setItem(
    //         "BillingshoppingAddressList",
    //         "[" + JSON.stringify(loggedInUser) + "]"
    //       );
    //       localStorage.setItem("billingpostCode", loggedInUser.postCode);
    //       dispatch(initBillingAddressList());
    //     }
    //   }
    // }
  };

  const onChangeIsSameDetails = (e) => {
    console.log("eeeee222 e.target.checked = ", e.target.checked);

    dispatch(toggleIsSameDetailsCheckBox(e.target.checked));
    // if (e.target.checked == true) {
    //   dispatch(validateAddressAction(false));
    // }
  };
  return (
    <Grid className={Styles.userAddressSection}>
      <Typography
        variant="h5"
        component="h2"
        className={Styles.CheckoutPageTitle}
      >
        Delivery Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            error={
              !validAddress.firstName && addressState && addressState.firstName
            }
            name="firstName"
            disabled={user && user.firstName ? true : false}
            InputProps={
              !validAddress.firstName
                ? ""
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheckIcon style={{ color: "#43B963" }} />
                      </InputAdornment>
                    ),
                  }
            }
            inputProps={{
              autocomplete: "firstName",
              form: {
                autocomplete: "off",
              },
            }}
            required
            helperText={
              !validAddress.firstName && addressState && addressState.firstName
                ? "Invalid First Name"
                : ""
            }
            id="outlined-basic"
            label="First Name"
            onBlur={handleBlurValidation}
            // onKeyUp={handleKeyChange}
            onChange={handleAddressChange}
            value={user && user.firstName}
            //value={addressState && addressState.firstName}
            // disabled={addressState && addressState.firstName ? true : false}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            // autoFocus={true}
            className={Styles.TextField}
            size="small"
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            onBlur={handleBlurValidation}
            // onKeyUp={handleKeyChange}
            name="lastName"
            InputLabelProps={{ shrink: true }}
            onChange={handleAddressChange}
            required
            error={
              !validAddress.lastName && addressState && addressState.lastName
            }
            disabled={user && user.lastName ? true : false}
            helperText={
              !validAddress.lastName && addressState && addressState.lastName
                ? "Invalid Last Name"
                : ""
            }
            InputProps={
              !validAddress.lastName
                ? ""
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheckIcon style={{ color: "#43B963" }} />
                      </InputAdornment>
                    ),
                  }
            }
            inputProps={{
              autocomplete: "lastName",
              form: {
                autocomplete: "off",
              },
            }}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={user && user.lastName}
            className={Styles.TextField}
            size="small"
            autoComplete="off"
          />
        </Grid>

        {/*Email Block */}
        <Grid item xs={12} md={12}>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="email"
            required
            onChange={handleAddressChange}
            // onKeyUp={handleKeyChange}
            onBlur={handleBlurValidation}
            error={!validAddress.email && addressState && addressState.email}
            helperText={
              !validAddress.email && addressState && addressState.email
                ? "Invalid email address"
                : ""
            }
            InputProps={
              !validAddress.email
                ? ""
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheckIcon style={{ color: "#43B963" }} />
                      </InputAdornment>
                    ),
                  }
            }
            inputProps={{
              autocomplete: "email",
              form: {
                autocomplete: "off",
              },
            }}
            disabled={user && user.email ? true : false}
            label="Email Address"
            value={user && user.email}
            variant="outlined"
            autoComplete="off"
            className={
              emailstatus && emailstatus.userRes.email !== ""
                ? Styles.EmailTextField
                : Styles.TextField
            }
            size="small"
          />
          {emailstatus && emailstatus.userRes.email !== "" && (
            <p
              style={{
                color: "#f44336",
                marginLeft: "14px",
                marginRight: "14px",
                marginTop: "4px",
                fontSize: "0.75rem",
                marginBottom: "0px",
              }}
            >
              This user already exists
            </p>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={user && user.phone_number ? true : false}
            name="phoneNumber"
            InputLabelProps={{ shrink: true }}
            required
            onChange={handleAddressChange}
            // onKeyUp={handleKeyChange}
            error={
              !validAddress.phoneNumber &&
              addressState &&
              addressState.phoneNumber
            }
            InputProps={
              !validAddress.phoneNumber
                ? ""
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheckIcon style={{ color: "#43B963" }} />
                      </InputAdornment>
                    ),
                  }
            }
            onBlur={handleBlurValidation}
            inputProps={{
              maxlength: 13,
              autocomplete: "phoneNumber",
              form: {
                autocomplete: "off",
              },
            }}
            helperText={
              !validAddress.phoneNumber &&
              addressState &&
              addressState.phoneNumber
                ? "Invalid Phone Number"
                : ""
            }
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            value={addressState && addressState.phoneNumber}
            className={Styles.TextField}
            size="small"
          />
        </Grid>
        {/* Addrsss block */}
        <Grid
          item
          xs={12}
          className={Styles.Position}
          style={{ positio: "relative" }}
        >
          <Paper
            className={
              streetaddresvalid === 0
                ? Styles.googleAddressBoxInvalid
                : Styles.googleAddressBox
            }
            onBlur={handleBlurValidation}
          >
            <Autocomplete
              ref={userAddressAutoComplete}
              id="outlined-basic"
              variant="outlined"
              // apiKey="AIzaSyB3Fp4nW2rKPUav4NJ8Tt0YZGBjikZrhkU" // koala key
              apiKey="AIzaSyDFS10vxdv0vIIEj1lLTetclUV2s9QIlzk" // sparky key
              name="streetAddress"
              required
              onChange={handleAddressChange}
              label="Street Address"
              //placeholder="Street Address"
              className={Styles.addressSearch}
              value={addressState && addressState.streetAddress}
              onPlaceSelected={(places) => setGooglePlace(places)}
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: { country: "AU" },
              }}
              size="small"
              onKeyDown={handleKeyPress}
              // onClear={handleClear}
            />
            <IconButton
              style={{ outline: "none" }}
              type="button"
              aria-label="cancel"
              onClick={handleRemoveAddress}
            >
              <CloseIcon />
            </IconButton>
          </Paper>
          <Grid container style={{ justifyContent: "flex-end" }}>
            <span
              className={Styles.manualAddressLink}
              onClick={() =>
                setState({
                  open: !state.open,
                  defer: true,
                })
              }
            >
              {"Enter address manually"}
            </span>
          </Grid>
          {streetaddresvalid === 0 && (
            <p
              style={{
                color: "#f44336",
                fontSize: "0.80rem",
                marginBottom: "0",
                marginTop: "-18px",
                marginLeft: "5px",
              }}
            >
              Enter delivery address
            </p>
          )}
          {streetaddresvalid > 4 &&
            (validAddress.city === false ||
              validAddress.state === false ||
              validAddress.postCode === false) && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "0.65rem",
                  marginBottom: "0",
                  marginTop: "-18px",
                  marginLeft: "5px",
                }}
              >
                Please enter valid delivery address
              </p>
            )}
        </Grid>
        {state.open ? (
          <React.Fragment>
            {/* <NoSsr defer={state.defer}> */}
            <Grid item xs={6}>
              <TextField
                disabled
                // onBlur={handleBlurValidation}
                required
                InputLabelProps={{ shrink: true }}
                name="city"
                error={!validAddress.city && addressState && addressState.city}
                helperText={
                  !validAddress.city && addressState && addressState.city
                    ? "Invalid Suburb "
                    : ""
                }
                InputProps={
                  !validAddress.city
                    ? ""
                    : {
                        endAdornment: (
                          <InputAdornment position="end">
                            <CheckIcon style={{ color: "#43B963" }} />
                          </InputAdornment>
                        ),
                      }
                }
                onChange={handleAddressChange}
                // onKeyUp={handleKeyChange}
                label="Suburb"
                variant="outlined"
                value={addressState && addressState.city}
                className={Styles.TextField}
                size="small"
                inputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                // onBlur={handleBlurValidation}
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleAddressChange}
                // onKeyUp={handleKeyChange}
                name="postCode"
                inputProps={{
                  maxlength: 4,
                }}
                error={!validAddress.postCode && addressState.postCode}
                helperText={
                  !validAddress.postCode && addressState.postCode
                    ? "Invalid Post Code"
                    : ""
                }
                InputProps={
                  !validAddress.postCode
                    ? ""
                    : {
                        endAdornment: (
                          <InputAdornment position="end">
                            <CheckIcon style={{ color: "#43B963" }} />
                          </InputAdornment>
                        ),
                      }
                }
                label="Postcode"
                variant="outlined"
                value={addressState && addressState.postCode}
                className={Styles.TextField}
                size="small"
                // inputProps={{
                //   readOnly: true,
                // }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                disabled
                name="state"
                InputLabelProps={{ shrink: true }}
                onChange={handleAddressChange}
                variant="outlined"
                required
                // onBlur={handleBlurValidation}
                // value={addressState && addressState.state}
                // error={!validAddress.state}
                // helperText={!validAddress.state ? 'Select state' : ''}
                size="small"
                className={Styles.TextField}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  State
                </InputLabel>
                <Select
                  native
                  // onChange={handleChange}
                  // onChange={handleAddressChange}
                  value={addressState && addressState.state}
                  label="State"
                >
                  <option aria-label="None" value="">
                    select state
                  </option>
                  <option value="ACT">ACT</option>
                  <option value="NSW">NSW</option>
                  <option value="NT">NT</option>
                  <option value="QLD">QLD</option>
                  <option value="SA">SA</option>
                  <option value="TAS">TAS</option>
                  <option value="VIC">VIC</option>
                  <option value="WA">WA</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                disabled
                name="country"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                size="small"
                className={Styles.TextField}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Country
                </InputLabel>
                <Select
                  native
                  name="country"
                  onChange={handleAddressChange}
                  defaultValue="Australia"
                  label="Country"
                  inputProps={{
                    name: "age",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="">
                    select the country
                  </option>
                  <option value="Australia">Australia</option>
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        ) : null}
      </Grid>
      <Checkbox onChange={onChangeIsSameDetails}>
        Billing Details same as Shipping Details
      </Checkbox>
      <Checkbox onChange={onChangeIsSameAdd}>
        Billing Address same as Shipping Address
      </Checkbox>
    </Grid>
  );
}

export default UserAddress;
