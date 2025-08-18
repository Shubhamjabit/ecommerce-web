import React, { useState, useEffect } from "react";
import styles from "./Contact.module.scss";
import { Row, Col, Form } from "react-bootstrap";
import { CustomButton } from "../shared/Button";
import { Formik } from "formik";
import { CustomTextField } from "../shared/TextFields";
import { CustomTextFieldMobile } from "../shared/TextFieldMobile/index";
import { CustomTextArea } from "../shared/TextArea/index";
import { ContactFormEnquiry } from "../shared/Forms/Validation/Validation";
import { Bars } from "react-loader-spinner";
import Alert from "@mui/material/Alert";
import * as Yup from "yup";
import "yup-phone-lite";
import { endPoint, envUrl } from "../../utils/factory";
import { decryptData } from "../../services/util/customEncryptDecryprt";
import axios from "axios";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ContactForm = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitScucess, setSubmitSuccess] = useState(false);
  console.log("user", user);

  const onSubmit = async (values, resetForm) => {
    values.enquiry_no =
      Date.now() + new Date().toLocaleDateString().replaceAll("/", "");
    const token = decryptData("token");
    values.userid = user ? user.id : -1;
    // values.userid =
    console.log("vvvvvvvvvvvvv", values);
    // return;
    setSubmitLoading(true);
    await axios
      .post(`${envUrl.baseUrl}${endPoint.sendEnquiry}`, values, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then(async function (result) {
        // console.log("rrrrrrrrr", result);
        if (result.status == 200) {
          console.log("result.data.msg = ", result.data.msg);
          await resetForm();
          setSubmitSuccess(true);
        }
      })
      .catch(function (error) {
        console.log("Error in sendEnquiry AXIOS", error);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.headerLine}>Send an Enquiry</h2>
      <Formik
        onSubmit={async (values, { resetForm }) =>
          await onSubmit(values, resetForm)
        }
        initialValues={{
          email: "",
          contact: "",
          subject: "",
          message: "",
          phonenumber: "",
          firstName: "",
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Email invalid")
            .required("Email is required"),
          phonenumber: Yup.string()
            .phone("AU", "Please enter a valid phone number")
            .required("A phone number is required"),
          subject: Yup.string().required("Subject is required"),
          message: Yup.string().required("Message is required"),
        })}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          submitCount,
          isSubmitting,
          resetForm,
        }) => (
          <Form noValidate onSubmit={handleSubmit} loading={isSubmitting}>
            <CustomTextField
              label="Name*"
              classLable="defaultLabel"
              controlId="firstName"
              type="text"
              name="firstName"
              onBlur={handleBlur}
              value={values.firstName || ""} // to resolve the resetform bug which does not clear this field
              classType="defaultTextBox"
              handleOnChange={handleChange}
              errorMessage={errors.firstName}
              isInvalid={
                (errors.firstName && touched.firstName) ||
                (submitCount > 0 && !!errors.firstName)
              }
            />
            <CustomTextField
              label="Email address*"
              classLable="defaultLabel"
              controlId="email"
              type="email"
              value={values.email}
              name="email"
              classType="defaultTextBox"
              handleOnChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.email}
              isInvalid={
                (errors.email && touched.email) ||
                (submitCount > 0 && !!errors.email)
              }
            />
            <CustomTextField
              label="Contact Number*"
              classLable="defaultLabel"
              controlId="phonenumber"
              type="text"
              value={values.phonenumber || ""} // to resolve the resetform bug which does not clear this field
              name="phonenumber"
              classType="defaultTextBox"
              handleOnChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.phonenumber}
              isInvalid={
                (errors.phonenumber && touched.phonenumber) ||
                (submitCount > 0 && !!errors.phonenumber)
              }
            />
            <CustomTextField
              label="Subject*"
              classLable="defaultLabel"
              controlId="subject"
              type="text"
              name="subject"
              value={values.subject}
              classType="defaultTextBox"
              handleOnChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.subject}
              isInvalid={
                (errors.subject && touched.subject) ||
                (submitCount > 0 && !!errors.subject)
              }
            />
            <CustomTextArea
              label="Message*"
              classLable="defaultLabel"
              controlId="message"
              type="text"
              name="message"
              value={values.message}
              onBlur={handleBlur}
              rows={5}
              classType="defaultTextBox"
              handleOnChange={handleChange}
              errorMessage={errors.message}
              isInvalid={
                (errors.message && touched.message) ||
                (submitCount > 0 && !!errors.message)
              }
            />

            <div className={styles.contactSubmitBtn}>
              <Row>
                {submitLoading.toString() === "true" && (
                  <Col sm={4}>
                    <Bars
                      height="80"
                      width="80"
                      color="#2595d4"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </Col>
                )}

                {submitLoading.toString() === "false" &&
                  submitScucess.toString() === "false" && (
                    <Col sm={12}>
                      <CustomButton
                        buttonType="submit"
                        label="submit"
                        type="defaultBtnDark"
                      />
                    </Col>
                  )}
                {submitScucess.toString() === "true" && (
                  <Col sm={12}>
                    <Alert
                      variant="filled"
                      severity="success"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setSubmitSuccess(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      Thank you. Your enquiry has been submitted successfully.
                    </Alert>
                  </Col>
                )}
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
