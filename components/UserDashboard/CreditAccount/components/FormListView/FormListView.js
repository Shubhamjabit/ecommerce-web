import React, { useState, useEffect } from "react";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const moment = require("moment");

const downloadFile = (filePath, fileName = "Example-PDF-file.pdf") => {
  console.log("???????????????", process.env.CREDIT_FILES_CDN_URL + filePath);
  fetch(process.env.CREDIT_FILES_CDN_URL + filePath, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      console.log("blob", blob);
      // for some reason this is creating a txt file, so commenting
      // const url = window.URL.createObjectURL(new Blob([blob]));
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      link.parentNode.removeChild(link);
    });
};

function FormListView({ creditFormsList }) {
  return (
    <>
      {creditFormsList && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sno</TableCell>
                <TableCell align="right">Submit Date</TableCell>
                <TableCell align="right">Method</TableCell>
                <TableCell align="right">Download File</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditFormsList &&
                creditFormsList.map((row, index) => (
                  <TableRow
                    key={index + 1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">
                      {moment(row.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                    </TableCell>
                    <TableCell align="right">
                      {row.method == 1 ? "Manual Form" : "E-Form"}
                    </TableCell>
                    {/* <TableCell align="right">{row.file_url}</TableCell> */}
                    <TableCell align="right">
                      {/*to show the PDF URL*/}
                      {/*<Link
                        passHref={true}
                        scroll={true}
                        href={
                          row.file_url
                            ? process.env.CREDIT_FILES_CDN_URL + row.file_url
                            : process.env.CREDIT_FILES_CDN_URL +
                              row.eForm_pdf_url
                        }
                      >
                        <a target="_blank">Click here</a>
                      </Link>*/}
                      {/*Now saving the file to pc. instead of showing in PDF URL*/}
                      <div style={{ paddingLeft: "50%" }}>
                        <Button
                          startIcon={<FileDownloadIcon />}
                          onClick={() =>
                            downloadFile(
                              row.file_url ? row.file_url : row.eForm_pdf_url,
                              "CREDIT_FORM"
                            )
                          }
                        ></Button>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {row.status === 0 && (
                        <Tag
                          icon={<ExclamationCircleOutlined />}
                          color="warning"
                        >
                          pending
                        </Tag>
                      )}
                      {row.status === 2 && (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                          approved
                        </Tag>
                      )}
                      {row.status === 1 && (
                        <Tag icon={<SyncOutlined spin />} color="processing">
                          processing
                        </Tag>
                      )}
                      {row.status === 3 && (
                        <Tag icon={<CloseCircleOutlined />} color="error">
                          rejected
                        </Tag>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {/* <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        /> */}
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default FormListView;
