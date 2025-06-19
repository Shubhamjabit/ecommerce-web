import React from "react";
import { Form, Col } from "react-bootstrap";
import Styles from "./TextFields.module.scss";

export const CustomTextSetector = ({
  errors,
  onChange,
  value,
  isInvalid,
  options,
  label,
  id,
  onBlur,
  labelStyle,
  controlStyle,
}) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label
        className={labelStyle ? labelStyle : Styles.shippingDetailsFormText}
      >
        {label}
      </Form.Label>
      <Form.Control
        as="select"
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        className={
          controlStyle ? controlStyle : Styles.shippingDetailsFormControll
        }
        isInvalid={isInvalid}
      >
        <option value="">{`--None--`}</option>
        {/* {!value ? (
          <option value="">{`select the ${id}`}</option>
        ) : (
          <option value={value}>{value}</option>
        )} */}
        {options &&
          options.map((option, i) => (
            <option value={option.name} key={i}>
              {option.name}
            </option>
          ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
    </Form.Group>
  );
};
