import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import styles from "./TextFieldMobile.module.scss";
import Image from "react-bootstrap/Image";
import Link from "next/link";

export const CustomTextFieldMobile = (props) => {
  const handleOnKeyDown = (e) => {
    // console.log("eeeeeeeeeee", e);
    // preventing e in phone number
    if (e.key == "e" || e.key == "-") {
      e.preventDefault();
    }
  };
  const handleOnChange = (e) => {
    // console.log("eeeeeeeeeee", e.target.value.length);
    // if (e.target.value.length > 10) {
    //   return false;
    // }
  };
  const handleOnInput = (e) => {
    console.log("eeeeeeeeeee1111", e.target.value.length);
    // if (e.target.value.length >= 10) {
    //   e.target.value = e.target.value.slice(0, 10);
    // }
  };
  return (
    <Form.Group className={styles.formText} controlId={props.controlId}>
      <Form.Label
        className={`${
          props.classLable === "defaultLabel" ? styles.defaultLabel : ""
        } ${props.classLable === "smallLable" ? styles.smallLable : ""} ${
          props.classLable === "smallLable" ? styles.smallLable : ""
        } ${
          props.classLable === "secoundaryLabel" ? styles.secoundaryLabel : ""
        }  `}
      >
        {props.label}
      </Form.Label>
      <Form.Control
        className={`${
          props.classType === "defaultTextBox" ? styles.defaultTextBox : ""
        } `}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.handleOnChange}
        // onChange={handleOnChange}
        name={props.name}
        isInvalid={props.isInvalid}
        value={props.value}
        onBlur={props.onBlur}
        disabled={props.disabled}
        onKeyDown={handleOnKeyDown}
        onInput={handleOnInput}
      />

      <div>
        <Link passHref={true} scroll={true} href="/changenumber">
          <a>
            <p
              className={`${
                props.actionTag === "defaultActionText"
                  ? styles.defaultActionText
                  : ""
              } ${
                props.actionTag === "largeActionText"
                  ? styles.largeActionText
                  : ""
              } ${
                props.actionTag === "largeActionTextDark"
                  ? styles.largeActionTextDark
                  : ""
              }`}
              onClick={props.handleClick}
            >
              {props.actionName}
            </p>
          </a>
        </Link>
      </div>
      <Form.Control.Feedback type="invalid">
        {props.errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

CustomTextFieldMobile.defaultProps = {
  classType: "defaultTextBox",
};
CustomTextFieldMobile.defaultProps = {
  classLable: "defaultLabel",
};
CustomTextFieldMobile.defaultProps = {
  actionTag: "defaultActionText",
};
