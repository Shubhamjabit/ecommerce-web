import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "./ForgotPasswordCodeVerify.module.scss";
import { CustomButton } from "../../shared/Button";
import { CustomTextField } from "../../shared/TextFields";
import { Formik } from "formik";
import * as yup from "yup";

import {
  getVerifyMail,
  setVerifyCode,
} from "./../../../services/auth/authService";

export const CodeVerify = (props) => {
  // console.log("CodeVerify", props);
  const schema = yup.object({
    email: yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    setVerifyCode(values.email);
    nextStep();
  };

  // const [nextStep] = useMutation(updateFrogotPasswordStepMutation, {
  //   update(cache, { data }) {
  //     cache.writeQuery({
  //       query: FrogotPasswordStepQuery,
  //       data: {
  //         forgotPasswordstep: 3,
  //       },
  //     });
  //   },
  // });
  // const [previousStep] = useMutation(updateFrogotPasswordStepMutation, {
  //   update(cache, { data }) {
  //     cache.writeQuery({
  //       query: FrogotPasswordStepQuery,
  //       data: {
  //         forgotPasswordstep: 1,
  //       },
  //     });
  //   },
  // });
  return (
    <Row className={styles.ForgotPasswordBackgroundColor}>
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <div className={styles.forgotPasswordBox}>
              <Container className={styles.innerBoxContainer}>
                <Row>
                  <Col>
                    <h3 className={styles.boxTopic}>Password Reset</h3>
                  </Col>
                  <Col
                    sm={{ span: 2, offset: 3 }}
                    className={styles.colAlignRight}
                  >
                    <div onClick={() => previousStep()}>
                      <svg
                        width="35px"
                        height="35px"
                        viewBox="0 0 16 16"
                        className="bi bi-x"
                        fill="#707070"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                        />
                      </svg>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className={styles.colDescription}>
                    <p>
                      {`Enter the verification code that we send to your
                      ****${getVerifyMail()}`}
                    </p>
                  </Col>
                </Row>
                <Form>
                  <Formik
                    validationSchema={schema}
                    onSubmit={(values) => onSubmit(values)}
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
                      <Form noValidate onSubmit={handleSubmit}>
                        <CustomTextField
                          label="Verification code*"
                          classLable="defaultLabel"
                          type="number"
                          name="email"
                          classType="defaultTextBox"
                          handleOnChange={handleChange}
                          onBlur={handleBlur}
                          errorMessage={errors.email}
                          isInvalid={
                            (submitCount > 0 && errors.email) ||
                            (errors.email && touched.email)
                          }
                        />

                        <Row>
                          <Col sm={5} className={styles.loginBtnCol}>
                            <CustomButton
                              label="PROCEED"
                              type="defaultBtnDarkInactive"
                            />
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Form>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};
