import { Container, Row, Col } from "react-bootstrap";
import styles from "./CreditDetails.module.scss";
import React, { useState, useEffect } from "react";
import { Button, Checkbox, DatePicker, Form, Empty, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("230320231235", "Aug 22, 2020", "Pending", "$3000", "View"),
  createData("230320231235", "Aug 22, 2020", "Approved", "$3000", "View"),
  createData("230320231235", "Aug 22, 2020", "Pending", "$3000", "View"),
  createData("230320231235", "Aug 22, 2020", "On Hold", "$3000", "View"),
  createData("230320231235", "Aug 22, 2020", "Pending", "$3000", "View"),
];
export const CreditDetails = ({ isCreditIns, setIsCreditIns }) => {
  const [form] = Form.useForm();

  //console.log('aa::' + dateofbirth);
  const handleApply = () => {
    setIsCreditIns(!isCreditIns);
  };
  return (
    <div>
      <Row>
        <Col sm={12}>
          <div className={styles.CreditBoxContainer}>
            <h1 className={styles.topic}>Credit Details</h1>
            <hr />
            <div className={styles.divider}></div>

            <div className={styles.CreditInfoBox}>
              <div className={styles.Box}>
                <p>{`You’re currently not a Credit Member, click on the button below to apply`}</p>
                <button onClick={handleApply}>Apply for Credit </button>
              </div>
            </div>
            {/* <div className={styles.NoData}>
              <Empty />
            </div> */}
            {/* <TableContainer className={styles.OrderTableContainer}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};
