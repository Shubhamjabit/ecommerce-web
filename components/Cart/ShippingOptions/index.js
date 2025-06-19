import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  Typography,
  Space,
  Row,
  Col,
  Button,
  Radio,
  Skeleton,
} from "antd";
import {
  totalOrderCalc,
  updateShippingAmount,
} from "../../../store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { endPoint, envUrl } from "../../../utils/factory";
import {
  saveShippingOption,
  validateAddressAction,
} from "../../../store/actions/userActions";

const ShippingOptions = () => {
  const dispatch = useDispatch();
  const shippingAddress = useSelector(
    (state) => state.shippingAddressReducer.savedAddress
  );
  console.log(
    "SHIPPING OPTIONS INDEX 111111111111 shippingAddress = ",
    shippingAddress
  );
  const billingAddress = useSelector(
    (state) => state.billingAddressReducer.savedBillAddress
  );
  // console.log("^^^^^^^^^^^^^ shippingAddress", shippingAddress);
  // console.log("^^^^^^^^^^^^^222222222222 billingAddress", billingAddress);

  const validateUser = useSelector((state) => state.userReducer.validateUser);
  const orderSummary = useSelector((state) => state.cartReducer.orderSummary);
  const [shippingOptionsList, setShippingOptionsList] = useState([]);
  // console.log(
  //   "^^^^^^^^^^^^^3333333333 shippingOptionsList",
  //   shippingOptionsList
  // );
  const [shippingOptionsListLoading, setShippingOptionsListLoading] =
    useState(true);
  const [value, setValue] = useState(-1);

  var json_response = [];
  const getShippingCharges = async () => {
    setShippingOptionsListLoading(true);
    dispatch(validateAddressAction(false));
    if (!shippingAddress || shippingAddress[0].postCode == "") {
      return;
    }
    const jsonForAPI = {
      type: "QUOTE_CN",
      client: "TRICAB",
      sender_code: "TRICAB",
      carrier: "TLM",
      service: "ALL",
      sender_postcode: "3062",
      receiver_postcode: shippingAddress && shippingAddress[0]?.postCode,
      sender_suburb: "PORT MELBOURNE",
      receiver_suburb: "BLACKTOWN",
      total_items: orderSummary.totalItems,
      total_pallets: orderSummary.totalPallets,
      total_weight: orderSummary.totalWeight,
      total_cubic: orderSummary.totalCBM,
      show_cheapest_quote: "N",
      rate_unit: "CARTON",
    };
    // console.log("RRRRRRRRRRRRRRRRRR1111111111111111", jsonForAPI);
    // return;
    await axios
      .post(`${envUrl.baseUrl}${endPoint.getShippingCharges}`, jsonForAPI, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        // console.log(
        //   "response from server after place order =============>1",
        //   response
        // );
        // console.log("!!!!!!!!!!!!!!!!!!!!",response.data.data)
        // console.log(
        //   "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR",
        //   response.data
        // );
        // console.log(
        //   "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR4444444444444444444",
        //   typeof response.data.data
        // );
        // console.log(
        //   "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR5555555555555",
        //   response.data.data
        // );
        const formatResponse = JSON.parse(response.data.data.split("=")[2]);

        console.log(
          "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR66666666",
          formatResponse
        );
        json_response = formatResponse;
        shippingOptions();
      })
      .catch((error) => {
        console.log("API error in TLM_SAVIY_SHIPPING_API :::::", error);
        return error;
      })
      .finally(() => {
        setShippingOptionsListLoading(false);
        if (billingAddress && billingAddress[0].billingStreetAddress != "") {
          dispatch(validateAddressAction(true));
        }
      });
  };

  // const json_response = [
  //   {
  //     carrier: "TLM_AUSSIEFAST",
  //     eta: "1",
  //     cost: "86.67",
  //     service: "EX",
  //     fuel_levy: "0",
  //   },
  //   {
  //     carrier: "TLM_AUSSIEFAST",
  //     eta: "1",
  //     cost: "86.67",
  //     service: "XP",
  //     fuel_levy: "0",
  //   },
  //   {
  //     carrier: "TLM_AUSSIEFAST",
  //     eta: "1",
  //     cost: "86.67",
  //     service: "EX",
  //     fuel_levy: "0",
  //   },
  //   {
  //     carrier: "TLM_AUSSIEFAST",
  //     eta: "1",
  //     cost: "86.67",
  //     service: "XP",
  //     fuel_levy: "0",
  //   },
  //   {
  //     carrier: "TLM_HITRANS",
  //     eta: "2",
  //     cost: "73.57",
  //     service: "G",
  //     fuel_levy: "0",
  //   },
  //   {
  //     carrier: "TLM_HITRANS",
  //     eta: "1",
  //     cost: "71.50",
  //     service: "X",
  //     fuel_levy: "0",
  //   },
  //   {
  //     carrier: "TLM_IPEC_COMMON",
  //     eta: "1",
  //     cost: "19.30",
  //     service: "ROAD",
  //     fuel_levy: "0",
  //   },
  //   {
  //     carrier: "TLM_PRIORITY_COMMON",
  //     eta: "1",
  //     cost: "37.87",
  //     service: "PARCELS OVERNIGHT",
  //     fuel_levy: "0",
  //   },
  // ];

  const shippingOptions = () => {
    // if total options are <=3 only, no need of sorting
    if (json_response.length <= 3) {
      setShippingOptionsList(json_response);
      // set default value of shipping options
      setValue(json_response[0].cost);
      // show shipping amount in order summary
      dispatch(updateShippingAmount(parseFloat(json_response[0].cost)));
      dispatch(saveShippingOption(json_response[0]));
    } else {
      // if total options are more than 3, then sorting for chapest first, ETA first and average
      var ShippingChargesCheapestFirst = json_response.sort((a, b) => {
        return a.cost - b.cost;
      });
      var ShippingChargesETAFirst = json_response.sort((a, b) => {
        return a.eta - b.eta;
      });
      // console.log(
      //   "============= ShippingChargesCheapestFirst",
      //   ShippingChargesCheapestFirst
      // );
      // console.log(
      //   "=============111111111 ShippingChargesETAFirst",
      //   ShippingChargesETAFirst
      // );
      var o = ShippingChargesETAFirst[0];
      if (
        ShippingChargesCheapestFirst[0].eta == ShippingChargesETAFirst[0].eta
      ) {
        o = ShippingChargesETAFirst[1];
      }
      var p =
        ShippingChargesETAFirst[parseInt(ShippingChargesETAFirst.length / 2)];
      if (ShippingChargesETAFirst[0].eta == p.eta) {
        p =
          ShippingChargesETAFirst[
            parseInt(ShippingChargesETAFirst.length / 2) + 1
          ];
      }
      var x = [ShippingChargesCheapestFirst[0], o, p];

      // remove undefined values
      var ShippingOptionsList = x.filter((ele) => {
        return ele !== undefined;
      });
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>> ShippingOptionsList (no state)",
        ShippingOptionsList
      );
      setShippingOptionsList(ShippingOptionsList);
    }

    // set default value of shipping options
    setValue(ShippingOptionsList[0].cost);
    // show shipping amount in order summary
    dispatch(updateShippingAmount(parseFloat(ShippingOptionsList[0].cost)));
    dispatch(saveShippingOption(ShippingOptionsList[0]));
  };

  useEffect(() => {
    getShippingCharges();
  }, [shippingAddress && shippingAddress[0].postCode]);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
    // setShippingAmount(e.target.value);
    dispatch(updateShippingAmount(parseFloat(e.target.value)));
    const save = shippingOptionsList.filter((item) => {
      return item.cost == e.target.value;
    });
    // console.log("$$$$$ save", save[0]);
    dispatch(saveShippingOption(save[0]));
    // dispatch(
    //   totalOrderCalc({
    //     subAmount: subAmount,
    //     shippingAmount: e.target.value,
    //     totalAmount: totalAmount,
    //   })
    // );
  };

  return (
    <>
      <Space
        direction="vertical"
        style={{
          display: "flex",
        }}
      >
        <Row>
          <Button type="primary">See Shipping Options</Button>
        </Row>
        {/* <Divider /> */}
        {shippingAddress && shippingAddress[0].postCode !== "" ? (
          <>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{ paddingLeft: "9%", fontWeight: "bolder" }}
            >
              <Col className="gutter-row" span={12}>
                <span
                  style={{
                    // paddingLeft: "23%",
                    fontWeight: "bolder",
                    // textAlign: "center",
                    // fontSize: "16px",
                  }}
                >
                  Carrier
                </span>
              </Col>
              <Col className="gutter-row" span={6}>
                <span
                  style={{
                    paddingLeft: "10%",
                    fontWeight: "bolder",
                    // textAlign: "center",
                    // fontSize: "16px",
                  }}
                >
                  Cost
                </span>
              </Col>
              <Col className="gutter-row" span={6}>
                <span
                  style={{
                    // paddingLeft: "23%",
                    fontWeight: "bolder",
                    // textAlign: "center",
                    // fontSize: "16px",
                  }}
                >
                  ETA
                </span>
              </Col>
            </Row>
            <Skeleton loading={shippingOptionsListLoading} active>
              <Row>
                <Radio.Group
                  onChange={onChange}
                  value={value}
                  style={{ width: "100%" }}
                >
                  <List
                    // itemLayout="vertical"
                    size="small"
                    dataSource={shippingOptionsList}
                    renderItem={(item, index) => (
                      <>
                        {/* <Skeleton loading={shippingOptionsListLoading} active> */}
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                          <List.Item key={index} style={{ width: "100%" }}>
                            <Col
                              className="gutter-row"
                              span={12}
                              // style={{ wordWrap: "break-word" }}
                            >
                              <Radio
                                value={item.cost}
                                style={{ width: "100%" }}
                              >
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "550",
                                  }}
                                >
                                  {item.carrier}
                                </span>
                              </Radio>
                            </Col>
                            <Col className="gutter-row" span={7}>
                              <span
                                style={{
                                  fontWeight: "bolder",
                                  // paddingLeft: "0 !important",
                                }}
                              >
                                ${item.cost}
                              </span>
                            </Col>
                            <Col className="gutter-row" span={5}>
                              <span
                                style={{
                                  fontWeight: "bolder",
                                }}
                              >
                                {item.eta} days
                              </span>
                            </Col>
                          </List.Item>
                        </Row>
                        {/* </Skeleton> */}
                      </>
                    )}
                  />
                </Radio.Group>
                {/* <Col>
              <List
                size="small"
                dataSource={dataTwo}
                renderItem={(item, index) => (
                  <List.Item>
                    <span style={{ fontWeight: "bolder" }}>${item}</span>
                  </List.Item>
                )}
              />
            </Col> */}
              </Row>
            </Skeleton>
          </>
        ) : (
          <span style={{ color: "#F44336" }}>Enter Delivery address</span>
        )}
      </Space>
    </>
  );
};

export default ShippingOptions;
