import React, { useState, useEffect, useRef } from "react";
import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import Router from "next/router";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import NaviReducer from "./../store/reducers/NaviReducer";
import cartReducer from "./../store/reducers/cartReducer";
import userReducer from "./../store/reducers/userReducer";
import shippingAddressReducer from "./../store/reducers/shippingAddressReducer";
import billingAddressReducer from "./../store/reducers/billingAddressReducer";
import preassemblesReducer from "../store/reducers/preassembleReducer";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import "nprogress/nprogress.css";
import Loader from "../components/Loader/loader";
import ProductSkeleton from "../components/Product/ProductSkeleton";

const rootReducer = combineReducers({
  NaviReducer: NaviReducer,
  cartReducer: cartReducer,
  userReducer: userReducer,
  shippingAddressReducer: shippingAddressReducer,
  billingAddressReducer: billingAddressReducer,
  preassemblesReducer: preassemblesReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log("RPUTER IN _APP", router);
  console.log("RPUTER IN _APP222", router.pathname == "/[index]");

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     const styleElements = document.querySelectorAll('style[media="x"]');
  //     styleElements.forEach((styleTag) => {
  //       styleTag.removeAttribute("media");
  //     });
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   router.events.on("routeChangeStart", handleRouteChange);
  // }, [router]);
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  const usePreviousRoute = () => {
    const { asPath } = useRouter();

    // const ref = (useRef < string) | (null > null);
    const ref = useRef(null);

    useEffect(() => {
      ref.current = asPath;
    }, [asPath]);

    return ref.current;
  };

  // useState and useEffect to control loading of Universal circular loader

  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   Router.events.on("routeChangeStart", (url) => {
  //     setLoading(true);
  //     // document.body.style="overflow:hidden";
  //   });
  //   Router.events.on("routeChangeComplete", (url) => {
  //     setLoading(false);
  //     // document.body.style="overflow:auto";
  //   });

  //   Router.events.on("routeChangeError", (url) => {
  //     setLoading(false);
  //     // document.body.style="overflow:auto";
  //   });
  // }, [Router]);

  return (
    <>
      {/* {!loading ? (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      ) : (
        <>{router.pathname == "/[index]" ? <ProductSkeleton /> : <Loader />}</>
      )} */}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
