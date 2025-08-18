import React from 'react';
import {Form} from 'react-bootstrap';
import Styles from './TextArea.module.scss';

export const CustomTextArea = (props) => {
  return (
    <Form.Group controlId={props.name}>
      <Form.Label className={Styles.shippingDetailsFormText}>
        {props.label}
      </Form.Label>
      <Form.Control
        className={`${
          props.classType === 'defaultTextBox' ? Styles.defaultTextBox : ''
        } `}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.handleOnChange}
        name={props.name}
        isInvalid={props.isInvalid}
        value={props.value}
        onBlur={props.onBlur}
        rows={props.rows}
        as="textarea"
        disabled={props.disabled}
      />
      <Form.Control.Feedback type="invalid">
        {props.errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
