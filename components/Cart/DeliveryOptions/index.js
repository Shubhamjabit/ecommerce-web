import React, { useState } from "react";
import Link from "next/link";
import { Button, Row, Space, Typography, Input, Radio } from "antd";
import { useDispatch } from "react-redux";
import { setDeliveryInstructions } from "../../../store/actions/userActions";

const DeliveryOptions = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    dispatch(setDeliveryInstructions(e.target.value));
  };
  return (
    <>
      <Space direction="vertical">
        <Row>
          <Button type="primary">See Delivery Options</Button>
        </Row>
        <Row>
          <Typography>
            Your cart contains backordered items. How would you like them
            shipped?
          </Typography>
        </Row>
        <Row>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>
                Wait until all items are in stock. (1 Shipment)
              </Radio>
              <Radio value={2}>
                Send items as they become available. (Multiple Shipments)
              </Radio>
            </Space>
          </Radio.Group>
          {/* <Typography>
            By submitting your order you agree to these{" "}
            <Link>terms and conditions</Link>
          </Typography> */}
        </Row>
      </Space>
    </>
  );
};

export default DeliveryOptions;
