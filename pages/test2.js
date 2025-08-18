import React, { useState } from "react";
import { Select, Space } from "antd";
import { endPoint, envUrl } from "../utils/factory";
import { useEffect } from "react";

const Test2 = ({ pageData }) => {
  // console.log("$$$$$$$$$ pageData", pageData);
  let preassemblesData = pageData.data.preassemblesCableData;
  // console.log(preassemblesData);
  const [mainFilterValueCable, setMainFilterValueCable] = useState();
  const [mainFilterOptionsCable, setMainFilterOptionsCable] = useState([]);

  const [firstFilterValueCable, setFirstFilterValueCable] = useState();
  const [firstFilterOptionsCable, setFirstFilterOptionsCable] = useState([]);

  const [secondFilterValueCable, setSecondFilterValueCable] = useState();
  const [secondFilterOptionsCable, setSecondFilterOptionsCable] = useState([]);

  const [thirdFilterValueCable, setThirdFilterValueCable] = useState();
  const [thirdFilterOptionsCable, setThirdFilterOptionsCable] = useState([]);

  const [fourthFilterValueCable, setFourthFilterValueCable] = useState();
  const [fourthFilterOptionsCable, setFourthFilterOptionsCable] = useState([]);

  const [fifthFilterValueCable, setFifthFilterValueCable] = useState();
  const [fifthFilterOptionsCable, setFifthFilterOptionsCable] = useState([]);

  const [sixthFilterValueCable, setSixthFilterValueCable] = useState();
  const [sixthFilterOptionsCable, setSixthFilterOptionsCable] = useState([]);

  const [seventhFilterValueCable, setSeventhFilterValueCable] = useState();
  const [seventhFilterOptionsCable, setSeventhFilterOptionsCable] = useState(
    []
  );
  const [jacketColorValueCable, setJacketColorValueCable] = useState();
  const [jacketColorOptionsCable, setJacketColorOptionsCable] = useState([]);

  // useEffect(() => {
  //   let temp = [];
  //   // temp.push(pageData.preassemblesData[0].main_filter);
  //   for (let i = 0; i < pageData.data.preassemblesData.length; i++) {
  //     if (!temp.includes(pageData.data.preassemblesData[i].main_filter)) {
  //       temp.push(pageData.data.preassemblesData[i].main_filter);
  //     }
  //   }
  //   setMainFilterValueCable(temp[0]);
  //   setMainFilterOptionsCable(temp);
  //   let temp2 = [];
  //   for (let i = 0; i < preassemblesData.length; i++) {
  //     if (preassemblesData[i].main_filter == temp[0]) {
  //       if (!temp2.includes(preassemblesData[i].filter_1)) {
  //         temp2.push(preassemblesData[i].filter_1);
  //       }
  //     }
  //   }
  //   setFirstFilterValueCable(temp2[0]);
  //   setFirstFilterOptionsCable(temp2);
  //   setSecondFilterValueCable(preassemblesData[0].filter_2);
  // }, []);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < pageData.data.preassemblesCableData.length; i++) {
      if (!temp.includes(pageData.data.preassemblesCableData[i].filter_1)) {
        temp.push(pageData.data.preassemblesCableData[i].filter_1);
      }
    }
    setFirstFilterOptionsCable(temp);
  }, []);

  const onMainFilterChangeCable = (value) => {
    setMainFilterValueCable(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (preassemblesData[i].filter_1 == value) {
        if (!temp.includes(preassemblesData[i].filter_2)) {
          temp.push(preassemblesData[i].filter_2);
        }
      }
    }

    setFirstFilterOptionsCable(temp);
  };

  const onFirstFilterChangeCable = (value) => {
    setFirstFilterValueCable(value);
    setSecondFilterValueCable(null);
    setThirdFilterValueCable(null);
    setFourthFilterValueCable(null);
    setFifthFilterValueCable(null);
    setSixthFilterValueCable(null);
    setSeventhFilterValueCable(null);
    setJacketColorValueCable(null);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (preassemblesData[i].filter_1 == value) {
        if (!temp.includes(preassemblesData[i].filter_2)) {
          temp.push(preassemblesData[i].filter_2);
        }
      }
    }

    setSecondFilterOptionsCable(temp);
  };

  const onSecondFilterChangeCable = (value) => {
    setSecondFilterValueCable(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].filter_1 == firstFilterValueCable &&
        preassemblesData[i].filter_2 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_3)) {
          temp.push(preassemblesData[i].filter_3);
        }
      }
    }
    setThirdFilterOptionsCable(temp);
  };

  const onThirdFilterChangeCable = (value) => {
    setThirdFilterValueCable(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].filter_1 == firstFilterValueCable &&
        preassemblesData[i].filter_2 == secondFilterValueCable &&
        preassemblesData[i].filter_3 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_4)) {
          temp.push(preassemblesData[i].filter_4);
        }
      }
    }
    setFourthFilterOptionsCable(temp);
  };
  const onFourthFilterChangeCable = (value) => {
    setFourthFilterValueCable(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].filter_1 == firstFilterValueCable &&
        preassemblesData[i].filter_2 == secondFilterValueCable &&
        preassemblesData[i].filter_3 == thirdFilterValueCable &&
        preassemblesData[i].filter_4 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_5)) {
          temp.push(preassemblesData[i].filter_5);
        }
      }
    }
    setFifthFilterOptionsCable(temp);
    // if (temp[0] == null) {
    //   onFifthFilterChangeCable(null);
    // }
  };
  const onFifthFilterChangeCable = (value) => {
    // console.log("ccccccc called", value);
    setFifthFilterValueCable(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].filter_1 == firstFilterValueCable &&
        preassemblesData[i].filter_2 == secondFilterValueCable &&
        preassemblesData[i].filter_3 == thirdFilterValueCable &&
        preassemblesData[i].filter_4 == fourthFilterValueCable &&
        preassemblesData[i].filter_5 == value
      ) {
        // console.log("inside if");
        if (!temp.includes(preassemblesData[i].filter_6)) {
          temp.push(preassemblesData[i].filter_6);
        }
      }
    }
    setSixthFilterOptionsCable(temp);
    // console.log("tempppppppp", temp);
    // if (temp[0] == null) {
    //   onSixthFilterChangeCable(null);
    //   setSixthFilterOptionsCable([]);
    // }
  };

  const onSixthFilterChangeCable = (value) => {
    setSixthFilterValueCable(value);
    let temp = [];
    let temp2 = [];
    let jacketArray = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].filter_1 == firstFilterValueCable &&
        preassemblesData[i].filter_2 == secondFilterValueCable &&
        preassemblesData[i].filter_3 == thirdFilterValueCable &&
        preassemblesData[i].filter_4 == fourthFilterValueCable &&
        preassemblesData[i].filter_5 == fifthFilterValueCable &&
        preassemblesData[i].filter_6 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_7)) {
          temp.push(preassemblesData[i].filter_7);
        }
        if (!temp2.includes(preassemblesData[i].jacket_colour)) {
          jacketArray = preassemblesData[i].jacket_colour.split(",");
          for (let j = 0; j < jacketArray.length; j++) {
            temp2.push(jacketArray[j]);
          }
          // temp2.push(preassemblesData[i].jacket_colour);
        }
      }
    }
    // console.log("ccccccc called", value);
    // console.log("tempppppppp", temp);
    // console.log("tempppppppp2222222222222", temp2);
    setSeventhFilterOptionsCable(temp);
    setJacketColorOptionsCable(temp2);
  };

  const onSeventhFilterChangeCable = (value) => {
    setSeventhFilterValueCable(value);
  };

  const onJacketColorChangeCable = (value) => {
    setJacketColorValueCable(value);
  };

  // console.log("main Filter -------", mainFilterValueCable);
  //   console.log("main Filter22222222 -------", sixthFilter[mainFilterValueCable][0]);

  return (
    <Space wrap>
      {/* <Select
        style={{
          width: 150,
        }}
        showSearch
        placeholder="Select main filter"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        value={mainFilterValueCable}
        onChange={onMainFilterChangeCable}
        options={mainFilterOptionsCable.map((province) => ({
          label: province,
          value: province,
        }))}
      /> */}
      <Select
        style={{
          width: 200,
        }}
        showSearch
        placeholder="Select first filter"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        // disabled={mainFilterValueCable ? false : true}
        value={firstFilterValueCable}
        onChange={onFirstFilterChangeCable}
        options={firstFilterOptionsCable.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        style={{
          width: 200,
        }}
        showSearch
        placeholder="Select second filter"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        disabled={firstFilterValueCable ? false : true}
        value={secondFilterValueCable}
        onChange={onSecondFilterChangeCable}
        options={secondFilterOptionsCable.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        style={{
          width: 150,
        }}
        showSearch
        placeholder="Select third filter"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        disabled={secondFilterValueCable ? false : true}
        value={thirdFilterValueCable}
        onChange={onThirdFilterChangeCable}
        options={thirdFilterOptionsCable.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        style={{
          width: 150,
        }}
        showSearch
        placeholder="Select fourth filter"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        disabled={thirdFilterValueCable ? false : true}
        value={fourthFilterValueCable}
        onChange={onFourthFilterChangeCable}
        options={fourthFilterOptionsCable.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        style={{
          width: 150,
        }}
        showSearch
        placeholder="Select fifth filter"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        disabled={fourthFilterValueCable ? false : true}
        value={fifthFilterValueCable}
        onChange={onFifthFilterChangeCable}
        options={fifthFilterOptionsCable.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        style={{
          width: 150,
        }}
        showSearch
        placeholder="Select sixth filter"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        disabled={fifthFilterValueCable ? false : true}
        value={sixthFilterValueCable}
        onChange={onSixthFilterChangeCable}
        options={sixthFilterOptionsCable.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      {seventhFilterOptionsCable[0] !== null ? (
        <Select
          style={{
            width: 150,
          }}
          showSearch
          placeholder="Select seventh filter"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          disabled={sixthFilterValueCable ? false : true}
          value={seventhFilterValueCable}
          onChange={onSeventhFilterChangeCable}
          options={seventhFilterOptionsCable.map((province) => ({
            label: province,
            value: province,
          }))}
        />
      ) : null}
      <Select
        style={{
          width: 150,
        }}
        showSearch
        placeholder="Select Jacket Color"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        disabled={sixthFilterValueCable ? false : true}
        value={jacketColorValueCable}
        onChange={onJacketColorChangeCable}
        options={jacketColorOptionsCable.map((province) => ({
          label: province,
          value: province,
        }))}
      />
    </Space>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(`${envUrl.baseUrl}${endPoint.HomePageData}`);

  const pageData = await response.json();
  // console.log("ppppppp pageData", pageData);
  return {
    props: {
      pageData,
    },
  };
}

export default Test2;
