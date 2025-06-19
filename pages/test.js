import React, { useState } from "react";
import { Select, Space } from "antd";
import { endPoint, envUrl } from "../utils/factory";
const mainFilterData = ["Copper_lug", "Plug"];
const firstFilterData = {
  Copper_lug: ["Straight Barrel"],
  Plug: ["Straight Extension"],
};
const secondFilterData = {
  Copper_lug: ["1.5 mm²", "2.5 mm²"],
  Plug: ["Round Pin"],
};
const thirdFilterData = {
  Copper_lug: ["M5 Stud∅", "M6 Stud∅", "M4 Stud∅"],
  Plug: ["3 Pin", "4 Pin"],
};
const fourthFilterData = {
  Copper_lug: ["18mm Barrel", "20mm Barrel"],
  Plug: ["10 Amp", "20 Amp", "32 Amp"],
};
const fifthFilterData = {
  Copper_lug: ["8mm Width", "10mm Width"],
  Plug: ["250 Volt", "500 Volt"],
};
const sixthFilterData = {
  Copper_lug: [null, null, null],
  Plug: ["1 Phase", "3 Phase"],
};
const seventhFilterData = {
  Copper_lug: [null, null, null],
  Plug: [null, null, null],
};
const Test = () => {
  const [mainFilter, setMainFilter] = useState(mainFilterData[0]);
  const [firstFilterOptions, setFirstFilterOptions] = useState(
    firstFilterData[mainFilterData[0]]
  );
  const [firstFilter, setFirstFilter] = useState(
    firstFilterData[mainFilterData[0]][0]
  );

  const [secondFilterOptions, setSecondFilterOptions] = useState(
    secondFilterData[mainFilterData[0]]
  );
  const [secondFilter, setSecondFilter] = useState(
    secondFilterData[mainFilterData[0]][0]
  );

  const [thirdFilterOptions, setThirdFilterOptions] = useState(
    thirdFilterData[mainFilterData[0]]
  );
  const [thirdFilter, setThirdFilter] = useState(
    thirdFilterData[mainFilterData[0]][0]
  );

  const [fourthFilterOptions, setFourthFilterOptions] = useState(
    fourthFilterData[mainFilterData[0]]
  );
  const [fourthFilter, setFourthFilter] = useState(
    fourthFilterData[mainFilterData[0]][0]
  );

  const [fifthFilterOptions, setFifthFilterOptions] = useState(
    fifthFilterData[mainFilterData[0]]
  );
  const [fifthFilter, setfifthFilter] = useState(
    fifthFilterData[mainFilterData[0]][0]
  );

  const [sixthFilterOptions, setSixthFilterOptions] = useState(
    sixthFilterData[mainFilterData[0]]
  );
  const [sixthFilter, setSixthFilter] = useState(
    sixthFilterData[mainFilterData[0]][0]
  );

  const [seventhFilterOptions, setSeventhFilterOptions] = useState(
    seventhFilterData[mainFilterData[0]]
  );
  const [seventhFilter, setSeventhFilter] = useState(
    seventhFilterData[mainFilterData[0]][0]
  );

  const handleProvinceChange = (value) => {
    setMainFilter(value);

    setFirstFilterOptions(firstFilterData[value]);
    setFirstFilter(firstFilterData[value][0]);

    setThirdFilterOptions(thirdFilterData[value]);
    setThirdFilter(thirdFilterData[value][0]);

    setFourthFilterOptions(fourthFilterData[value]);
    setFourthFilter(fourthFilterData[value][0]);

    setFifthFilterOptions(fifthFilterData[value]);
    setfifthFilter(fifthFilterData[value][0]);

    setSixthFilterOptions(sixthFilterData[value]);
    setSixthFilter(sixthFilterData[value][0]);

    setSeventhFilterOptions(seventhFilterData[value]);
    setSeventhFilter(seventhFilterData[value][0]);
  };

  const onFirstFilterChange = (value) => {
    setFirstFilter(value);
  };

  const onSecondFilterChange = (value) => {
    setSecondFilter(value);
  };

  const onThirdFilterChange = (value) => {
    setThirdFilter(value);
  };
  const onFourthFilterChange = (value) => {
    setFourthFilter(value);
  };
  const onFifthFilterChange = (value) => {
    setfifthFilter(value);
  };
  const onSixthFilterChange = (value) => {
    setSixthFilter(value);
  };
  const onSeventhFilterChange = (value) => {
    setSeventhFilter(value);
  };
  // console.log("main Filter -------", mainFilter);
  //   console.log("main Filter22222222 -------", sixthFilter[mainFilter][0]);
  return (
    <Space wrap>
      <Select
        // defaultValue={mainFilterData[0] && mainFilterData[0].replace("_", " ")}
        style={{
          width: 120,
        }}
        value={mainFilter}
        onChange={handleProvinceChange}
        options={mainFilterData.map((province) => ({
          label: province && province.replace("_", " "),
          value: province,
        }))}
      />
      <Select
        style={{
          width: 200,
        }}
        value={firstFilter}
        onChange={onFirstFilterChange}
        options={firstFilterOptions.map((city) => ({
          label: city,
          value: city,
        }))}
      />
      <Select
        style={{
          width: 200,
        }}
        value={secondFilter}
        onChange={onSecondFilterChange}
        options={secondFilterOptions.map((city) => ({
          label: city,
          value: city,
        }))}
      />
      <Select
        style={{
          width: 200,
        }}
        value={thirdFilter}
        onChange={onThirdFilterChange}
        options={thirdFilterOptions.map((city) => ({
          label: city,
          value: city,
        }))}
      />
      <Select
        style={{
          width: 200,
        }}
        value={fourthFilter}
        onChange={onFourthFilterChange}
        options={fourthFilterOptions.map((city) => ({
          label: city,
          value: city,
        }))}
      />
      <Select
        style={{
          width: 200,
        }}
        value={fifthFilter}
        onChange={onFifthFilterChange}
        options={fifthFilterOptions.map((city) => ({
          label: city,
          value: city,
        }))}
      />
      {sixthFilterData[mainFilter][0] !== null ? (
        <Select
          style={{
            width: 200,
          }}
          value={sixthFilter}
          onChange={onSixthFilterChange}
          options={sixthFilterOptions.map((city) => ({
            label: city,
            value: city,
          }))}
        />
      ) : null}
      {seventhFilterData[mainFilter][0] !== null ? (
        <Select
          style={{
            width: 200,
          }}
          value={seventhFilter}
          onChange={onSeventhFilterChange}
          options={seventhFilterOptions.map((city) => ({
            label: city,
            value: city,
          }))}
        />
      ) : null}
    </Space>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(`${envUrl.baseUrl}${endPoint.webCategory}`);

  const pageData = await response.json();

  return {
    props: {
      pageData,
    },
  };
}

export default Test;
