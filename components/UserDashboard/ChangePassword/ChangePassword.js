import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "./ChangePassword.module.scss";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import { CustomButton } from "../../shared/Button";
import { getUser } from "./../../../services/dashBoardServices/DashBoardServices";
import { CustomTextFieldPassword } from "../../shared/TextFieldPassword";
import {
  verifyPassword,
  forgotPasswordSubmit,
  signOut,
} from "../../../services/auth/authService";
import { passwordFormValidation } from "../../shared/Forms/Validation/Validation";
import Alert from "@mui/material/Alert";
import { Button, Space } from "antd";
import { Formik, Field } from "formik";
export const ChangePassword = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassError, setOldPassError] = useState("");
  const [missMatchError, setmissMatchError] = useState("");
  const [updatepassword, setUpdatePassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleOldPass = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPass = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
  };
  // const alert = useAlert();

  useEffect(() => {
    setTimeout(() => {
      setUpdatePassword(false);
    }, [5000]);
  }, [updatepassword]);

  const onSubmit = async (values, { resetForm }) => {
    setOldPassError("");
    setSubmitLoading(true);
    // e.preventDefault();
    const user = getUser();
    if (newPassword === confirmPassword) {
      setmissMatchError("");

      const response = await verifyPassword({
        email: user.email,
        password: values.oldpassword,
      });

      if (response && response.state == true) {
        setOldPassError("");
        setSubmitLoading(false);
        // console.log("password verified :", response);
        // actions.resetForm("");
        // resetForm();
        setUpdatePassword(true);
        const updateRes = await forgotPasswordSubmit(
          user.email,
          values.password,
          null,
          "UPDATE_PASSWORD_FROM_LOGIN"
        );
        // console.log("PASS WORD UPDAE:", updateRes);
        // handleStep(1, "Password Changed successfully");

        setSubmitLoading(false);
        signOut();
        // not using this, as this causes redirect to "/" as it reloads
        // router.push("/login", undefined, { shallow: true });
        window.location.replace("/login");
      } else {
        setOldPassError("Invalid old password, Please enter valid password");
        setSubmitLoading(false);
      }
    } else {
      setmissMatchError("Password miss matched with new password");
      setSubmitLoading(false);
    }
  };
  //console.log('aa::' + dateofbirth);

  return (
    <div>
      <Row>
        <Col sm={12}>
          <div style={{ position: "relative" }}>
            <h1 className={styles.topic}>Change Password</h1>
            <hr />
            <div className={styles.divider}></div>
            <Row>
              <Col sm={8}>
                <Formik
                  validationSchema={passwordFormValidation}
                  onSubmit={(values, { resetForm }) =>
                    onSubmit(values, { resetForm })
                  }
                  initialValues={{ terms: false }}
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
                  }) => (
                    <Form
                      noValidate
                      onSubmit={handleSubmit}
                      loading={isSubmitting}
                    >
                      <div className={styles.formBottom}>
                        <CustomTextFieldPassword
                          label="Old password*"
                          classLable="defaultLabel"
                          controlId="oldpassword"
                          name="oldpassword"
                          placeholder="Your old password"
                          classType="defaultTextBox"
                          handleOnChange={handleChange}
                          onBlur={handleBlur}
                          errorMessage={errors.oldpassword}
                          isInvalid={
                            (errors.oldpassword && touched.oldpassword) ||
                            (submitCount > 0 && !!errors.oldpassword)
                          }
                        />
                        <span className={styles.errorText}>{oldPassError}</span>
                      </div>
                      <div className={styles.formBottom}>
                        <CustomTextFieldPassword
                          label="Password*"
                          classLable="defaultLabel"
                          controlId="password"
                          name="password"
                          placeholder="Set password (8-20 characters)"
                          classType="defaultTextBox"
                          handleOnChange={handleChange}
                          onBlur={handleBlur}
                          errorMessage={errors.password}
                          isInvalid={
                            (errors.password && touched.password) ||
                            (submitCount > 0 && !!errors.password)
                          }
                        />
                      </div>
                      <div className={styles.formBottom}>
                        <CustomTextFieldPassword
                          label="Confirm Password*"
                          classLable="defaultLabel"
                          controlId="Confirm-Password"
                          name="passwordConfirmation"
                          placeholder="Re-enter password here"
                          classType="defaultTextBox"
                          handleOnChange={handleChange}
                          onBlur={handleBlur}
                          errorMessage={errors.passwordConfirmation}
                          isInvalid={
                            (errors.passwordConfirmation &&
                              touched.passwordConfirmation) ||
                            (submitCount > 0 && !!errors.passwordConfirmation)
                          }
                        />
                      </div>
                      <Row className={styles.btnRowTop}>
                        <Col sm={12}>
                          {updatepassword && (
                            <Alert severity="success">
                              Your Password has been changed successfully.
                            </Alert>
                          )}
                        </Col>
                      </Row>
                      <Row className={styles.btnRowTop}>
                        <Col sm={12}>
                          {!submitLoading ? (
                            <CustomButton
                              className={styles.CustomButton}
                              buttonType="submit"
                              label="CHANGE PASSWORD"
                              type="defaultBtnDark"
                              disabled={false}
                            />
                          ) : (
                            <Button
                              type="primary"
                              loading
                              className={styles.CustomButton}
                            >
                              Loading
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
