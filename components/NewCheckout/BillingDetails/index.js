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
import {
  validateAddress,
  validateGoogleAddress,
} from "../../../services/util/utilServices";
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
  // const cart = useSelector((i) => i.cartReducer.cart);
  const shippingAddress = useSelector(
    (state) => state.shippingAddressReducer.savedAddress
  );
  // console.log("bbbbb ssssssss shippingAddress", shippingAddress);
  const isSameAddChecked = useSelector(
    (state) => state.userReducer.isSameAddChecked
  );
  const [emailCheckStatus, setEmailCheckStatus] = React.useState(true);
  const [emailstatus, setEmailCheck] = React.useState();
  const [enteremail, SetEnterEmail] = React.useState();
  const [BillingAddressState, setBillingAddressState] = React.useState({
    phoneNumber: null,
    firstName: null,
    lastName: null,
    email: null,
    city: null,
    state: null,
    postCode: null,
    billingStreetAddress: null,
    billingCity: null,
    billingState: null,
    billingCountry: null,
    billingPostCode: null,
  });
  console.log("######## BillingAddressState", BillingAddressState);
  const [googlePlace, setGooglePlace] = React.useState("");
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
  console.log("# validAddress in billing details", validAddress);
  useEffect(() => {
    // if billing addrss is empty, disable place order button
    var x = JSON.parse(localStorage.getItem("BillingshoppingAddressList"));
    if (x?.length > 0) {
      if (x[0].billingStreetAddress == "") {
        validateAddressAction(false);
      }
    }
  }, []);
  // useEffect which detects changes on isSameAdd checkbox and add change in shipping add
  // if checkbox ticked, copied shipping add value in billing add
  useEffect(() => {
    if (isSameAddChecked) {
      if (shoppingAddressList) {
        setBillingAddressState({
          ...BillingAddressState,
          billingStreetAddress: shoppingAddressList.streetAddress,
          billingCity: shoppingAddressList.city,
          billingState: shoppingAddressList.state,
          billingCountry: shoppingAddressList.country,
          billingPostCode: shoppingAddressList.postCode,
          streetAddress: shoppingAddressList.streetAddress,
          city: shoppingAddressList.city,
          state: shoppingAddressList.state,
          country: shoppingAddressList.country,
          postCode: shoppingAddressList.postCode,
        });
        // const o = BillingAddressState;
        // delete o.firstName;
        // delete o.lastName;
        // const validObj = validateGoogleAddress(o);
        // setValidAddress({ ...validAddress, ...validObj });
        validateVerifyAddress();
      }
    }
  }, [isSameAddChecked, shippingAddress && shippingAddress[0].streetAddress]);

  React.useEffect(() => {
    if (BillingAddressState.billingStreetAddress !== undefined) {
      setStreetAddress(BillingAddressState.billingStreetAddress?.length);
      handleValidStreetAddress(
        BillingAddressState.billingStreetAddress?.length
      );
    }
  }, [BillingAddressState]);
  React.useEffect(() => {
    if (googlePlace.length === 0) {
      setBillingAddressState({
        ...BillingAddressState,
      });
    }

    if (user) {
      const tempAddress = JSON.parse(
        localStorage.getItem("BillingshoppingAddressList")
      );

      if (tempAddress.length > 0) {
        const address = tempAddress.filter((address) => {
          if (address.default) {
            return address;
          }
        });

        let savedUserAddress = address[0] || tempAddress[0];
        // savedUserAddress.phoneNumber = user.phone_number;
        // to not use user phone  as billing phone
        // savedUserAddress.phoneNumber = user.billling_phone_number
        //   ? user.billling_phone_number
        //   : "";
        // console.log("^^^^ savedUserAddress", savedUserAddress);
        if (googlePlace.length === 0) {
          setBillingAddressState({
            ...BillingAddressState,
            ...savedUserAddress,
          });
        }

        const validObj = validateGoogleAddress(address[0] || tempAddress[0]);
        // console.log("bbbbbb validObj", validObj);

        setValidAddress({ ...validAddress, ...validObj });
      } else {
        let savedUserAddress = {};
        // savedUserAddress.phoneNumber = user.phone_number;
        // to not use user phone  as billing phone
        savedUserAddress.phoneNumber = user.billling_phone_number
          ? user.billling_phone_number
          : null;
        savedUserAddress.firstName = user.billingFirstName
          ? user.billingFirstName
          : null;
        savedUserAddress.lastName = user.billingLastName
          ? user.billingLastName
          : null;
        //savedUserAddress.bName = user.bName;
        savedUserAddress.email = user.billingEmail ? user.billingEmail : null;
        savedUserAddress.city = BillingAddressState.city
          ? BillingAddressState.city
          : null;
        savedUserAddress.state = BillingAddressState.state
          ? BillingAddressState.state
          : null;
        savedUserAddress.postCode = BillingAddressState.postCode
          ? BillingAddressState.postCode
          : null;
        setBillingAddressState({ ...BillingAddressState, ...savedUserAddress });

        const validObj = validateGoogleAddress(savedUserAddress);

        setValidAddress({ ...validAddress, ...validObj });
      }
    }
  }, [user]);

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
        dispatch(validateAddressAction(false));
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
      const validObj = validateGoogleAddress(BillingAddressState);
      console.log("## setvalid called 3", validObj);

      setValidAddress({ ...validAddress, ...validObj });
      // dispatch(manualAddressAction(BillingAddressState));
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
      for (let valid in validAddress) {
        if (validAddress[valid] === false) {
          validRst = false;
          break;
        }
      }
      // console.log(
      //   "validRst postCode :",
      //   validRst,
      //   "validAddress :",
      //   validAddress
      // );
      if (emailstatus && emailstatus.userRes.email !== "") {
        dispatch(validateAddressAction(false));
      } else {
        if (shippingAddress && shippingAddress[0].streetAddress != "") {
          console.log("ttt validRst", validRst);
          dispatch(validateAddressAction(validRst));
        }
      }
      if (validRst) {
        //console.log('===shipping approved saving valid address==');
        const saveAdd = {
          firstName: BillingAddressState.firstName,
          lastName: BillingAddressState.lastName,
          //bName: BillingAddressState.bName,
          phoneNumber: BillingAddressState.phoneNumber,
          email: BillingAddressState.email,
          billingStreetAddress: BillingAddressState.billingStreetAddress,
          billingCity: BillingAddressState.billingCity,
          billingState: BillingAddressState.billingState,
          billingPostCode: BillingAddressState.billingPostCode,
          billingCountry: BillingAddressState.billingCountry,
        };
        dispatch(saveBillAddress(saveAdd));
        localStorage.setItem("billingpostCode", BillingAddressState.postCode);
      }
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
            error={
              (!validAddress.firstName &&
                BillingAddressState &&
                BillingAddressState.firstName) ||
              BillingAddressState.firstName == ""
            }
            name="firstName"
            // disabled={user && user.firstName ? true : false}
            InputProps={
              !validAddress.firstName || BillingAddressState.firstName == ""
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
            // helperText={
            //   (!validAddress.firstName &&
            //     BillingAddressState &&
            //     BillingAddressState.firstName) ||
            //   BillingAddressState.firstName == ""
            //     ? "Invalid First Name"
            //     : ""
            // }
            helperText={
              !validAddress.firstName &&
              BillingAddressState &&
              BillingAddressState.firstName
                ? "Invalid First Name"
                : BillingAddressState.firstName == ""
                ? "Please Enter First Name"
                : ""
            }
            id="outlined-basic"
            label="First Name"
            onBlur={handleBlurValidation}
            // onKeyUp={handleKeyChange}
            onChange={handleAddressChange}
            // value={user && user.firstName}
            value={BillingAddressState && BillingAddressState.firstName}
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
            onBlur={handleBlurValidation}
            // onKeyUp={handleKeyChange}
            name="lastName"
            InputLabelProps={{ shrink: true }}
            onChange={handleAddressChange}
            required
            error={
              (!validAddress.lastName &&
                BillingAddressState &&
                BillingAddressState.lastName) ||
              BillingAddressState.lastName == ""
            }
            // disabled={user && user.lastName ? true : false}
            helperText={
              !validAddress.lastName &&
              BillingAddressState &&
              BillingAddressState.lastName
                ? "Invalid Last Name"
                : BillingAddressState.lastName == ""
                ? "Please Enter Last Name"
                : ""
            }
            InputProps={
              !validAddress.lastName || BillingAddressState.lastName == ""
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
            // value={user && user.lastName}
            value={BillingAddressState && BillingAddressState.lastName}
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
            error={
              (!validAddress.email &&
                BillingAddressState &&
                BillingAddressState.email) ||
              BillingAddressState.email == ""
            }
            helperText={
              !validAddress.email &&
              BillingAddressState &&
              BillingAddressState.email
                ? "Invalid email address"
                : BillingAddressState.email == ""
                ? "Please Enter Email"
                : ""
            }
            InputProps={
              !validAddress.email || BillingAddressState.email == ""
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
            // disabled={user && user.email ? true : false}
            label="Email Address"
            // value={user && user.email}
            value={BillingAddressState && BillingAddressState.email}
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
            name="phoneNumber"
            InputLabelProps={{ shrink: true }}
            required
            onChange={handleAddressChange}
            // onKeyUp={handleKeyChange}
            error={
              (!validAddress.phoneNumber &&
                BillingAddressState &&
                BillingAddressState.phoneNumber) ||
              BillingAddressState.phoneNumber == ""
            }
            InputProps={
              !validAddress.phoneNumber || BillingAddressState.phoneNumber == ""
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
              BillingAddressState &&
              BillingAddressState.phoneNumber
                ? "Invalid Phone Number"
                : BillingAddressState.phoneNumber == ""
                ? "Please Enter Mobile Number"
                : ""
            }
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            value={BillingAddressState && BillingAddressState.phoneNumber}
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
              apiKey="AIzaSyB3Fp4nW2rKPUav4NJ8Tt0YZGBjikZrhkU"
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
            (validAddress.city === false ||
              validAddress.state === false ||
              validAddress.postCode === false) && (
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
                name="city"
                error={
                  !validAddress.city &&
                  BillingAddressState &&
                  BillingAddressState.billingCity
                }
                helperText={
                  !validAddress.city &&
                  BillingAddressState &&
                  BillingAddressState.billingCity
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
                name="postCode"
                inputProps={{
                  maxlength: 4,
                }}
                error={
                  !validAddress.postCode && BillingAddressState.billingPostCode
                }
                helperText={
                  !validAddress.postCode && BillingAddressState.billingPostCode
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
