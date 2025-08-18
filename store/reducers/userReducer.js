import {
  INIT_USER,
  MANUAL_ADDRESS,
  SAVE_USER,
  VALIDATE_ADDRESS,
  SET_CREDIT_FORMS_LIST,
  TOGGLE_IS_SAME_ADD_CHECKBOX,
  TOGGLE_IS_CREDIT_CHECKBOX,
  SET_DELIVERY_INSTRUCTIONS,
  SAVE_SHIPPING_OPTION,
  SAVE_CREDIT_FORM_JSON,
  TOGGLE_IS_SAME_DETAILS_CHECKBOX,
} from "../actions/userActions";

const initialState = {
  user: null,
  creditFormsList: [],
  isSameAddChecked: false,
  isSameDetailsChecked: false,
  isCreditChecked: false,
  deliveryInstructions: 1,
  shippingOption: {},
  creditFormJson: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USER:
      return { ...state, user: action.user };
    case SAVE_USER:
      console.log("REDUCER", action);
      return { ...state, user: action.data };
    case VALIDATE_ADDRESS:
      console.log("VALIDATE_ADDRESS action.data = ", action.data);
      return { ...state, validateUser: action.data };
    case MANUAL_ADDRESS:
      return { ...state, manualAddress: action.data };
    case SET_CREDIT_FORMS_LIST:
      // console.log(
      //   'manageFilterReducer REDUCER RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
      //   action.data
      // );
      return { ...state, creditFormsList: action.data };
    case TOGGLE_IS_SAME_ADD_CHECKBOX:
      // console.log("rrrrrrrrr action.value = ", action.value);
      return { ...state, isSameAddChecked: action.value };
    case TOGGLE_IS_SAME_DETAILS_CHECKBOX:
      // console.log("rrrrrrrrr action.value = ", action.value);
      return { ...state, isSameDetailsChecked: action.value };
    case TOGGLE_IS_CREDIT_CHECKBOX:
      // console.log("rrrrrrrrr action.value = ", action.value);
      return { ...state, isCreditChecked: action.value };
    case SET_DELIVERY_INSTRUCTIONS:
      // console.log(
      //   "rrrrrrrrr SET_DELIVERY_INSTRUCTIONS action.value = ",
      //   action.value
      // );
      return { ...state, deliveryInstructions: action.value };
    case SAVE_SHIPPING_OPTION:
      console.log(
        "rrrrrrrrr SAVE_SHIPPING_OPTION action.value = ",
        action.value
      );
      return { ...state, shippingOption: action.value };
    case SAVE_CREDIT_FORM_JSON:
      console.log("USER REDUCER SAVE_CREDIT_FORM_JSON", action.value);
      return { ...state, creditFormJson: action.value };
    default:
      return { ...state };
  }
};

export default userReducer;
