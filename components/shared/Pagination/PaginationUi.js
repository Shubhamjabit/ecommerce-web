import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { getParameters } from "../../../data/Data";
import PaginationItem from "@mui/material/PaginationItem";
//import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowBackIcon from "@mui/icons-material//ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect } from "react";

export default function PaginationUi({
  page,
  totalPosts,
  handlePagination,
  pageSize,
}) {
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.page) {
      // console.log("")
      handlePagination(parseInt(router.query.page));
    } else {
      handlePagination(1);
    }
  }, [router?.query]);

  const handleChange = (event, value) => {
    console.log("rrrrrrrrr handleChange", value);
    let indexPath = "/" + router.query.index;
    if (router.query.indextwo) {
      indexPath = "/" + router.query.index + "/" + router.query.indextwo;
    }

    let pathWithParameters =
      indexPath +
      "?page=" +
      value +
      getParameters({ query: router.query, skip: "page" });

    console.log("rrrrrrrrrrrr pathWithParameters", pathWithParameters);

    router.push(pathWithParameters, undefined, {
      shallow: false,
      scroll: true,
    });

    handlePagination(value);
  };

  const getPageTotal = (totalPosts, pageSize) => {
    const r = totalPosts % pageSize;
    if (r == 0) {
      return totalPosts / pageSize;
    } else {
      return parseInt(totalPosts / pageSize) + 1;
    }
  };
  return (
    <div>
      <Pagination
        count={getPageTotal(totalPosts, pageSize)}
        page={page}
        className="Pagination"
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}

        //variant="outlined"
      />
    </div>
  );
}
