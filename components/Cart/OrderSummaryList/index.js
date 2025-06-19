import React, { useState, useEffect } from "react";
import { Divider, List, Typography, Space, Row, Col, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { totalOrderCalc } from "../../../store/actions/cartActions";
const { Text } = Typography;

const OrderSummaryList = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((status) => status.cartReducer.cart);
  // console.log("++++++++++++++++++++++++++++++++++ cartData", cartData);
  const orderSummary = useSelector((state) => state.cartReducer.orderSummary);
  // console.log("oooooooooooooo", orderSummary);
  // start - bring order summary useEffect
  const [subAmount, setsubAmount] = useState(orderSummary.subAmount);
  const [totalAmount, setTotalAmount] = useState(orderSummary.totalAmount);
  const [shippingAmount, setShippingAmount] = useState(
    orderSummary.shippingAmount
  );
  const [OSloaddata, setOsLoadData] = useState(false);

  // useEffect(() => {
  //   if (cartData) {
  //     setOsLoadData(true);
  //     setTimeout(() => {
  //       setOsLoadData(false);
  //     }, 2000);
  //   }
  //   let total = 0;

  //   // console.log("#### calculate Amount");
  //   if (cartData && cartData.length > 0) {
  //     for (let index = 0; index < cartData.length; index++) {
  //       total =
  //         parseFloat(total) +
  //         parseFloat(cartData[index].price) * parseFloat(cartData[index].qty);
  //     }

  //     setsubAmount(total);
  //   }
  // }, [cartData]);

  // useEffect(() => {
  //   if (subAmount) {
  //     console.log("$$$$$$$$$$");
  //     setTotalAmount(parseFloat(subAmount) + parseFloat(shippingAmount));
  //     // setTotalAmount(1234567);
  //     // console.log(
  //     //   "subAmount, shippingAmount %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
  //     //   subAmount,
  //     //   shippingAmount
  //     // );
  //     // console.log(
  //     //   "TOTAL AMOUNTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
  //     //   totalAmount
  //     // );
  //     dispatch(
  //       totalOrderCalc({
  //         subAmount: subAmount,
  //         shippingAmount: shippingAmount,
  //         totalAmount: totalAmount,
  //       })
  //     );
  //   }
  // }, [shippingAmount, subAmount]);

  // useEffect(() => {
  //   dispatch(
  //     totalOrderCalc({
  //       subAmount: subAmount,
  //       shippingAmount: shippingAmount,
  //       totalAmount: totalAmount,
  //     })
  //   );
  // }, [totalAmount]);
  // end

  let OrderSummaryListMap = new Map()
    .set("Sub Total", orderSummary?.subAmount)
    // .set("Sub Total", 150)
    .set("Shipping", orderSummary?.shippingAmount)
    .set("TAX", 0)
    .set("Total Amount", orderSummary?.totalAmount);

  // const data = ["Sub Total", "Best Shipping", "TAX", "Total Amount"];
  const data = [...OrderSummaryListMap.keys()];
  // const dataTwo = ["$810.00", "$50.00", "$5.0", "$865"];
  const dataTwo = [...OrderSummaryListMap.values()];
  return (
    <>
      <Space direction="vertical">
        <Row>
          <Col>
            <List
              size="small"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Space>{item}</Space>
                </List.Item>
              )}
            />
          </Col>
          <Col>
            <List
              size="small"
              dataSource={dataTwo}
              renderItem={(item) => (
                <List.Item>
                  <span style={{ fontWeight: "bolder" }}>${item}</span>
                </List.Item>
              )}
            />
          </Col>
          <Col
            style={{
              fontWeight: "bolder",
              display: "flex",
              alignContent: "flex-end",
              flexWrap: "wrap",
              paddingBottom: "3%",
            }}
          >
            <Text>INC. GST</Text>
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default OrderSummaryList;
