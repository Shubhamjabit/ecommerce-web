const phoneRegExp =
  /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;
const postCodeRegExp =
  /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/;
const firstNameRegExp = /^[a-zA-Z]+$/;
const lastNameRegExp = /^[a-zA-Z]+$/;
const cityRegExp = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const emailRegExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

export const validateGoogleAddress = (data) => {
  // const googleAddress = {
  //   postCode: false,
  //   city: false,
  //   state: true,
  //   billingFirstName: false,
  //   billingLastName: false,
  //   billingPostCode: false,
  //   billingCity: false,
  //   billingState: true,
  // };
  const googleAddress = { ...data };
  console.log(
    "UTILS validateGoogleAddress input data = 1111111111111111111",
    data
  );

  if (data.hasOwnProperty("postCode")) {
    if (!postCodeRegExp.test(data?.postCode)) {
      googleAddress.postCode = false;
    } else {
      googleAddress.postCode = true;
    }
  }
  if (data.hasOwnProperty("billingPostCode")) {
    if (!postCodeRegExp.test(data?.billingPostCode)) {
      console.log("gggggggg@@@@@@@@@@@@@@44444444 billingPostCode check", data);
      googleAddress.billingPostCode = false;
    } else {
      googleAddress.billingPostCode = true;
    }
  }

  if (data.hasOwnProperty("city")) {
    if (!cityRegExp.test(data?.city)) {
      googleAddress.city = false;
    } else {
      googleAddress.city = true;
    }
  }
  if (data.hasOwnProperty("billingCity")) {
    if (!cityRegExp.test(data?.billingCity)) {
      googleAddress.billingCity = false;
    } else {
      googleAddress.billingCity = true;
    }
  }

  if (data.hasOwnProperty("firstName")) {
    if (!firstNameRegExp.test(data?.firstName)) {
      googleAddress.firstName = false;
    } else {
      googleAddress.firstName = true;
    }
  }
  if (data.hasOwnProperty("billingFirstName")) {
    if (
      !firstNameRegExp.test(data?.billingFirstName) ||
      data?.billingFirstName == null
    ) {
      googleAddress.billingFirstName = false;
    } else {
      googleAddress.billingFirstName = true;
    }
  }

  if (data.hasOwnProperty("lastName")) {
    if (!lastNameRegExp.test(data?.lastName)) {
      googleAddress.lastName = false;
    } else {
      googleAddress.lastName = true;
    }
  }
  if (data.hasOwnProperty("billingLastName")) {
    if (
      !lastNameRegExp.test(data?.billingLastName) ||
      data?.billingLastName == null
    ) {
      googleAddress.billingLastName = false;
    } else {
      googleAddress.billingLastName = true;
    }
  }

  if (data.hasOwnProperty("email")) {
    if (!emailRegExp.test(data?.email)) {
      googleAddress.email = false;
    } else {
      googleAddress.email = true;
    }
  }
  if (data.hasOwnProperty("billingEmail")) {
    if (!emailRegExp.test(data?.billingEmail)) {
      googleAddress.billingEmail = false;
    } else {
      googleAddress.billingEmail = true;
    }
  }

  if (data.hasOwnProperty("phoneNumber")) {
    if (!phoneRegExp.test(data?.phoneNumber)) {
      googleAddress.phoneNumber = false;
    } else {
      googleAddress.phoneNumber = true;
    }
  }
  if (data.hasOwnProperty("billingPhoneNumber")) {
    if (!phoneRegExp.test(data?.billingPhoneNumber)) {
      googleAddress.billingPhoneNumber = false;
    } else {
      googleAddress.billingPhoneNumber = true;
    }
  }

  console.log("UTILS return googleAddress = 2222222222", googleAddress);
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
