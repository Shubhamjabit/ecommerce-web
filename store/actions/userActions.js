//Action Types
export const INIT_USER = "INIT_USER";
export const SAVE_USER = "SAVE_USER";
export const VALIDATE_ADDRESS = "VALIDATE_ADDRESS";
export const MANUAL_ADDRESS = "MANUAL_ADDRESS";
export const SET_CREDIT_FORMS_LIST = "SET_CREDIT_FORMS_LIST";
export const TOGGLE_IS_SAME_ADD_CHECKBOX = "TOGGLE_IS_SAME_ADD_CHECKBOX";
export const TOGGLE_IS_SAME_DETAILS_CHECKBOX =
  "TOGGLE_IS_SAME_DETAILS_CHECKBOX";
export const TOGGLE_IS_CREDIT_CHECKBOX = "TOGGLE_IS_CREDIT_CHECKBOX";
export const SET_DELIVERY_INSTRUCTIONS = "SET_DELIVERY_INSTRUCTIONS";
export const SAVE_SHIPPING_OPTION = "SAVE_SHIPPING_OPTION";
export const SAVE_CREDIT_FORM_JSON = "SAVE_CREDIT_FORM_JSON";
//Action Creator

export const initUser = () => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return { type: INIT_USER, user: user };
};

export const validateAddressAction = (data) => {
  console.log("validObj validateAddressAction", data);
  return { type: VALIDATE_ADDRESS, data };
};

export const manualAddressAction = (data) => {
  return { type: MANUAL_ADDRESS, data };
};
export const saveUser = (data) => {
  if (data.shoppingAddressList && data.shoppingAddressList.length > 0) {
    const notNullAddress = data.shoppingAddressList.filter((add) => {
      if (
        add.city !== null &&
        add.state !== null &&
        add.postCode !== null &&
        add.email !== null
      ) {
        return add;
      }
    });
    // console.log(" NOT NULL ADDRESS LIST :", notNullAddress);
    // localStorage.setItem('shoppingAddressList', JSON.stringify(notNullAddress));
  }
  localStorage.setItem("user", JSON.stringify(data));
  // console.log("$$$$$$$$$$$$$$$$$ ACTION CALLED", data);
  return { type: SAVE_USER, data: data };
};

export const setCreditFormsList = (data) => {
  // console.log('setManageFilterData ACTION CALLED :', data);
  return { type: SET_CREDIT_FORMS_LIST, data: data };
};

export const toggleIsSameAddCheckBox = (value) => {
  return { type: TOGGLE_IS_SAME_ADD_CHECKBOX, value: value };
};
export const toggleIsSameDetailsCheckBox = (value) => {
  return { type: TOGGLE_IS_SAME_DETAILS_CHECKBOX, value: value };
};
export const toggleIsCreditCheckBox = (value) => {
  return { type: TOGGLE_IS_CREDIT_CHECKBOX, value: value };
};
export const setDeliveryInstructions = (value) => {
  return { type: SET_DELIVERY_INSTRUCTIONS, value: value };
};
export const saveShippingOption = (valueObj) => {
  return { type: SAVE_SHIPPING_OPTION, value: valueObj };
};
export const saveCreditFormJson = (valueObj) => {
  return { type: SAVE_CREDIT_FORM_JSON, value: valueObj };
};
