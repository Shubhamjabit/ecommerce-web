import React from "react";

const product = ({ data }) => {
  // console.log("&&&&&&&&&&& data", data);
  return <div> {data.product}</div>;
};

export default product;

export async function getServerSideProps(context) {
  let params = context.params;
  let data = params;
  // console.log("&&&&&&&&&&&5555555555 data in Product", data);
  return {
    props: { data },
  };
}
