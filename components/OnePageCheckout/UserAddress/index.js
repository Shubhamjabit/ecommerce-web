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
  saveAddress,
  saveGoogleAddress,
  saveEmail,
} from "../../../store/actions/shippingAddressActions";
import { checkEmailExist } from "../../../services/auth/authService";

function UserAddress({ handleValidStreetAddress }) {
  const user = useSelector((state) => state.userReducer.user);
  // const cart = useSelector((i) => i.cartReducer.cart);
  const dispatch = useDispatch();
  const [emailCheckStatus, setEmailCheckStatus] = React.useState(true);
  const [emailstatus, setEmailCheck] = React.useState();
  const [enteremail, SetEnterEmail] = React.useState();
  const [addressState, setAddressState] = React.useState({});
  const [googlePlace, setGooglePlace] = React.useState("");
  const [streetaddresvalid, setStreetAddress] = React.useState("");
  const [validAddress, setValidAddress] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    postcode: false,
    city: false,
    state: false,
  });

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

      if (tempAddress.length > 0) {
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

        const validObj = validateGoogleAddress(savedUserAddress);

        setValidAddress({ ...validAddress, ...validObj });
      }
    }
  }, [user]);

  const handleRemoveAddress = () => {
    const placeAdd = {
      streetAddress: "",
      city: "",
      postcode: "",
      state: "",
    };
    //console.log('loadaddress =============== 4');
    setAddressState({ ...addressState, ...placeAdd });
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
    for (let i in addressState) {
      if (addressState[i] !== "" || addressState[i] !== undefined) {
        addressStatus = true;
      } else {
        break;
      }
    }
    if (addressStatus) {
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
    //console.log('loadaddress =============== 5');
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
      for (let valid in validAddress) {
        if (validAddress[valid] === false) {
          validRst = false;
          break;
        }
      }
      // console.log(
      //   "validRst postcode :",
      //   validRst,
      //   "validAddress :",
      //   validAddress
      // );
      if (emailstatus && emailstatus.userRes.email !== "") {
        dispatch(validateAddressAction(false));
      } else {
        dispatch(validateAddressAction(validRst));
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
      const placeAdd = {
        streetAddress: googlePlace.formatted_address,
        city: suburb.length > 0 ? suburb[0].short_name : "",
        postCode: postCode.length > 0 ? postCode[0].long_name : "",
        state: state.length > 0 ? state[0].short_name : "",
      };
      localStorage.setItem(
        "postCode",
        postCode.length > 0 ? postCode[0].long_name : 3000
      );
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      // console.log("place select goog 1-----", googlePlace);

      dispatch(saveGoogleAddress(googlePlace));
      setAddressState({ ...addressState, ...placeAdd });

      const validObj = validateGoogleAddress(placeAdd);

      setValidAddress({ ...validAddress, ...validObj });
      // console.log("validstateUser from validstate after:", eval(loggedInUser));
      if (loggedInUser) {
        loggedInUser.streetAddress = googlePlace.formatted_address;
        loggedInUser.city = suburb.length > 0 ? suburb[0].long_name : "";
        loggedInUser.postcode =
          postCode.length > 0 ? postCode[0].long_name : "";
        loggedInUser.state = state.length > 0 ? state[0].short_name : "";
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem(
          "shoppingAddressList",
          "[" + JSON.stringify(loggedInUser) + "]"
        );
        localStorage.setItem("postCode", loggedInUser.postcode);

        dispatch(initUser());
      }
    }
  }, [googlePlace]);

  return (
    <Grid className={Styles.userAddressSection}>
      <Typography
        variant="h5"
        component="h2"
        className={Styles.CheckoutPageTitle}
      >
        Address
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
          {/* i3 bk */}
          <Paper
            className={
              streetaddresvalid === 0
                ? Styles.googleAddressBoxInvalid
                : Styles.googleAddressBox
            }
            onBlur={handleBlurValidation}
          >
            <Autocomplete
              id="outlined-basic"
              variant="outlined"
              apiKey="AIzaSyB3Fp4nW2rKPUav4NJ8Tt0YZGBjikZrhkU"
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
              validAddress.postcode === false) && (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "0.80rem",
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
                name="postcode"
                inputProps={{
                  maxlength: 4,
                }}
                error={!validAddress.postcode && addressState.postcode}
                helperText={
                  !validAddress.postcode && addressState.postcode
                    ? "Invalid Post Code"
                    : ""
                }
                InputProps={
                  !validAddress.postcode
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
    </Grid>
  );
}

export default UserAddress;
