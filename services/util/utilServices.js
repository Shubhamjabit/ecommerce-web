const phoneRegExp =
  /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;
const postCodeRegExp =
  /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/;
const firstNameRegExp = /^[a-zA-Z]+$/;
const lastNameRegExp = /^[a-zA-Z]+$/;
const bNameRegExp = /^[a-zA-Z]+$/;
const cityRegExp = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const emailRegExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

export const validateGoogleAddress = (data) => {
  // const googleAddress = { postCode: false, city: false, state: true };
  // doing this to resolve billing add same as shipiing add bug where, checking and then unchecking the box causes invalid city
  const googleAddress = { postCode: false, city: true, state: true };
  console.log("## validateGoogleAddress data = ", data);

  if (
    data.hasOwnProperty("postCode") ||
    data.hasOwnProperty("billingPostCode")
  ) {
    if (!postCodeRegExp.test(data.postCode)) {
      // googleAddress.postCode = false;
      googleAddress.postCode = true;
    } else if (!postCodeRegExp.test(data.billingPostCode)) {
      // googleAddress.postCode = false;
      googleAddress.postCode = true;
    } else {
      googleAddress.postCode = true;
    }
  }
  if (data.city || data.billingCity) {
    console.log("### xcxzcxzxc");
    if (!cityRegExp.test(data.city)) {
      // googleAddress.city = false;
      console.log("### xcxzcxzxc 111");
      googleAddress.city = true;
    } else if (!cityRegExp.test(data.billingCity)) {
      // googleAddress.city = false;
      console.log("### xcxzcxzxc 222");
      googleAddress.city = true;
    } else {
      console.log("### xcxzcxzxc 333");
      googleAddress.city = true;
    }
  }
  if (data.phoneNumber) {
    if (!phoneRegExp.test(data.phoneNumber)) {
      googleAddress.phoneNumber = false;
    } else {
      googleAddress.phoneNumber = true;
    }
  }

  if (data.firstName) {
    // console.log("#### reg", !firstNameRegExp.test(data.firstName));

    if (!firstNameRegExp.test(data.firstName)) {
      googleAddress.firstName = false;
    } else {
      googleAddress.firstName = true;
    }
  }
  if (data.lastName) {
    if (!lastNameRegExp.test(data.lastName)) {
      googleAddress.lastName = false;
    } else {
      googleAddress.lastName = true;
    }
  }

  if (data.bName) {
    if (!bNameRegExp.test(data.bName)) {
      googleAddress.bName = true;
    } else {
      googleAddress.bName = true;
    }
  }
  if (data.email) {
    if (!emailRegExp.test(data.email)) {
      googleAddress.email = false;
    } else {
      googleAddress.email = true;
    }
  }
  return googleAddress;
};

export const validateAddress = (data) => {
  // console.log(' in validation :', data);
  switch (data.name) {
    case "firstName":
      if (!firstNameRegExp.test(data.value)) {
        return false;
      } else {
        return true;
      }
    case "lastName":
      if (!lastNameRegExp.test(data.value)) {
        return false;
      } else {
        return true;
      }
    case "bName":
      if (!bNameRegExp.test(data.value)) {
        return false;
      } else {
        return true;
      }
    case "phoneNumber":
      if (!phoneRegExp.test(data.value)) {
        return false;
      } else {
        return true;
      }
    case "email":
      if (!emailRegExp.test(data.value)) {
        return false;
      } else {
        return true;
      }
    case "postCode":
      if (!postCodeRegExp.test(data.value)) {
        return false;
      } else {
        return true;
      }
    case "city":
      if (!cityRegExp.test(data.value)) {
        return false;
      } else {
        return true;
      }
    default:
      return true;
  }
};
