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
    let pathname = "/" + router.query.index;
    if (router.query.indextwo) {
      pathname += "/" + router.query.indextwo;
    }

     const newQuery = {
      ...router.query,
      page: value,
    };

    router.push(
      {
        pathname,
        query: newQuery,
      },
      undefined,
      {
        shallow: false,
        scroll: true,
      }
    );

    handlePagination(value);
  };

   const getPageTotal = (totalPosts, pageSize) => {
    const remainder = totalPosts % pageSize;
    return remainder === 0
      ? totalPosts / pageSize
      : Math.floor(totalPosts / pageSize) + 1;
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