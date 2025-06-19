import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Modal } from "react-bootstrap";

const PopUpModalForCreditPayment = ({
  show,
  setShow,
  handleClose,
  handleShow,
  data,
}) => {
  // const [show, setShow] = useState(show);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, [8000]);
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "220px" }}
        >
          {data.length > 0 ? (
            <div>
              <p>Credit Due Paid!</p> <p> Amount Paid: {data[0].amountPaid}</p>{" "}
              {/* <p> Invoice id: {data[0].invoiceId}</p>{" "} */}
              <p> Email id: {data[0].emailid}</p>
            </div>
          ) : (
            <p>Order Failed!</p>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default PopUpModalForCreditPayment;
