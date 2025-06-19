import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Layout } from "../components/Layout/Layout";
import { Container, Row } from "react-bootstrap";
import { FourOhFourUI } from "../components/404";
import { useSelector, useDispatch } from "react-redux";
//import { initializeNavi } from "./../../../../store/actions/NaviActions";
//import { cacheNaviBar } from "../../../../services/naviBarService/naviBarService";
import { initializeNavi } from "../store/actions/NaviActions";
import { cacheNaviBar } from "../services/naviBarService/naviBarService";
export default function FourOhFour() {
  const dispatch = useDispatch();

  useEffect(() => {
    //getSubCategory();
    const getNaviBarData = async () => {
      const data = await cacheNaviBar();
      if (data) {
        dispatch(initializeNavi(data));
      } else {
        dispatch(initializeNavi([]));
      }
    };
    getNaviBarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navi = useSelector((state) => state.NaviReducer.navi);

  return (
    <>
      <Head>
        <title>404</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Layout CategoryData={navi}> */}
      <FourOhFourUI />
      {/* </Layout> */}
    </>
  );
}
