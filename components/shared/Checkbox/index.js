import React from "react";
import styles from "./Checkbox.module.scss";
import { Form } from "react-bootstrap";
import Link from "next/link";

export const CustomCheckbox = (props) => {
  return (
    <Form.Group className={styles.formText} controlId={props.controlId}>
      <Form.Check
        disabled={props}
        className={`
                    ${
                      props.type === "defaultCheckBox"
                        ? styles.defaultCheckBox
                        : ""
                    }
                    ${
                      props.type === "largeCheckBox" ? styles.largeCheckBox : ""
                    }
                    ${
                      props.type === "highlightedLargeCheckBox"
                        ? styles.highlightedLargeCheckBox
                        : ""
                    }
                    ${
                      props.type === "largeCheckBoxShipping"
                        ? styles.largeCheckBoxShipping
                        : ""
                    }
                  `}
        type="checkbox"
      >
        <Form.Check.Input
          onChange={props.handleOnChange}
          type="checkbox"
          isInvalid={props.isInvalid}
        />
        <Form.Check.Label>
          {props.label}{" "}
          {props.link && (
            <Link passHref={true} scroll={true} href={props.link}>
              <a
                target="_blank"
                className={
                  props.isInvalid
                    ? styles.checkBoxLinkTextInvalid
                    : styles.checkBoxLinkText
                }
              >
                {props.linkText}
              </a>
            </Link>
          )}
        </Form.Check.Label>
      </Form.Check>
    </Form.Group>
  );
};

CustomCheckbox.defaultProps = {
  type: "defaultCheckBox",
};
