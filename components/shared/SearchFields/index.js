import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import styles from "./TextFields.module.scss";

export const SearchField = (props) => {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  useEffect(() => {
    onButtonClick();
  }, []);
  return (
    <Form.Group controlId={props.controlId}>
      <Form.Control
        className={styles.defaultTextBox}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.handleOnChange}
        name={props.name}
        isInvalid={props.isInvalid}
        value={props.value}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onKeyUp={props.onKeyUp}
        ref={inputEl}
      />
      <div>
        <a>
          <p className={styles.defaultActionText} onClick={props.handleClick}>
            {props.actionName}
          </p>
        </a>
      </div>
    </Form.Group>
  );
};
