import {
  ADD_NEW_ADDRESS,
  INIT_ADDRESS_LIST,
  REMOVE_ADDRESS,
  UPDATE_ADDRESS,
  SELECT_ADDRESS,
  EDIT_ADDRESS,
  EDIT_CANCEL_ADDRESS,
  EDIT_CHECK,
  ADD_CHECK,
  FILTER_ADDRESS,
  SHIPPING_COST,
  ADDRESS_WITHOUT_USER,
  SET_ERROR_NO_SHIPPING_ADD,
  SET_LOADING,
  SAVE_BILL_ADDRESS,
  SAVE_GOOGLE_ADDRESS,
  SAVE_EMAIL,
} from "../actions/billingAddressActions";

const initialState = {
  AddressList: [],
  loading: false,
  edit: false,
  addNew: false,
  selectedAddress: null,
  error: null,
  shippingCostData: {},
  AddressWithoutUser: null,
  error_no_shipping_add: false,
  loading: false,
  savedEmailAddress: null,
};
const billingAddressReducer = (state = initialState, action) => {
  // console.log(' shipping reducer called :', action);
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.data };
    case SET_ERROR_NO_SHIPPING_ADD:
      return { ...state, error_no_shipping_add: action.error_no_shipping_add };
    case ADDRESS_WITHOUT_USER:
      return { ...state, AddressWithoutUser: action.AddressWithoutUser };
    case INIT_ADDRESS_LIST:
      return {
        ...state,
        AddressList: action.AddressList,
        selectedAddress: action.selectAddress,
      };
    case SAVE_BILL_ADDRESS:
      console.log("bbbbbbbbb SAVE_ADDRESS address in reducer :", action);
      return {
        ...state,
        AddressList: action.AddressList,
        savedBillAddress: action.AddressList,
      };
    case SAVE_GOOGLE_ADDRESS:
      // console.log(' SAVE_ADDRESS address in reducer :', action);
      return {
        ...state,
        AddressList: action.AddressList,
        savedGoogleAddress: action.AddressList,
      };
    case SAVE_EMAIL:
      // console.log(' SAVE_ADDRESS address in reducer :', action);
      return {
        ...state,
        EmailAddress: action.EmailAddress,
        savedEmailAddress: action.EmailAddress,
      };
    case ADD_NEW_ADDRESS:
      return { ...state, AddressList: action.AddressList };
    case REMOVE_ADDRESS:
      return { ...state, AddressList: action.AddressList };
    case UPDATE_ADDRESS:
      return { ...state, AddressList: action.AddressList };
    case EDIT_ADDRESS:
      return { ...state, AddressList: action.AddressList };
    case SELECT_ADDRESS:
      return {
        ...state,
        AddressList: action.AddressList,
        selectedAddress: action.selectedAddress,
      };
    case FILTER_ADDRESS:
      return {
        ...state,
        selectedAddress: action.selectedAddress,
      };
    case EDIT_CANCEL_ADDRESS:
      return { ...state, AddressList: action.AddressList };
    case EDIT_CHECK:
      return { ...state, edit: action.edit };
    case ADD_CHECK:
      return { ...state, addNew: action.addNew };
    case SHIPPING_COST:
      return { ...state, shippingCostData: action.shippingCostData };
    case "ERROR":
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default billingAddressReducer;
