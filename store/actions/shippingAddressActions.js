//Action Types
export const ADD_NEW_ADDRESS = "ADD_NEW_ADDRESS";
export const INIT_ADDRESS_LIST = "INIT_ADDRESS_LIST";
export const REMOVE_ADDRESS = "REMOVE_ADDRESS";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const SELECT_ADDRESS = "SELECT_ADDRESS";
export const EDIT_ADDRESS = "EDIT_ADDRESS";
export const EDIT_CANCEL_ADDRESS = "EDIT_CANCEL_ADDRESS";
export const EDIT_CHECK = "EDIT_CHECK";
export const ADD_CHECK = "ADD_CHECK";
export const FILTER_ADDRESS = "FILTER_ADDRESS";
export const SHIPPING_COST = "SHIPPING_COST";
export const ADDRESS_WITHOUT_USER = "ADDRESS_WITHOUT_USER";
export const SET_ERROR_NO_SHIPPING_ADD = "SET_ERROR_NO_SHIPPING_ADD";
export const SET_LOADING = "SET_LOADING";
export const SAVE_ADDRESS = "SAVE_ADDRESS";
export const SAVE_GOOGLE_ADDRESS = "SAVE_GOOGLE_ADDRESS";
export const SAVE_EMAIL = "SAVE_EMAIL";
export const setLoading = (data) => {
  return {
    type: SET_LOADING,
    data,
  };
};

export const addAddressWithoutUser = (address) => {
  return {
    type: ADDRESS_WITHOUT_USER,
    AddressWithoutUser: address,
  };
};

export const setErrorOnShippingAddress = (data) => {
  // console.log("dispatching no error :", data);
  return {
    type: SET_ERROR_NO_SHIPPING_ADD,
    error_no_shipping_add: data,
  };
};
export const initAddressList = () => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  let AddressList = [];
  let selectAddress = null;
  if (user) {
    AddressList = JSON.parse(localStorage.getItem("shoppingAddressList"))
      ? JSON.parse(localStorage.getItem("shoppingAddressList"))
      : [];
    if (AddressList.length > 0) {
      AddressList.map((item) => {
        if (item.default === true) {
          selectAddress = item;
        }
      });
    }
  }

  return {
    type: INIT_ADDRESS_LIST,
    AddressList: AddressList,
    selectAddress,
    user: user,
  };
};

export const saveAddress = (Address) => {
  // const AddressList = JSON.parse(localStorage.getItem('shoppingAddressList'))
  //   ? JSON.parse(localStorage.getItem('shoppingAddressList'))
  //   : [];
  const newList = [Address];
  // console.log(
  //   " Address at shippingAddressActions SAVE_ADDRESS address action 22222222222222222:",
  //   newList
  // );
  localStorage.setItem("shoppingAddressList", JSON.stringify(newList));
  return { type: SAVE_ADDRESS, AddressList: newList };
};

export const saveGoogleAddress = (Address) => {
  // const AddressList = JSON.parse(localStorage.getItem('shoppingAddressList'))
  //   ? JSON.parse(localStorage.getItem('shoppingAddressList'))
  //   : [];
  const newList = [Address];
  // console.log(' Address at SAVE_ADDRESS address action :', newList);
  localStorage.setItem("saveAddress", JSON.stringify(newList));
  return { type: SAVE_GOOGLE_ADDRESS, AddressList: newList };
};
export const saveEmail = (email) => {
  // const AddressList = JSON.parse(localStorage.getItem('shoppingAddressList'))
  //   ? JSON.parse(localStorage.getItem('shoppingAddressList'))s
  //   : [];
  // console.log(' Address at SAVE_ADDRESS address action :', newList);
  localStorage.setItem("saveEmail", JSON.stringify(email));
  return { type: SAVE_EMAIL, EmailAddress: email };
};

export const getSavedAddress = () => {
  let addressList = JSON.parse(localStorage.getItem("shoppingAddressList"));
  return {
    type: GET_SAVED_ADDRESS,
    AddressList: addressList,
  };
};

export const addNewAddress = (Address) => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  const AddressList = JSON.parse(localStorage.getItem("shoppingAddressList"))
    ? JSON.parse(localStorage.getItem("shoppingAddressList"))
    : [];
  const newList = [...AddressList, Address];
  localStorage.setItem("shoppingAddressList", JSON.stringify(newList));
  return { type: ADD_NEW_ADDRESS, AddressList: newList, user: user };
};

export const removeAddress = (Address) => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  var tempAddress = JSON.parse(localStorage.getItem("shoppingAddressList"));
  const length = tempAddress.length;
  if (length === 1) {
    localStorage.removeItem("shoppingAddressList");
    tempAddress = [];
  } else {
    var removeIndex = tempAddress
      .map((item) => item.address_id)
      .indexOf(Address.address_id);
    tempAddress.splice(removeIndex, 1);
    localStorage.setItem("shoppingAddressList", JSON.stringify(tempAddress));
  }
  return { type: REMOVE_ADDRESS, AddressList: tempAddress, user: user };
};

export const updateAddress = (Address) => {
  var newList = [];
  try {
    const user = JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : [];
    var tempAddress = JSON.parse(localStorage.getItem("shoppingAddressList"));
    var removeIndex = tempAddress
      .map((item) => item.address_id)
      .indexOf(Address.address_id);
    tempAddress.splice(removeIndex, 1);

    newList = [...tempAddress, Address];
    localStorage.setItem("shoppingAddressList", JSON.stringify(newList));
  } catch (error) {
    console.error("eroor updating address");
  }
  return { type: UPDATE_ADDRESS, AddressList: newList, user: "user" };
};

export const selectAddress = (Address) => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  let selectedAddress = null;
  let addressList = JSON.parse(localStorage.getItem("shoppingAddressList"));
  addressList.map((item) => {
    if (item.address_id === Address.address_id) {
      item.default = true;
      selectedAddress = item;
    } else {
      item.default = false;
    }
  });
  localStorage.setItem("shoppingAddressList", JSON.stringify(addressList));
  return {
    type: SELECT_ADDRESS,
    AddressList: addressList,
    user: user,
    selectedAddress: selectedAddress,
  };
};

export const loadselectAddress = () => {
  const addressList = JSON.parse(localStorage.getItem("shoppingAddressList"));
  if (!addressList || addressList < 1) {
    return null;
  }
  const results = addressList.filter((address) => address.default);
  return results.length > 0 ? results[0] : null;
};

export const editAddress = (Address) => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  let addressList = JSON.parse(localStorage.getItem("shoppingAddressList"));
  addressList.map((item) => {
    if (item.address_id === Address.address_id) {
      item.edit = true;
    } else {
      item.edit = false;
    }
  });
  localStorage.setItem("shoppingAddressList", JSON.stringify(addressList));
  return { type: EDIT_ADDRESS, AddressList: addressList, user: user };
};

export const editCancelAddress = () => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  let addressList = JSON.parse(localStorage.getItem("shoppingAddressList"));
  addressList.map((item) => {
    item.edit = true;
  });
  localStorage.setItem("shoppingAddressList", JSON.stringify(addressList));
  return { type: EDIT_CANCEL_ADDRESS, AddressList: addressList, user: user };
};

export const checkEditOpen = (edit) => {
  return { type: EDIT_CHECK, edit: edit };
};
export const checkAddNew = (addNew) => {
  return { type: ADD_CHECK, addNew: addNew };
};

export const cartError = (e) => {
  return { type: "ERROR", error: e };
};
