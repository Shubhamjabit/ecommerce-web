import axios from "axios";
import { endPoint, envUrl } from "../../utils/factory";
import {
  getToken,
  getUser,
} from "../../services/dashBoardServices/DashBoardServices";
import { crypt, decryptData, encryptData } from "../util/customEncryptDecryprt";
export const signUp = async (user) => {
  try {
    console.log("user : : :  :", user);
    // return;
    const resData = await axios.post(
      `${envUrl.baseUrl}${endPoint.register}`,
      user,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(" rest from sign up :", resData.data);
    return resData.data;
  } catch (error) {
    let errorMsg = { state: false, message: error.message };
    if (error.message.includes("code 409")) {
      errorMsg = { state: false, message: "User Already Exist" };
    }
    return errorMsg;
  }
};
export const signIn = async (user) => {
  {
    try {
      // console.log(" user : : :  :", user);
      const resData = await axios.post(
        `${envUrl.baseUrl}${endPoint.login}`,
        user,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let logggedInUser = resData.data;
      let loggedInRes = { state: false, message: "" };
      console.log("sign in resData =  ", resData);
      if (logggedInUser.data.status === 200) {
        const userInfo = logggedInUser.data.user; //; data.attributes;
        localStorage.setItem("user", JSON.stringify(userInfo[0]));
        localStorage.setItem("loginstatus", "1");
        localStorage.setItem("shoppingAddressList", JSON.stringify([]));
        localStorage.setItem("BillingshoppingAddressList", JSON.stringify([]));
        // const encryptedToken = crypt(
        //   process.env.SALT,
        //   resData.headers.authorization
        // );
        encryptData("token", resData.headers.authorization);
        // localStorage.setItem("token", JSON.stringify(encryptedToken));
        loggedInRes.state = true;
        loggedInRes.user = userInfo;
        loggedInRes.message = logggedInUser.data.message;
      } else {
        loggedInRes.state = false;
        loggedInRes.message = logggedInUser.data.message;
      }

      return loggedInRes;
    } catch (error) {
      console.error("error signIn:", error.message);

      console.log("error signIn:", error);
      return { state: false, message: error.message };
    }
  }
};

export const verifyPassword = async (user) => {
  try {
    // console.log(" user to verify :", user);
    const resData = await axios.post(
      // 'https://ec2.koalacyrus.com/auth/login',
      `${envUrl.baseUrl}${endPoint.login}`,
      user,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    let logggedInUser = resData.data;
    let loggedInRes = { state: false, message: "" };
    // console.log("logged in user member ", logggedInUser.data);
    if (logggedInUser.data.status === 200) {
      loggedInRes = { state: true, message: "success" };
    }
    return loggedInRes;
  } catch (e) {
    console.log("exception :", e);
  }
};

export const forgotPasswordSubmit = async (
  email,
  password,
  resetToken,
  type
) => {
  try {
    console.log(
      "FORGET PASS CALLED :",
      email,
      "pass :",
      password,
      "type",
      type
    );
    if (type == "RESET_PASSWORD") {
      // verify the reset token first
      // return await axios
      //   .post(
      //     `${envUrl.baseUrl}${endPoint.verifyTokens}`,
      //     { token: resetToken, type: type },
      //     {
      //       headers: {
      //         "Access-Control-Allow-Origin": "*",
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   )
      //   .then(async function (response) {
      //     console.log(
      //       "verifyTokens in forgotPasswordSubmit response",
      //       response
      //     );
      //     if (response.status == 200) {
      return await axios
        .post(
          `${envUrl.baseUrl}${endPoint.updatePasswordFromResetLink}`,
          { email, password, token: resetToken, type: type },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (resetData) {
          console.log("reset data is 11111:", resetData.data);
          return resetData.data;
        })
        .catch((error) => {
          console.log("API error in updatePassword 1111 :::::", error);
          return {
            state: false,
            message: "Incorrect or Expired Link! Please try again",
          };
        });
      //   }
      // })
      // .catch((error) => {
      //   console.log("API error in verifyToken :::::", error);
      //   throw new Error(
      //     "Api error",
      //     JSON.stringify({
      //       state: false,
      //       message: "Link Expired or Invalid, please try again!",
      //     })
      //   );
      //   // return {
      //   //   state: false,
      //   //   message: "Link Expired or Invalid, please try again!",
      //   // };
      // })
      // .finally(() => {});
    } else if (type == "UPDATE_PASSWORD_FROM_LOGIN") {
      const token = decryptData("token");
      console.log(" token getUserDetailsFromDB: : :  :", token);
      const resetData = await axios.post(
        `${envUrl.baseUrl}${endPoint.updatePassword}`,
        { email, password },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(" reset data is 2222:", resetData.data);
      return resetData.data;
    }
  } catch (error) {
    console.log("API error in updatePassword 222 :::::", error);
    return { state: false, message: error.message };
  }
};

export const signOut = async () => {
  try {
    // await Auth.signOut();
    const user = getUser();
    // localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("shoppingAddressList");
    localStorage.removeItem("saveAddress");
    localStorage.removeItem("saveEmail");
    localStorage.removeItem("token");
    localStorage.setItem("loginstatus", "0");

    const resetData = await axios.post(
      `${envUrl.baseUrl}${endPoint.logout}`,
      { email: user.email },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("logout is :", resetData.data);
  } catch (error) {
    console.error("error signout:", error);
  }
};

export const checkEmailExist = async (email) => {
  try {
    // console.log(" email is at auth service :", email);
    const resetData = await axios.post(
      `${envUrl.baseUrl}${endPoint.validateEmail}`,
      { email },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(" reset data is :", resetData.data);
    return resetData.data;
  } catch (error) {
    console.error("error forgotPassword:", error);
    return { state: false, message: error.message };
  }
};

export const forgotPassword = async (email) => {
  try {
    const resetData = await axios.post(
      `${envUrl.baseUrl}${endPoint.resetPassword}`,
      { email },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(" reset data is :", resetData.data);
    return resetData.data;
  } catch (error) {
    console.error("error forgotPassword:", error);
    return { state: false, message: error.message };
  }
};

export const getUserDetailsFromDB = async (user) => {
  {
    try {
      const token = decryptData("token");
      console.log(" token getUserDetailsFromDB: : :  :", token);
      const resData = await axios.post(
        `${envUrl.baseUrl}${endPoint.getUserDetailsFromDB}`,
        user,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("getUserDetailsFromDB resData = ", resData);
      let logggedInUser = resData.data;
      let loggedInRes = { state: false, message: "" };
      // console.log("logged in user member ", logggedInUser);
      if (logggedInUser.data.status === 200) {
        const userInfo = logggedInUser.data.user; //; data.attributes;
        localStorage.setItem("user", JSON.stringify(userInfo[0]));
        // localStorage.setItem("shoppingAddressList", JSON.stringify([]));
        // localStorage.setItem("BillingshoppingAddressList", JSON.stringify([]));
        loggedInRes.state = true;
        loggedInRes.user = userInfo;
        loggedInRes.message = logggedInUser.data.message;
      } else {
        loggedInRes.state = false;
        loggedInRes.message = logggedInUser.data.message;
      }

      return loggedInRes;
    } catch (error) {
      console.error("error getUserDetailsFromDB:", error.message);

      console.log("error getUserDetailsFromDB:", error);
      return { state: false, message: error.message };
    }
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signUp,
  signIn,
  verifyPassword,
  forgotPasswordSubmit,
  signOut,
  checkEmailExist,
  forgotPassword,
  getUserDetailsFromDB,
};
