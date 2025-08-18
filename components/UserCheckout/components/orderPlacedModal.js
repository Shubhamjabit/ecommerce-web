import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Modal } from "react-bootstrap";

const PopUpModal = ({ show, setShow, handleClose, handleShow, data }) => {
  // const [show, setShow] = useState(show);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, [3000]);
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
              <p>Order Placed!</p> <p> Order id: {data[0].orderId}</p>{" "}
              <p> Invoice id: {data[0].invoiceId}</p>{" "}
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
export default PopUpModal;
