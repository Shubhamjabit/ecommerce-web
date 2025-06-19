import * as yup from "yup";

const phoneRegExp =
  /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/;

const passwordLogin = yup
  .string()
  .min(8, "Minimum length is 8")
  .matches(
    passwordRegExp,
    "least one uppercase letter, one lowercase letter, one number and one special character:"
  )
  .required("Required");
const firstName = yup.string().required("Required");
const lastName = yup.string().required("Required");
const email = yup.string().email("Invalid email").required("Required");

const phone = yup
  .string()
  .required("Required")
  .matches(phoneRegExp, "Invalid phone number");
const state = yup.string().required("Required");
const companyName = yup.string().required("Required");
export const LoginFormValidation = yup.object({
  email: email,
  password: yup.string().required("Required"),
});
export const createAccountFormValidation = yup.object({
  email: email,
  emailConfirmation: yup
    .string()
    .oneOf([yup.ref("email"), null], "Emails must match")
    .required("Required"),
  password: passwordLogin,
  passwordConfirmation: yup
    .string()
    .min(8, "Minimum length is 8")
    .matches(
      passwordRegExp,
      "least one uppercase letter, one lowercase letter, one number and one special character:"
    )
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  state: state,
  companyName: companyName,
  terms: yup.bool().oneOf([true], "Must Accept Terms and Conditions"),
});
export const passwordFormValidation = yup.object({
  oldpassword: firstName,
  password: passwordLogin,
  passwordConfirmation: yup
    .string()
    .min(8, "Minimum length is 8")
    .matches(
      passwordRegExp,
      "least one uppercase letter, one lowercase letter, one number and one special character:"
    )
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
export const ResetPasswordValidation = yup.object({
  password: passwordLogin,
  passwordConfirmation: yup
    .string()
    .min(8, "Minimum length is 8")
    .matches(
      passwordRegExp,
      "least one uppercase letter, one lowercase letter, one number and one special character:"
    )
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
