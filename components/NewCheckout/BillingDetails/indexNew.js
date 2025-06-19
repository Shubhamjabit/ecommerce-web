import React, { useState, useEffect } from "react";
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
} from "../../../store/actions/userActions";
import {
  initBillingAddressList,
  saveBillAddress,
  saveBillingGoogleAddress,
  saveEmail,
} from "../../../store/actions/billingAddressActions";
import { checkEmailExist } from "../../../services/auth/authService";
import { Opacity } from "@mui/icons-material";

const BillingDetails = ({ handleValidStreetAddress }) => {
  const dispatch = useDispatch();
  var ParsedshoppingAddressList = JSON.parse(
    localStorage.getItem("shoppingAddressList")
  );
  var shoppingAddressList =
    ParsedshoppingAddressList && ParsedshoppingAddressList[0];
  console.log("shoppingAddressList in billing details", shoppingAddressList);
  const user = useSelector((state) => state.userReducer.user);
  console.log("UUUUUUUUUUUUUUUUU user", user);
  // const cart = useSelector((i) => i.cartReducer.cart);
  const shippingAddress = useSelector(
    (state) => state.shippingAddressReducer.savedAddress
  );
  console.log(
    "BILLING DETAILS shippingAddress 333333333>>>>>>>>>>>",
    shippingAddress
  );
  const billingAddress = useSelector(
    (state) => state.billingAddressReducer.savedBillAddress
  );
  // console.log("bbbbb ssssssss shippingAddress", shippingAddress);
  const isSameAddChecked = useSelector(
    (state) => state.userReducer.isSameAddChecked
  );
  const isSameDetailsChecked = useSelector(
    (state) => state.userReducer.isSameDetailsChecked
  );
  const [emailCheckStatus, setEmailCheckStatus] = React.useState(true);
  const [emailstatus, setEmailCheck] = React.useState();
  const [enteremail, SetEnterEmail] = React.useState();
  const [BillingAddressState, setBillingAddressState] = React.useState({});
  console.log(
    "BILLING DETAILS BillingAddressState 1111111111>>>>>>>>>>>",
    BillingAddressState
  );
  const [googlePlace, setGooglePlace] = React.useState("");
  const [streetaddresvalid, setStreetAddress] = React.useState("");
  const [validAddress, setValidAddress] = React.useState({
    billingFirstName: false,
    billingLastName: false,
    billingEmail: false,
    billingPhoneNumber: false,
    billingPostCode: false,
    billingCity: false,
    billingState: false,
  });
  console.log(
    "BILLING DETAILS validAddress 222222222>>>>>>>>>>>>>",
    validAddress
  );
  useEffect(() => {
    // if billing addrss is empty, disable place order button
    var x = JSON.parse(localStorage.getItem("BillingshoppingAddressList"));
    if (x?.length > 0) {
      if (x[0].billingStreetAddress == "") {
        validateAddressAction(false);
      }
    }
  }, []);
  // useEffect which detects changes on isSameAdd checkbox and add change in shipping address
  // if checkbox ticked, copied shipping address value in billing address
  useEffect(() => {
    console.log(
      "BILLIGN DETAILS UE[isSameAddChecked, shippingAddress && shippingAddress[0].streetAddress]?????????????????222222222222222222222"
    );
    if (isSameAddChecked) {
      // if (shoppingAddressList) {
      if (shippingAddress) {
        console.log(
          "BILLIGN DETAILS UE[isSameAddChecked, shippingAddress && shippingAddress[0].streetAddress]??????????33333333333333333333333333"
        );
        setBillingAddressState({
          ...BillingAddressState,
          billingStreetAddress: shippingAddress[0].streetAddress,
          billingCity: shippingAddress[0].city,
          billingState: shippingAddress[0].state,
          billingCountry: shippingAddress[0].country,
          billingPostCode: shippingAddress[0].postCode,
          streetAddress: shippingAddress[0].streetAddress,
          city: shippingAddress[0].city,
          state: shippingAddress[0].state,
          country: shippingAddress[0].country,
          postCode: shippingAddress[0].postCode,
        });
        dispatch(saveBillAddress({ ...BillingAddressState }));
        // const o = BillingAddressState;
        // delete o.firstName;
        // delete o.lastName;
        // const validObj = validateGoogleAddress(o);
        // setValidAddress({ ...validAddress, ...validObj });
        validateVerifyAddress();
      }
    }
  }, [isSameAddChecked, shippingAddress && shippingAddress[0].streetAddress]);

  useEffect(() => {
    if (isSameDetailsChecked) {
      setBillingAddressState({
        ...BillingAddressState,
        billingFirstName: user.firstName,
        billingLastName: user.lastName,
        billingEmail: user.email,
        billingPhoneNumber: user.phone_number,
      });
      validateVerifyDetails();
    }
  }, [isSameDetailsChecked]);

  const handleRemoveAddress = () => {
    const placeAdd = {
      billingStreetAddress: "",
      billingCity: "",
      billingPostCode: "",
      billingState: "",
      billingCountry: "",
    };
    //console.log('loadaddress =============== 4');
    dispatch(validateAddressAction(false));
    setBillingAddressState({ ...BillingAddressState, ...placeAdd });
    setGooglePlace("");
    dispatch(saveBillAddress({ ...BillingAddressState, ...placeAdd }));
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
    for (let i in BillingAddressState) {
      if (
        BillingAddressState[i] !== "" ||
        BillingAddressState[i] !== undefined
      ) {
        addressStatus = true;
      } else {
        break;
      }
    }
    if (addressStatus) {
      console.log(
        "BILLING DETAILS INDEX validateGoogleAddress called from validateVerifyAddress with BillingAddressState = ",
        BillingAddressState
      );
      const validObj = validateGoogleAddress(BillingAddressState);

      // setValidAddress({ ...validAddress, ...validObj });
      // dispatch(manualAddressAction(BillingAddressState));

      //start - doing this since city and postcode are valid is same Checked
      if (isSameAddChecked) {
        if (shippingAddress?.length > 0) {
          // setBillingAddressState({
          //   ...BillingAddressState,
          //   billingStreetAddress: shippingAddress[0].streetAddress,
          //   billingCity: shippingAddress[0].city,
          //   billingState: shippingAddress[0].state,
          //   billingCountry: shippingAddress[0].country,
          //   billingPostCode: shippingAddress[0].postCode,
          //   streetAddress: shippingAddress[0].streetAddress,
          //   city: shippingAddress[0].city,
          //   state: shippingAddress[0].state,
          //   country: shippingAddress[0].country,
          //   postCode: shippingAddress[0].postCode,
          // });
          setValidAddress({
            ...validAddress,
            ...validObj,
            billingCity: true,
            billingPostCode: true,
          });

          dispatch(validateAddressAction(true));
        }
      } else {
        // else usual logic
        setValidAddress({ ...validAddress, ...validObj });
      }
      // end
    }

    // TO HANDLE THE BUG WHERE AFTER CHECKING SAME BILLING DETAILS CHECKBOX AND THEN UNCHECK, THEN REMOVE FIRST NAME, PAY OPTION IS ENABLED 08/05/24
    // console.log("+++++++++++++++++++ BillingAddressState", BillingAddressState);
    // for (let i in BillingAddressState) {
    //   console.log("+++++++++++++++++++", BillingAddressState[i]?.trim());
    //   if (BillingAddressState[i]?.trim() == "") {
    //     console.log("+++++++++++++++++++ tt");
    //     dispatch(validateAddressAction(false));
    //     break;
    //   }
    // }
  };

  const validateVerifyDetails = () => {
    //start - doing this since billing details showing invalid if same details checked
    if (isSameDetailsChecked) {
      setValidAddress({
        ...validAddress,
        billingFirstName: true,
        billingLastName: true,
        billingEmail: true,
        billingPhoneNumber: true,
      });
      dispatch(validateAddressAction(true));
    } else {
      // else usual logic
      setValidAddress({ ...validAddress });
    }
    // end
  };

  const handleBlurValidation = (e) => {
    // if (e.target.name === "billingEmail" && !user) {
    //   validateEmailExist(e.target.value.trim());
    // }
    validateVerifyAddress();
  };

  const handleAddressChange = (e) => {
    // console.log("enter press here! ");
    e.preventDefault();
    const { name, value } = e.target;
    //console.log('loadaddress =============== 5');
    setBillingAddressState({ ...BillingAddressState, [name]: value });
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
        // if (
        //   valid == "firstName" ||
        //   valid == "lastName" ||
        //   valid == "email" ||
        //   valid == "phoneNumber" ||
        //   valid == "city" ||
        //   valid == "postCode"
        // ) {
        // variable is a boolean
        if (typeof validAddress[valid] == "boolean") {
          if (validAddress[valid] === false) {
            validRst = false;
            break;
          }
        }
      }

      console.log(
        "bbbbb useEffectttttttt validAddress",
        "validRst postCode :",
        validRst,
        "validAddress :",
        validAddress,
        "shippingAddress :",
        shippingAddress
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
        dispatch(validateAddressAction(true));
      }

      if (validRst) {
        //console.log('===shipping approved saving valid address==');
        const saveAdd = {
          billingFirstName: BillingAddressState.billingFirstName,
          billingLastName: BillingAddressState.billingLastName,
          billingPhoneNumber: BillingAddressState.billingPhoneNumber,
          billingEmail: BillingAddressState.billingEmail,
          billingStreetAddress: BillingAddressState.billingStreetAddress,
          billingCity: BillingAddressState.billingCity,
          billingState: BillingAddressState.billingState,
          billingPostCode: BillingAddressState.billingPostCode,
          billingCountry: BillingAddressState.billingCountry,
        };
        dispatch(saveBillAddress(saveAdd));
        localStorage.setItem(
          "billingpostCode",
          BillingAddressState.billingPostCode
        );
        if (!shippingAddress || shippingAddress[0].postCode == "") {
          dispatch(validateAddressAction(false));
        } else {
          dispatch(validateAddressAction(true));
        }
      } else {
        // START => to resolve the bug where even if correct add, still pay button is disabled, due to blank billingAddress
        if (isSameAddChecked) {
          dispatch(validateAddressAction(true));
        } else {
          dispatch(validateAddressAction(false));
        }
        // END => to resolve the bug where even if correct add, still pay button is disabled, due to blank billingAddress
      }
      // START => TO HANDLE THE BUG WHERE AFTER CHECKING SAME BILLING DETAILS CHECKBOX AND THEN UNCHECK, THEN REMOVE FIRST NAME, PAY OPTION IS ENABLED 08/05/24
      for (let i in BillingAddressState) {
        console.log("+++++++++++++++++++", BillingAddressState[i]?.trim());
        if (BillingAddressState[i]?.trim() == "" || validAddress[i] == false) {
          console.log("+++++++++++++++++++ tt");
          dispatch(validateAddressAction(false));
          break;
        }
      }
      // END => TO HANDLE THE BUG WHERE AFTER CHECKING SAME BILLING DETAILS CHECKBOX AND THEN UNCHECK, THEN REMOVE FIRST NAME, PAY OPTION IS ENABLED
    }
  }, [validAddress]);

  React.useEffect(() => {
    if (googlePlace.address_components) {
      // console.log('place select goog', googlePlace);
      //console.log('place select BillingAddressState', BillingAddressState);
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
        billingStreetAddress: googlePlace.formatted_address,
        billingCity: suburb.length > 0 ? suburb[0].short_name : "",
        billingPostCode: postCode.length > 0 ? postCode[0].long_name : "",
        billingState: state.length > 0 ? state[0].short_name : "",
        billingCountry: country.length > 0 ? country[0].long_name : "",
      };
      localStorage.setItem(
        "billingpostCode",
        postCode.length > 0 ? postCode[0].long_name : 3000
      );
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      // console.log("place select goog 1-----", googlePlace);

      dispatch(saveBillingGoogleAddress(googlePlace));
      setBillingAddressState({ ...BillingAddressState, ...placeAdd });

      console.log(
        "BILLING gggggggg8888888888  validateGoogleAddress called from useEffect[googlePlace]"
      );
      const validObj = validateGoogleAddress(placeAdd);

      setValidAddress({ ...validAddress, ...validObj });
      // console.log("validstateUser from validstate after:", eval(loggedInUser));
      if (loggedInUser) {
        // loggedInUser.streetAddress = googlePlace.formatted_address;
        loggedInUser.billingStreetAddress = googlePlace.formatted_address;
        loggedInUser.billingCity = suburb.length > 0 ? suburb[0].long_name : "";
        loggedInUser.billingState = state.length > 0 ? state[0].short_name : "";
        loggedInUser.billingPostCode =
          postCode.length > 0 ? postCode[0].long_name : "";
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem(
          "BillingshoppingAddressList",
          "[" + JSON.stringify(loggedInUser) + "]"
        );
        localStorage.setItem("billingpostCode", loggedInUser.postCode);

        dispatch(initUser());
        dispatch(initBillingAddressList());
      }
    }
  }, [googlePlace]);

  // body starts
  return (
    <Grid className={Styles.userAddressSection}>
      <Typography
        variant="h5"
        component="h2"
        className={Styles.CheckoutPageTitle}
      >
        Billing Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            disabled={isSameDetailsChecked}
            error={
              (!validAddress.billingFirstName &&
                BillingAddressState &&
                BillingAddressState.billingFirstName) ||
              BillingAddressState.billingFirstName == ""
            }
            name="billingFirstName"
            // disabled={user && user.firstName ? true : false}
            InputProps={
              !validAddress.billingFirstName ||
              BillingAddressState.billingFirstName == ""
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
              autocomplete: "billingFirstName",
              form: {
                autocomplete: "off",
              },
            }}
            required
            // helperText={
            //   (!validAddress.firstName &&
            //     BillingAddressState &&
            //     BillingAddressState.firstName) ||
            //   BillingAddressState.firstName == ""
            //     ? "Invalid First Name"
            //     : ""
            // }
            helperText={
              !validAddress.billingFirstName &&
              BillingAddressState &&
              BillingAddressState.billingFirstName
                ? "Invalid First Name"
                : BillingAddressState.billingFirstName == ""
                ? "Please Enter First Name"
                : ""
            }
            id="outlined-basic"
            label="First Name"
            onBlur={handleBlurValidation}
            // onKeyUp={handleKeyChange}
            onChange={handleAddressChange}
            // value={user && user.firstName}
            value={BillingAddressState && BillingAddressState.billingFirstName}
            // disabled={BillingAddressState && BillingAddressState.firstName ? true : false}
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
            disabled={isSameDetailsChecked}
            onBlur={handleBlurValidation}
            // onKeyUp={handleKeyChange}
            name="billingLastName"
            InputLabelProps={{ shrink: true }}
            onChange={handleAddressChange}
            required
            error={
              (!validAddress.billingLastName &&
                BillingAddressState &&
                BillingAddressState.billingLastName) ||
              BillingAddressState.billingLastName == ""
            }
            // disabled={user && user.lastName ? true : false}
            helperText={
              !validAddress.billingLastName &&
              BillingAddressState &&
              BillingAddressState.billingLastName
                ? "Invalid Last Name"
                : BillingAddressState.billingLastName == ""
                ? "Please Enter Last Name"
                : ""
            }
            InputProps={
              !validAddress.billingLastName ||
              BillingAddressState.billingLastName == ""
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
              autocomplete: "billingLastName",
              form: {
                autocomplete: "off",
              },
            }}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            // value={user && user.lastName}
            value={BillingAddressState && BillingAddressState.billingLastName}
            className={Styles.TextField}
            size="small"
            autoComplete="off"
          />
        </Grid>

        {/*Email Block */}
        <Grid item xs={12} md={12}>
          <TextField
            disabled={isSameDetailsChecked}
            InputLabelProps={{ shrink: true }}
            name="billingEmail"
            required
            onChange={handleAddressChange}
            // onKeyUp={handleKeyChange}
            onBlur={handleBlurValidation}
            error={
              (!validAddress.billingEmail &&
                BillingAddressState &&
                BillingAddressState.billingEmail) ||
              BillingAddressState.billingEmail == ""
            }
            helperText={
              !validAddress.billingEmail &&
              BillingAddressState &&
              BillingAddressState.billingEmail
                ? "Invalid email address"
                : BillingAddressState.billingEmail == ""
                ? "Please Enter Email"
                : ""
            }
            InputProps={
              !validAddress.billingEmail ||
              BillingAddressState.billingEmail == ""
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
              autocomplete: "billingEmail",
              form: {
                autocomplete: "off",
              },
            }}
            // disabled={user && user.email ? true : false}
            label="Email Address"
            // value={user && user.email}
            value={BillingAddressState && BillingAddressState.billingEmail}
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
            disabled={isSameDetailsChecked}
            name="billingPhoneNumber"
            InputLabelProps={{ shrink: true }}
            required
            onChange={handleAddressChange}
            // onKeyUp={handleKeyChange}
            error={
              (!validAddress.billingPhoneNumber &&
                BillingAddressState &&
                BillingAddressState.billingPhoneNumber) ||
              BillingAddressState.billingPhoneNumber == ""
            }
            InputProps={
              !validAddress.billingPhoneNumber ||
              BillingAddressState.billingPhoneNumber == ""
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
              autocomplete: "billingPhoneNumber",
              form: {
                autocomplete: "off",
              },
            }}
            helperText={
              !validAddress.billingPhoneNumber &&
              BillingAddressState &&
              BillingAddressState.billingPhoneNumber
                ? "Invalid Phone Number"
                : BillingAddressState.billingPhoneNumber == ""
                ? "Please Enter Mobile Number"
                : ""
            }
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            value={
              BillingAddressState && BillingAddressState.billingPhoneNumber
            }
            className={Styles.TextField}
            size="small"
          />
        </Grid>
        {/* Addrsss block */}

        <Grid
          item
          xs={12}
          className={Styles.Position}
          // style={{ positio: "relative" }}
          // disable address field if same add checkbox ticked
          style={isSameAddChecked ? { opacity: 0.5 } : { opacity: 1 }}
        >
          <Paper
            className={
              streetaddresvalid === 0
                ? Styles.googleAddressBoxInvalid
                : Styles.googleAddressBox
            }
            onBlur={handleBlurValidation}
            // disabled={isSameAddChecked}
          >
            <Autocomplete
              disabled={isSameAddChecked}
              id="outlined-basic"
              variant="outlined"
              // apiKey="AIzaSyB3Fp4nW2rKPUav4NJ8Tt0YZGBjikZrhkU" // koala key
              apiKey="AIzaSyDFS10vxdv0vIIEj1lLTetclUV2s9QIlzk" // sparky key
              name="billingStreetAddress"
              required
              onChange={handleAddressChange}
              label="Street Address"
              //placeholder="Street Address"
              className={Styles.addressSearch}
              value={
                BillingAddressState && BillingAddressState.billingStreetAddress
              }
              onPlaceSelected={(places) => setGooglePlace(places)}
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: { country: "AU" },
              }}
              size="small"
              onKeyDown={handleKeyPress}
            />
            <IconButton
              style={{ outline: "none" }}
              type="button"
              aria-label="cancel"
              onClick={handleRemoveAddress}
              disabled={isSameAddChecked}
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
          {streetaddresvalid === 0 && !isSameAddChecked && (
            <p
              style={{
                color: "#f44336",
                fontSize: "0.80rem",
                marginBottom: "0",
                marginTop: "-18px",
                marginLeft: "5px",
              }}
            >
              Enter billing address
            </p>
          )}
          {!isSameAddChecked &&
            streetaddresvalid > 4 &&
            (validAddress.billingCity === false ||
              validAddress.billingState === false ||
              validAddress.billingPostCode === false) && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "0.80rem",
                  marginBottom: "0",
                  marginTop: "-18px",
                  marginLeft: "5px",
                }}
              >
                Please enter valid Billing address
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
                name="billingCity"
                error={
                  !validAddress.billingCity &&
                  BillingAddressState &&
                  BillingAddressState.billingCity
                }
                helperText={
                  !validAddress.billingCity &&
                  BillingAddressState &&
                  BillingAddressState.billingCity
                    ? "Invalid Suburb "
                    : ""
                }
                InputProps={
                  !validAddress.billingCity
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
                value={BillingAddressState && BillingAddressState.billingCity}
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
                name="billingPostCode"
                inputProps={{
                  maxlength: 4,
                }}
                error={
                  !validAddress.billingPostCode &&
                  BillingAddressState.billingPostCode
                }
                helperText={
                  !validAddress.billingPostCode &&
                  BillingAddressState.billingPostCode
                    ? "Invalid Post Code"
                    : ""
                }
                InputProps={
                  !validAddress.billingPostCode
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
                value={
                  BillingAddressState && BillingAddressState.billingPostCode
                }
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
                // value={BillingAddressState && BillingAddressState.state}
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
                  value={
                    BillingAddressState && BillingAddressState.billingState
                  }
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
    </Grid>
  );
};

export default BillingDetails;
