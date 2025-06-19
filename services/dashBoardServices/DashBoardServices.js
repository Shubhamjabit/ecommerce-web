import { decrypt } from "../util/customEncryptDecryprt";

export const getUser = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  return user;
};
export const getToken = () => {
  var encryptedToken = JSON.parse(localStorage.getItem("token"));
  const decryptedToken = decrypt(process.env.SALT, encryptedToken);
  return decryptedToken;
};
