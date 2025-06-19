import React, { useState, useRef, useEffect } from "react";
import { Input, Select, Space, Button, Tooltip } from "antd";
import { Container } from "react-bootstrap";
import styles from "./Styles/ItemConstomization.module.scss";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Grid } from "@mui/material";
import Link from "next/link";
import { endPoint, envUrl } from "../../utils/factory";
import { useDispatch } from "react-redux";
import {
  setHeatSinkImage,
  setPreassembleCable,
  setPreassembleTerminalT1,
  setPreassembleTerminalT2,
} from "../../store/actions/preassembleActions";

const { Option } = Select;
function ItemCustomization({ data, cableData }) {
  const dispatch = useDispatch();
  //State Declartion for Cable
  let preassemblesData = data;

  const [mainFilterValue, setMainFilterValue] = useState();
  console.log("cccc mainFilterValue", mainFilterValue);
  const [mainFilterOptions, setMainFilterOptions] = useState([]);

  const [firstFilterValue, setFirstFilterValue] = useState();
  const [firstFilterOptions, setFirstFilterOptions] = useState([]);

  const [secondFilterValue, setSecondFilterValue] = useState();
  const [secondFilterOptions, setSecondFilterOptions] = useState([]);

  const [thirdFilterValue, setThirdFilterValue] = useState();
  const [thirdFilterOptions, setThirdFilterOptions] = useState([]);

  const [fourthFilterValue, setFourthFilterValue] = useState();
  const [fourthFilterOptions, setFourthFilterOptions] = useState([]);

  const [fifthFilterValue, setFifthFilterValue] = useState();
  const [fifthFilterOptions, setFifthFilterOptions] = useState([]);

  const [sixthFilterValue, setSixthFilterValue] = useState();
  const [sixthFilterOptions, setSixthFilterOptions] = useState([]);

  const [seventhFilterValue, setSeventhFilterValue] = useState();
  const [seventhFilterOptions, setSeventhFilterOptions] = useState([]);

  const [mainFilterValueT2, setMainFilterValueT2] = useState();
  const [mainFilterOptionsT2, setMainFilterOptionsT2] = useState([]);

  const [firstFilterValueT2, setFirstFilterValueT2] = useState();
  const [firstFilterOptionsT2, setFirstFilterOptionsT2] = useState([]);

  const [secondFilterValueT2, setSecondFilterValueT2] = useState();
  const [secondFilterOptionsT2, setSecondFilterOptionsT2] = useState([]);

  const [thirdFilterValueT2, setThirdFilterValueT2] = useState();
  const [thirdFilterOptionsT2, setThirdFilterOptionsT2] = useState([]);

  const [fourthFilterValueT2, setFourthFilterValueT2] = useState();
  const [fourthFilterOptionsT2, setFourthFilterOptionsT2] = useState([]);

  const [fifthFilterValueT2, setFifthFilterValueT2] = useState();
  const [fifthFilterOptionsT2, setFifthFilterOptionsT2] = useState([]);

  const [sixthFilterValueT2, setSixthFilterValueT2] = useState();
  const [sixthFilterOptionsT2, setSixthFilterOptionsT2] = useState([]);

  const [seventhFilterValueT2, setSeventhFilterValueT2] = useState();
  const [seventhFilterOptionsT2, setSeventhFilterOptionsT2] = useState([]);

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

  const [imageT1, setImageT1] = useState();
  const [imageT2, setImageT2] = useState();
  const [heatSinkImageT1, setHeatSinkImageT1] = useState();
  // console.log("@@@@@@ heatSinkImageT1", heatSinkImageT1);
  const [heatSinkImageT2, setHeatSinkImageT2] = useState();

  const [sparkyIdT1, setSparkyIdT1] = useState(null);
  const [priceT1, setPriceT1] = useState();
  const [assemblyChargesT1, setAssemblyChargesT1] = useState();

  const [sparkyIdT2, setSparkyIdT2] = useState(null);
  const [priceT2, setPriceT2] = useState();
  const [assemblyChargesT2, setAssemblyChargesT2] = useState();

  const [sparkyIdCable, setSparkyIdCable] = useState(null);
  const [pricingPerMeterCable, setPricingPerMeterCable] = useState();

  const [partNoT1, setPartNoT1] = useState();
  const [partNoT2, setPartNoT2] = useState();
  const [partNoCable, setPartNoCable] = useState();

  const [isValidT1, setIsValidT1] = useState(false);
  const [isValidT2, setIsValidT2] = useState(false);
  const [isValidCable, setIsValidCable] = useState(false);

  const [visible, setVisible] = useState();

  const [tooltipTitle, setTooltipTitle] = useState("");

  const [isTerminalOnePartNumberDisabled, setIsTerminalOnePartNumberDisabled] =
    useState(false);
  const [isTerminalTwoPartNumberDisabled, setIsTerminalTwoPartNumberDisabled] =
    useState(false);
  const [isCablePartNumberDisabled, setIsCablePartNumberDisabled] =
    useState(false);
  useEffect(() => {
    // console.log("triggerrrrrrrrrrr", isValidT1);
    // console.log("triggerrrrrrrrrrr2222", isValidT2);
    // console.log("triggerrrrrrrrrrr333", isValidCable);
    if (!isValidT1) {
      setTooltipTitle("Please Select Terminal 1");
    } else if (!isValidT2) {
      setTooltipTitle("Please Select Terminal 2");
    } else if (!isValidCable) {
      setTooltipTitle("Please Select Cable");
    } else if (isValidT1 && isValidT2 && isValidCable) {
      setTooltipTitle(null);
    }
  }, [
    jacketColorValueCable,
    partNoT1,
    partNoT2,
    isValidT1,
    isValidT2,
    isValidCable,
  ]);

  useEffect(() => {
    let temp = [];
    let temp2 = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (!temp.includes(preassemblesData[i].main_filter)) {
        temp.push(preassemblesData[i].main_filter);
      }
      if (!temp2.includes(cableData[i].filter_1)) {
        temp2.push(cableData[i].filter_1);
      }
    }
    setMainFilterOptions(temp);
    setMainFilterOptionsT2(temp);
    setFirstFilterOptionsCable(temp2);
  }, []);
  const strictSub = (a, b) => a?.split(" ").includes(b);
  useEffect(() => {
    if (strictSub(mainFilterValue?.toLowerCase(), "lug")) {
      setHeatSinkImageT1(true);
    } else {
      setHeatSinkImageT1(false);
    }
    if (strictSub(mainFilterValueT2?.toLowerCase(), "lug")) {
      setHeatSinkImageT2(true);
    } else {
      setHeatSinkImageT2(false);
    }
  }, [mainFilterValue, mainFilterValueT2]);

  const onMainFilterChange = (value) => {
    setMainFilterValue(value);
    setFirstFilterValue(null);
    setSecondFilterValue(null);
    setThirdFilterValue(null);
    setFourthFilterValue(null);
    setFifthFilterValue(null);
    setSixthFilterValue(null);
    setSeventhFilterValue(null);
    setImageT1(null);
    setPartNoT1(null);
    setIsValidT1(false);
    setIsTerminalOnePartNumberDisabled(true);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (preassemblesData[i].main_filter == value) {
        if (!temp.includes(preassemblesData[i].filter_1)) {
          temp.push(preassemblesData[i].filter_1);
        }
      }
    }

    setFirstFilterOptions(temp);
  };

  const onFirstFilterChange = (value) => {
    setFirstFilterValue(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValue &&
        preassemblesData[i].filter_1 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_2)) {
          temp.push(preassemblesData[i].filter_2);
        }
      }
    }

    setSecondFilterOptions(temp);
  };

  const onSecondFilterChange = (value) => {
    setSecondFilterValue(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValue &&
        preassemblesData[i].filter_1 == firstFilterValue &&
        preassemblesData[i].filter_2 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_3)) {
          temp.push(preassemblesData[i].filter_3);
        }
      }
    }
    setThirdFilterOptions(temp);
  };

  const onThirdFilterChange = (value) => {
    setThirdFilterValue(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValue &&
        preassemblesData[i].filter_1 == firstFilterValue &&
        preassemblesData[i].filter_2 == secondFilterValue &&
        preassemblesData[i].filter_3 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_4)) {
          temp.push(preassemblesData[i].filter_4);
        }
      }
    }
    setFourthFilterOptions(temp);
  };
  const onFourthFilterChange = (value) => {
    setFourthFilterValue(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValue &&
        preassemblesData[i].filter_1 == firstFilterValue &&
        preassemblesData[i].filter_2 == secondFilterValue &&
        preassemblesData[i].filter_3 == thirdFilterValue &&
        preassemblesData[i].filter_4 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_5)) {
          temp.push(preassemblesData[i].filter_5);
        }
      }
    }
    setFifthFilterOptions(temp);
  };
  const onFifthFilterChange = (value) => {
    setFifthFilterValue(value);
    let temp = [];
    let temp2 = [];
    let heatSinkColorArray = [];
    console.log("@@@@@@@@ preassemblesData", preassemblesData);
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValue &&
        preassemblesData[i].filter_1 == firstFilterValue &&
        preassemblesData[i].filter_2 == secondFilterValue &&
        preassemblesData[i].filter_3 == thirdFilterValue &&
        preassemblesData[i].filter_4 == fourthFilterValue &&
        preassemblesData[i].filter_5 == value
      ) {
        if (mainFilterValue.toLowerCase().includes("lug")) {
          heatSinkColorArray = preassemblesData[i].filter_6.split(",");
          for (let j = 0; j < heatSinkColorArray.length; j++) {
            temp2.push(heatSinkColorArray[j]);
          }
          // setHeatSinkImageT1(true);
          // temp2.push(preassemblesData[i].jacket_colour);
        } else if (!temp.includes(preassemblesData[i].filter_6)) {
          temp.push(preassemblesData[i].filter_6);
          // setHeatSinkImageT1(false);
        }

        if (temp[0] == null) {
          setImageT1(preassemblesData[i].img_url_t1);
          setSparkyIdT1(preassemblesData[i].sparky_id);
          setPriceT1(preassemblesData[i].price);
          setAssemblyChargesT1(preassemblesData[i].assembly_charges);
          setIsValidT1(true);
        }
      }
    }
    if (mainFilterValue.toLowerCase().includes("lug")) {
      setSixthFilterOptions(temp2);
    } else {
      setSixthFilterOptions(temp);
    }
  };

  const onSixthFilterChange = (value) => {
    console.log("@@@@@@ value", value);
    setSixthFilterValue(value);
    let temp = [];
    // special condition for lug because of heat sink concept
    if (mainFilterValue.toLowerCase().includes("lug")) {
      for (let i = 0; i < preassemblesData.length; i++) {
        if (
          preassemblesData[i].main_filter == mainFilterValue &&
          preassemblesData[i].filter_1 == firstFilterValue &&
          preassemblesData[i].filter_2 == secondFilterValue &&
          preassemblesData[i].filter_3 == thirdFilterValue &&
          preassemblesData[i].filter_4 == fourthFilterValue &&
          preassemblesData[i].filter_5 == fifthFilterValue &&
          preassemblesData[i].filter_6.includes(value)
        ) {
          console.log("@@@@@@ preassemblesData[i]", preassemblesData[i]);
          if (!temp.includes(preassemblesData[i].filter_7)) {
            temp.push(preassemblesData[i].filter_7);
          }
          // setHeatSinkImageT1(true);
          console.log("@@@@@@", temp);
          if (temp[0] == null) {
            setImageT1(preassemblesData[i].img_url_t1);
            setSparkyIdT1(preassemblesData[i].sparky_id);
            setPriceT1(preassemblesData[i].price);
            setAssemblyChargesT1(preassemblesData[i].assembly_charges);
            setIsValidT1(true);
          }
        }
      }
      setSeventhFilterOptions(temp);
    } else {
      setHeatSinkImageT1(false);
      for (let i = 0; i < preassemblesData.length; i++) {
        if (
          preassemblesData[i].main_filter == mainFilterValue &&
          preassemblesData[i].filter_1 == firstFilterValue &&
          preassemblesData[i].filter_2 == secondFilterValue &&
          preassemblesData[i].filter_3 == thirdFilterValue &&
          preassemblesData[i].filter_4 == fourthFilterValue &&
          preassemblesData[i].filter_5 == fifthFilterValue &&
          preassemblesData[i].filter_6 == value
        ) {
          console.log("@@@@@@ preassemblesData[i]", preassemblesData[i]);
          if (!temp.includes(preassemblesData[i].filter_7)) {
            temp.push(preassemblesData[i].filter_7);
          }
          console.log("@@@@@@", temp);
          if (temp[0] == null) {
            setImageT1(preassemblesData[i].img_url_t1);
            setSparkyIdT1(preassemblesData[i].sparky_id);
            setPriceT1(preassemblesData[i].price);
            setAssemblyChargesT1(preassemblesData[i].assembly_charges);
            setIsValidT1(true);
          }
        }
      }
      setSeventhFilterOptions(temp);
    }
  };

  const onSeventhFilterChange = (value) => {
    setSeventhFilterValue(value);
  };

  const onMainFilterChangeT2 = (value) => {
    setMainFilterValueT2(value);
    setFirstFilterValueT2(null);
    setSecondFilterValueT2(null);
    setThirdFilterValueT2(null);
    setFourthFilterValueT2(null);
    setFifthFilterValueT2(null);
    setSixthFilterValueT2(null);
    setSeventhFilterValueT2(null);
    setImageT2(null);
    setPartNoT2(null);
    setIsValidT2(false);
    setIsTerminalTwoPartNumberDisabled(true);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (preassemblesData[i].main_filter == value) {
        if (!temp.includes(preassemblesData[i].filter_1)) {
          temp.push(preassemblesData[i].filter_1);
        }
      }
    }

    setFirstFilterOptionsT2(temp);
  };

  const onFirstFilterChangeT2 = (value) => {
    setFirstFilterValueT2(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValueT2 &&
        preassemblesData[i].filter_1 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_2)) {
          temp.push(preassemblesData[i].filter_2);
        }
      }
    }

    setSecondFilterOptionsT2(temp);
  };

  const onSecondFilterChangeT2 = (value) => {
    setSecondFilterValueT2(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValueT2 &&
        preassemblesData[i].filter_1 == firstFilterValueT2 &&
        preassemblesData[i].filter_2 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_3)) {
          temp.push(preassemblesData[i].filter_3);
        }
      }
    }
    setThirdFilterOptionsT2(temp);
  };

  const onThirdFilterChangeT2 = (value) => {
    setThirdFilterValueT2(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValueT2 &&
        preassemblesData[i].filter_1 == firstFilterValueT2 &&
        preassemblesData[i].filter_2 == secondFilterValueT2 &&
        preassemblesData[i].filter_3 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_4)) {
          temp.push(preassemblesData[i].filter_4);
        }
      }
    }
    setFourthFilterOptionsT2(temp);
  };
  const onFourthFilterChangeT2 = (value) => {
    setFourthFilterValueT2(value);
    let temp = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValueT2 &&
        preassemblesData[i].filter_1 == firstFilterValueT2 &&
        preassemblesData[i].filter_2 == secondFilterValueT2 &&
        preassemblesData[i].filter_3 == thirdFilterValueT2 &&
        preassemblesData[i].filter_4 == value
      ) {
        if (!temp.includes(preassemblesData[i].filter_5)) {
          temp.push(preassemblesData[i].filter_5);
        }
      }
    }
    setFifthFilterOptionsT2(temp);
  };
  const onFifthFilterChangeT2 = (value) => {
    setFifthFilterValueT2(value);
    let temp = [];
    let temp2 = [];
    let heatSinkColorArray = [];
    for (let i = 0; i < preassemblesData.length; i++) {
      if (
        preassemblesData[i].main_filter == mainFilterValueT2 &&
        preassemblesData[i].filter_1 == firstFilterValueT2 &&
        preassemblesData[i].filter_2 == secondFilterValueT2 &&
        preassemblesData[i].filter_3 == thirdFilterValueT2 &&
        preassemblesData[i].filter_4 == fourthFilterValueT2 &&
        preassemblesData[i].filter_5 == value
      ) {
        if (mainFilterValueT2.toLowerCase().includes("lug")) {
          heatSinkColorArray = preassemblesData[i].filter_6.split(",");
          for (let j = 0; j < heatSinkColorArray.length; j++) {
            temp2.push(heatSinkColorArray[j]);
            // setHeatSinkImageT2(true);
          }
          // setHeatSinkImageT1(true);
          // temp2.push(preassemblesData[i].jacket_colour);
        } else if (!temp.includes(preassemblesData[i].filter_6)) {
          temp.push(preassemblesData[i].filter_6);
          // setHeatSinkImageT2(false);
        }
        // console.log("@@@@@@@@@@@@", preassemblesData[i]);
        // console.log("@@@@@@@@@@@@22222", preassemblesData[i].img_url_t1);
        if (temp[0] == null) {
          if (preassemblesData[i].img_url_t2) {
            setImageT2(preassemblesData[i].img_url_t2);
          } else {
            setImageT2(preassemblesData[i].img_url_t1);
          }
          setSparkyIdT2(preassemblesData[i].sparky_id);
          setPriceT2(preassemblesData[i].price);
          setAssemblyChargesT2(preassemblesData[i].assembly_charges);
          setIsValidT2(true);
        }
      }
    }
    if (mainFilterValueT2.toLowerCase().includes("lug")) {
      setSixthFilterOptionsT2(temp2);
    } else {
      setSixthFilterOptionsT2(temp);
    }
  };

  const onSixthFilterChangeT2 = (value) => {
    setSixthFilterValueT2(value);
    let temp = [];
    // special condition for lug because of heat sink concept
    if (mainFilterValueT2.toLowerCase().includes("lug")) {
      for (let i = 0; i < preassemblesData.length; i++) {
        if (
          preassemblesData[i].main_filter == mainFilterValueT2 &&
          preassemblesData[i].filter_1 == firstFilterValueT2 &&
          preassemblesData[i].filter_2 == secondFilterValueT2 &&
          preassemblesData[i].filter_3 == thirdFilterValueT2 &&
          preassemblesData[i].filter_4 == fourthFilterValueT2 &&
          preassemblesData[i].filter_5 == fifthFilterValueT2 &&
          preassemblesData[i].filter_6.includes(value)
        ) {
          console.log("@@@@@@ preassemblesData[i]", preassemblesData[i]);
          if (!temp.includes(preassemblesData[i].filter_7)) {
            temp.push(preassemblesData[i].filter_7);
          }
          // setHeatSinkImageT2(true);
          console.log("@@@@@@", temp);
          if (temp[0] == null) {
            if (preassemblesData[i].img_url_t2) {
              setImageT2(preassemblesData[i].img_url_t2);
            } else {
              setImageT2(preassemblesData[i].img_url_t1);
            }
            setSparkyIdT2(preassemblesData[i].sparky_id);
            setPriceT2(preassemblesData[i].price);
            setAssemblyChargesT2(preassemblesData[i].assembly_charges);
            setIsValidT2(true);
          }
        }
      }
      setSeventhFilterOptionsT2(temp);
    } else {
      setHeatSinkImageT2(false);
      for (let i = 0; i < preassemblesData.length; i++) {
        if (
          preassemblesData[i].main_filter == mainFilterValueT2 &&
          preassemblesData[i].filter_1 == firstFilterValueT2 &&
          preassemblesData[i].filter_2 == secondFilterValueT2 &&
          preassemblesData[i].filter_3 == thirdFilterValueT2 &&
          preassemblesData[i].filter_4 == fourthFilterValueT2 &&
          preassemblesData[i].filter_5 == fifthFilterValueT2 &&
          preassemblesData[i].filter_6 == value
        ) {
          if (!temp.includes(preassemblesData[i].filter_7)) {
            temp.push(preassemblesData[i].filter_7);
          }
          if (temp[0] == null) {
            if (preassemblesData[i].img_url_t2) {
              setImageT2(preassemblesData[i].img_url_t2);
            } else {
              setImageT2(preassemblesData[i].img_url_t1);
            }
            setSparkyIdT2(preassemblesData[i].sparky_id);
            setPriceT2(preassemblesData[i].price);
            setAssemblyChargesT2(preassemblesData[i].assembly_charges);
            setIsValidT2(true);
          }
        }
      }
      setSeventhFilterOptionsT2(temp);
    }
  };

  const onSeventhFilterChangeT2 = (value) => {
    setSeventhFilterValueT2(value);
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
    setIsValidCable(false);
    setPartNoCable(null);
    setIsCablePartNumberDisabled(true);
    // setJacketColorValueCable("white");
    let temp = [];
    for (let i = 0; i < cableData.length; i++) {
      if (cableData[i].filter_1 == value) {
        if (!temp.includes(cableData[i].filter_2)) {
          temp.push(cableData[i].filter_2);
        }
      }
    }

    setSecondFilterOptionsCable(temp);
  };

  const onSecondFilterChangeCable = (value) => {
    setSecondFilterValueCable(value);
    let temp = [];
    for (let i = 0; i < cableData.length; i++) {
      if (
        cableData[i].filter_1 == firstFilterValueCable &&
        cableData[i].filter_2 == value
      ) {
        if (!temp.includes(cableData[i].filter_3)) {
          temp.push(cableData[i].filter_3);
        }
      }
    }
    setThirdFilterOptionsCable(temp);
  };

  const onThirdFilterChangeCable = (value) => {
    setThirdFilterValueCable(value);
    let temp = [];
    for (let i = 0; i < cableData.length; i++) {
      if (
        cableData[i].filter_1 == firstFilterValueCable &&
        cableData[i].filter_2 == secondFilterValueCable &&
        cableData[i].filter_3 == value
      ) {
        if (!temp.includes(cableData[i].filter_4)) {
          temp.push(cableData[i].filter_4);
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
        cableData[i].filter_1 == firstFilterValueCable &&
        cableData[i].filter_2 == secondFilterValueCable &&
        cableData[i].filter_3 == thirdFilterValueCable &&
        cableData[i].filter_4 == value
      ) {
        if (!temp.includes(cableData[i].filter_5)) {
          temp.push(cableData[i].filter_5);
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
    for (let i = 0; i < cableData.length; i++) {
      if (
        cableData[i].filter_1 == firstFilterValueCable &&
        cableData[i].filter_2 == secondFilterValueCable &&
        cableData[i].filter_3 == thirdFilterValueCable &&
        cableData[i].filter_4 == fourthFilterValueCable &&
        cableData[i].filter_5 == value
      ) {
        // console.log("inside if");
        if (!temp.includes(cableData[i].filter_6)) {
          temp.push(cableData[i].filter_6);
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
    for (let i = 0; i < cableData.length; i++) {
      if (
        cableData[i].filter_1 == firstFilterValueCable &&
        cableData[i].filter_2 == secondFilterValueCable &&
        cableData[i].filter_3 == thirdFilterValueCable &&
        cableData[i].filter_4 == fourthFilterValueCable &&
        cableData[i].filter_5 == fifthFilterValueCable &&
        cableData[i].filter_6 == value
      ) {
        if (!temp.includes(cableData[i].filter_7)) {
          temp.push(cableData[i].filter_7);
        }
        if (!temp2.includes(cableData[i].jacket_colour)) {
          jacketArray = cableData[i].jacket_colour.split(",");
          for (let j = 0; j < jacketArray.length; j++) {
            temp2.push(jacketArray[j]);
          }
          // temp2.push(preassemblesData[i].jacket_colour);
        }
        setSparkyIdCable(cableData[i].sparky_id);
        setPricingPerMeterCable(cableData[i].pricing_per_meter);
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
    setIsValidCable(true);
  };

  // console.log("main Filter -------", mainFilterValue);
  //   console.log("main Filter22222222 -------", sixthFilter[mainFilterValue][0]);

  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);

  const onChangePhase = (item) => {
    setSelectedPhase(item);
  };
  const OpenRightSocketPopup = () => {
    setRightPopup(!rightPopup);
  };
  const OpenRightNOTSocketPopup = () => {
    // setRightPopup(rightPopup);
  };

  const dispatchActionsForPreassemble = () => {
    let T1Object = {
      main_filter: mainFilterValue,
      filter_1: firstFilterValue,
      filter_2: secondFilterValue,
      filter_3: thirdFilterValue,
      filter_4: fourthFilterValue,
      filter_5: fifthFilterValue,
      filter_6: sixthFilterValue,
      filter_7: seventhFilterValue,
      img_url: imageT1,
      sparkyId: sparkyIdT1,
      price: priceT1,
      assemblyCharges: assemblyChargesT1,
      partNo: partNoT1,
    };
    let T2Object = {
      main_filter: mainFilterValueT2,
      filter_1: firstFilterValueT2,
      filter_2: secondFilterValueT2,
      filter_3: thirdFilterValueT2,
      filter_4: fourthFilterValueT2,
      filter_5: fifthFilterValueT2,
      filter_6: sixthFilterValueT2,
      filter_7: seventhFilterValueT2,
      img_url: imageT2,
      sparkyId: sparkyIdT2,
      price: priceT2,
      assemblyCharges: assemblyChargesT2,
      partNo: partNoT2,
    };
    let cableObject = {
      filter_1: firstFilterValueCable,
      filter_2: secondFilterValueCable,
      filter_3: thirdFilterValueCable,
      filter_4: fourthFilterValueCable,
      filter_5: fifthFilterValueCable,
      filter_6: sixthFilterValueCable,
      filter_7: seventhFilterValueCable,
      jacket_colour: jacketColorValueCable,
      sparkyId: sparkyIdCable,
      pricingPerMeter: pricingPerMeterCable,
      partNo: partNoCable,
    };
    dispatch(setPreassembleTerminalT1(T1Object));
    dispatch(setPreassembleTerminalT2(T2Object));
    dispatch(setPreassembleCable(cableObject));
    dispatch(
      setHeatSinkImage({
        heatSinkImageT1,
        sixthFilterValue,
        heatSinkImageT2,
        sixthFilterValueT2,
      })
    );
  };

  const resetT1 = () => {
    setMainFilterValue(null);
    setFirstFilterValue(null);
    setSecondFilterValue(null);
    setThirdFilterValue(null);
    setFourthFilterValue(null);
    setFifthFilterValue(null);
    setSixthFilterValue(null);
    setSeventhFilterValue(null);
    setImageT1(null);
  };
  const resetT2 = () => {
    setMainFilterValueT2(null);
    setFirstFilterValueT2(null);
    setSecondFilterValueT2(null);
    setThirdFilterValueT2(null);
    setFourthFilterValueT2(null);
    setFifthFilterValueT2(null);
    setSixthFilterValueT2(null);
    setSeventhFilterValueT2(null);
    setImageT2(null);
  };

  const resetCable = () => {
    setFirstFilterValueCable(null);
    setSecondFilterValueCable(null);
    setThirdFilterValueCable(null);
    setFourthFilterValueCable(null);
    setFifthFilterValueCable(null);
    setSixthFilterValueCable(null);
    setSeventhFilterValueCable(null);
    setJacketColorValueCable(null);
  };

  const handleChangePartNoT1 = (e) => {
    setPartNoT1(e.target.value);
    if (e.target.value == "") {
      setIsValidT1(false);
    } else {
      setIsValidT1(true);
    }
  };
  const handleChangePartNoT2 = (e) => {
    setPartNoT2(e.target.value);
    if (e.target.value == "") {
      setIsValidT2(false);
    } else {
      setIsValidT2(true);
    }
  };
  const handleChangePartNoCable = (e) => {
    setPartNoCable(e.target.value);
    if (e.target.value == "") {
      setIsValidCable(false);
    } else {
      setIsValidCable(true);
    }
  };
  const handleOnClearMainFilterT1 = () => {
    console.log("cccccc22222");
    setIsTerminalOnePartNumberDisabled(false);
  };

  const handleOnClearMainFilterT2 = () => {
    setIsTerminalTwoPartNumberDisabled(false);
  };

  const handleOnClearFirstFilterValueCable = () => {
    setIsCablePartNumberDisabled(false);
  };

  // to enable part number inputs if main filters not selected
  useEffect(() => {
    if (!mainFilterValue) {
      setIsTerminalOnePartNumberDisabled(false);
    }
    if (!mainFilterValueT2) {
      setIsTerminalTwoPartNumberDisabled(false);
    }
    if (!firstFilterValueCable) {
      setIsCablePartNumberDisabled(false);
    }
  }, [mainFilterValue, mainFilterValueT2, firstFilterValueCable]);

  // console.log("mmmmm mainFilterValueT2 = ", mainFilterValueT2);
  // console.log("================= isValidT1 = ", isValidT1);
  return (
    <Container fluid className={styles.CustomizationWrapper}>
      {/* Customization Properties */}
      <div className={styles.ItemCustomizationContainer} id="selectCableBox">
        <div className={styles.HeaderTitle}>
          <h1>Customize and make your own lead</h1>
        </div>
        <h3>Select Cable</h3>
        <div className={styles.SelectCableBoxConatiner}>
          {/* <h3>Select Cable</h3> */}

          <Grid
            container
            direction={"row"}
            spacing={1}
            className={styles.filterBox}
          >
            <Grid item xs={6} sm={6} md={6} lg={6}>
              {/* <Select
                  showSearch
                  allowClear
                  style={{ width: "100%", textAlign: "left" }}
                  value={selectedPhase}
                  placeholder="Select Phase"
                  optionFilterProp="children"
                  onChange={(e) => onChangePhase(e)}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {phaseList &&
                    phaseList.map((item, index) => (
                      <Option value={item.name} key={index}>
                        {item.name}
                      </Option>
                    ))}
                </Select> */}
              <Select
                // style={{
                //   width: 200,
                // }}
                style={{ width: "100%", textAlign: "left" }}
                showSearch
                placeholder="Select first filter"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                // disabled={mainFilterValueCable ? false : true}
                value={firstFilterValueCable}
                onChange={onFirstFilterChangeCable}
                options={firstFilterOptionsCable.map((province) => ({
                  label: province,
                  value: province,
                }))}
                allowClear
                onClear={handleOnClearFirstFilterValueCable}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Select
                style={{ width: "100%", textAlign: "left" }}
                showSearch
                placeholder="Select second filter"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                disabled={firstFilterValueCable ? false : true}
                value={secondFilterValueCable}
                onChange={onSecondFilterChangeCable}
                options={secondFilterOptionsCable.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Select
                style={{ width: "100%", textAlign: "left" }}
                showSearch
                placeholder="Select third filter"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                disabled={secondFilterValueCable ? false : true}
                value={thirdFilterValueCable}
                onChange={onThirdFilterChangeCable}
                options={thirdFilterOptionsCable.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Select
                style={{ width: "100%", textAlign: "left" }}
                showSearch
                placeholder="Select fourth filter"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                disabled={thirdFilterValueCable ? false : true}
                value={fourthFilterValueCable}
                onChange={onFourthFilterChangeCable}
                options={fourthFilterOptionsCable.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Select
                style={{ width: "100%", textAlign: "left" }}
                showSearch
                placeholder="Select fifth filter"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                disabled={fourthFilterValueCable ? false : true}
                value={fifthFilterValueCable}
                onChange={onFifthFilterChangeCable}
                options={fifthFilterOptionsCable.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Select
                style={{ width: "100%", textAlign: "left" }}
                showSearch
                placeholder="Select sixth filter"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                disabled={fifthFilterValueCable ? false : true}
                value={sixthFilterValueCable}
                onChange={onSixthFilterChangeCable}
                options={sixthFilterOptionsCable.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              {seventhFilterOptionsCable[0] !== null ? (
                <Select
                  style={{ width: "100%", textAlign: "left" }}
                  showSearch
                  placeholder="Select seventh filter"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
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
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Select
                style={{ width: "100%", textAlign: "left" }}
                showSearch
                placeholder="Select Jacket Color"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                disabled={sixthFilterValueCable ? false : true}
                value={jacketColorValueCable}
                onChange={onJacketColorChangeCable}
                options={jacketColorOptionsCable.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={styles.NOT_IN_THE_LIST_BOX}
          >
            <div className={styles.ButtomInfo}>
              <h4>Not in the list?</h4>
              <Input
                placeholder="Enter part number"
                value={partNoCable}
                onChange={handleChangePartNoCable}
                onBlur={resetCable}
                disabled={isCablePartNumberDisabled}
                className={styles.cableInput}
              />
            </div>
          </Grid>
        </div>
        <div className={styles.TerminalContainer}>
          <Grid
            container
            direction={"row"}
            spacing={2}
            style={{ alignItems: "center" }}
          >
            <Grid item sm={2} md={2} lg={2}>
              <div className={styles.TerminalItem1}>
                <h3>Select Terminal 1</h3>
                <Grid container direction={"row"} spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {/* <Select
                      showSearch
                      allowClear
                      style={{ width: "100%", textAlign: "left" }}
                      value={selectedPhase}
                      placeholder="Select Phase"
                      optionFilterProp="children"
                      onChange={(e) => onChangePhase(e)}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {phaseList &&
                        phaseList.map((item, index) => (
                          <Option value={item.name} key={index}>
                            {item.name}
                          </Option>
                        ))}
                    </Select> */}
                    <Select
                      // style={{
                      //   width: 150,
                      // }}
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select main filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      value={mainFilterValue}
                      onChange={onMainFilterChange}
                      options={mainFilterOptions.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                      allowClear
                      onClear={handleOnClearMainFilterT1}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      // style={{
                      //   width: 150,
                      // }}
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select first filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={mainFilterValue ? false : true}
                      value={firstFilterValue}
                      onChange={onFirstFilterChange}
                      options={firstFilterOptions.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      // style={{
                      //   width: 150,
                      // }}
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select second filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={firstFilterValue ? false : true}
                      value={secondFilterValue}
                      onChange={onSecondFilterChange}
                      options={secondFilterOptions.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      // style={{
                      //   width: 150,
                      // }}
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select third filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={secondFilterValue ? false : true}
                      value={thirdFilterValue}
                      onChange={onThirdFilterChange}
                      options={thirdFilterOptions.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      // style={{
                      //   width: 150,
                      // }}
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select fourth filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={thirdFilterValue ? false : true}
                      value={fourthFilterValue}
                      onChange={onFourthFilterChange}
                      options={fourthFilterOptions.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      // style={{
                      //   width: 150,
                      // }}
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select fifth filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={fourthFilterValue ? false : true}
                      value={fifthFilterValue}
                      onChange={onFifthFilterChange}
                      options={fifthFilterOptions.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    {sixthFilterOptions[0] !== null ? (
                      <Select
                        style={{ width: "100%", textAlign: "left" }}
                        showSearch
                        placeholder="Select sixth filter"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        disabled={
                          fifthFilterValue
                            ? sixthFilterOptions[0] == null
                              ? true
                              : false
                            : true
                        }
                        value={sixthFilterValue}
                        onChange={onSixthFilterChange}
                        options={sixthFilterOptions.map((province) => ({
                          label: province,
                          value: province,
                        }))}
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    {seventhFilterOptions[0] !== null &&
                    sixthFilterOptions[0] !== null ? (
                      <Select
                        style={{ width: "100%", textAlign: "left" }}
                        showSearch
                        placeholder="Select seventh filter"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        disabled={
                          sixthFilterValue
                            ? seventhFilterOptions[0] == null
                              ? true
                              : false
                            : true
                        }
                        value={seventhFilterValue}
                        onChange={onSeventhFilterChange}
                        options={seventhFilterOptions.map((province) => ({
                          label: province,
                          value: province,
                        }))}
                      />
                    ) : null}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className="NOT_IN_THE_LIST_BOX"
                  >
                    <div className={styles.ButtomInfo}>
                      <h4>Not in the list?</h4>
                      <Input
                        placeholder="Enter part number"
                        // onFocus={resetT1}
                        value={partNoT1}
                        onChange={handleChangePartNoT1}
                        onBlur={resetT1}
                        disabled={isTerminalOnePartNumberDisabled}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <div className={styles.SocketContainer}>
                <div className={styles.CustomizeImageBox}>
                  <div className={styles.MainImg}>
                    <div
                      className={styles.leftImg}
                      style={
                        mainFilterValue?.includes("Lug")
                          ? { width: "100px" }
                          : { width: "200px" }
                      }
                      // style={{ width: "100px" }}
                    >
                      {/* <div style={{ textAlign: "center" }}>Terminal 1</div> */}
                      <Tooltip title="Terminal 1" placement="left">
                        {imageT1 ? (
                          <img
                            src={process.env.PRODUCT_CDN_URL + imageT1}
                            alt="imgT1"
                            // style={{ backgroundColor: "orange" }}
                            style={
                              heatSinkImageT1
                                ? { transform: "translate(60px,0px)" }
                                : {}
                            }
                          />
                        ) : (
                          <img
                            src="/images/leftsockt.png"
                            alt="img1"
                            // style={{ backgroundColor: "orange" }}
                            style={
                              heatSinkImageT1
                                ? {
                                    transform: "translate(86px,0px)",
                                  }
                                : {}
                            }
                          />
                        )}
                      </Tooltip>
                    </div>

                    {heatSinkImageT1 ? (
                      <div
                        className={styles.heatSinkImg}
                        style={{
                          // backgroundColor: "transparent",
                          // background: "rgba(0,0,0,0.5)",
                          // visibility: "hidden",
                          // opacity: sixthFilterValue ? "" : "0.2",
                          // backgroundColor: "transparent",
                          width: "85px",
                          // transform: "translate(25px,0px)",
                        }}
                      >
                        {/* <img
                        src="/images/2-BG.svg"
                        alt="img1"
                        style={{ backgroundColor: "Black" }}
                      /> */}
                        {/* <>Heat Shrink </> */}
                        <Tooltip title="Heat Shrink">
                          <img
                            // src="/images/heatSink-Bg.svg"
                            // src="/images/Connector (7).svg"
                            src="/images/Connector2.svg"
                            alt="Heat Sink"
                            style={{
                              backgroundColor: sixthFilterValue
                                ? `${sixthFilterValue}`
                                : "",
                            }}
                          />
                        </Tooltip>
                        {/* <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <img
                            // src="/images/heatSink-Shades.svg"
                            src="/images/T1.svg"
                            alt="Heat Sink"
                            style={{
                              backgroundColor: sixthFilterValue
                                ? `${sixthFilterValue}`
                                : "",
                            }}
                          />
                          <img
                            // src="/images/heatSink-Shades.svg"
                            src="/images/T2.svg"
                            alt="Heat Sink"
                            // style={{
                            //   backgroundColor: sixthFilterValue
                            //     ? `${sixthFilterValue}`
                            //     : "",
                            // }}
                          />
                          <img
                            // src="/images/heatSink-Shades.svg"
                            src="/images/T3.svg"
                            alt="Heat Sink"
                            style={{
                              backgroundColor: sixthFilterValue
                                ? `${sixthFilterValue}`
                                : "",
                            }}
                          />
                        </div> */}
                      </div>
                    ) : null}

                    <div
                      className={styles.centerImg}
                      style={{
                        // backgroundColor: "transparent",
                        // background: "rgba(0,0,0,0.5)",
                        // visibility: "hidden",
                        opacity: jacketColorValueCable ? "" : "0.2",
                        // backgroundColor: "transparent",
                      }}
                      // style={{ backgroundColor: "orang" }}
                    >
                      {/* <img
                        src="/images/2-BG.svg"
                        alt="img1"
                        style={{ backgroundColor: "Black" }}
                      /> */}
                      {/* <div style={{ marginBottom: "6%", textAlign: "center" }}>
                        Cable
                      </div> */}
                      <Tooltip title="Cable">
                        <img
                          src="/images/1-Shades.svg"
                          alt="cable image"
                          style={{
                            backgroundColor: jacketColorValueCable
                              ? `${jacketColorValueCable}`
                              : "",
                          }}
                        />
                      </Tooltip>
                    </div>
                    {heatSinkImageT2 ? (
                      <div
                        className={styles.heatSinkImg2}
                        style={{
                          // backgroundColor: "transparent",
                          // background: "rgba(0,0,0,0.5)",
                          // visibility: "hidden",
                          // opacity: heatSinkImageT2 ? "" : "0.2",
                          // backgroundColor: "transparent",
                          width: "85px",
                        }}
                        // style={{ backgroundColor: "orang" }}
                      >
                        {/* <img
                        src="/images/2-BG.svg"
                        alt="img1"
                        style={{ backgroundColor: "Black" }}
                      /> */}
                        {/* <>Heat Shrink </> */}
                        <Tooltip title="Heat Shrink">
                          <img
                            // src="/images/Connector (7).svg"
                            src="/images/Connector2.svg"
                            alt="Heat Sink"
                            style={{
                              backgroundColor: sixthFilterValueT2
                                ? `${sixthFilterValueT2}`
                                : "",
                            }}
                          />
                        </Tooltip>
                      </div>
                    ) : null}
                    <div
                      className={styles.rightImg}
                      style={
                        mainFilterValueT2?.includes("Lug")
                          ? { width: "100px" }
                          : { width: "200px" }
                      }
                    >
                      <Tooltip title="Terminal 2" placement="right">
                        {imageT2 ? (
                          <img
                            src={process.env.PRODUCT_CDN_URL + imageT2}
                            alt="imgT2"
                            style={
                              heatSinkImageT2
                                ? {
                                    // transform: "rotate(180deg)",
                                    transform:
                                      "translate(-60px,6px)  rotate(180deg)",
                                  }
                                : {
                                    transform: "rotate(180deg)",
                                  }
                            }
                          />
                        ) : (
                          <img
                            src="/images/rightsoket.png"
                            alt="img1"
                            style={
                              heatSinkImageT2
                                ? { transform: "translate(-70px,0px)" }
                                : {}
                            }
                          />
                        )}
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className={styles.BottomActionBox}>
                  {/* <div className={styles.ZoomInOutLeftRightButtons}>
                    <Space>
                      <div className={styles.CircleIconBox}>
                        <TurnRightIcon />
                      </div>
                      <div className={styles.CircleIconBox}>
                        <ZoomInIcon />
                      </div>
                      <div className={styles.CircleIconBox}>
                        <ZoomOutIcon />
                      </div>
                      <div className={styles.CircleIconBox}>
                        <TurnLeftIcon />
                      </div>
                    </Space>
                  </div> */}

                  <div
                    className={styles.SaveAndNextButton}
                    // onMouseEnter={() => setVisible(true)}
                    // onMouseLeave={() => setVisible(false)}
                  >
                    {/* <Link href="/customized-product"> */}
                    <>
                      {tooltipTitle ? (
                        <Tooltip
                          title={tooltipTitle}
                          color="red"
                          key="red"
                          // visible={visible}
                        >
                          <Button
                            onClick={() => dispatchActionsForPreassemble()}
                            // disabled={!isValidT1 || !isValidT2 || !isValidCable}
                            disabled
                          >
                            Save & Next
                          </Button>
                        </Tooltip>
                      ) : (
                        <Link href="/customized-product">
                          <Button
                            onClick={() => dispatchActionsForPreassemble()}
                            // disabled={!isValidT1 || !isValidT2 || !isValidCable}
                          >
                            Save & Next
                          </Button>
                        </Link>
                      )}
                    </>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={2} md={2} lg={2}>
              <div className={styles.TerminalItem2}>
                <h3>Select Terminal 2</h3>
                <Grid container direction={"row"} spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Select
                      // style={{
                      //   width: 150,
                      // }}
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select main filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      value={mainFilterValueT2}
                      onChange={onMainFilterChangeT2}
                      options={mainFilterOptionsT2.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                      allowClear
                      onClear={handleOnClearMainFilterT2}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select first filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={mainFilterValueT2 ? false : true}
                      value={firstFilterValueT2}
                      onChange={onFirstFilterChangeT2}
                      options={firstFilterOptionsT2.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select second filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={firstFilterValueT2 ? false : true}
                      value={secondFilterValueT2}
                      onChange={onSecondFilterChangeT2}
                      options={secondFilterOptionsT2.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select third filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={secondFilterValueT2 ? false : true}
                      value={thirdFilterValueT2}
                      onChange={onThirdFilterChangeT2}
                      options={thirdFilterOptionsT2.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select fourth filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={thirdFilterValueT2 ? false : true}
                      value={fourthFilterValueT2}
                      onChange={onFourthFilterChangeT2}
                      options={fourthFilterOptionsT2.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Select
                      style={{ width: "100%", textAlign: "left" }}
                      showSearch
                      placeholder="Select fifth filter"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={fourthFilterValueT2 ? false : true}
                      value={fifthFilterValueT2}
                      onChange={onFifthFilterChangeT2}
                      options={fifthFilterOptionsT2.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    {sixthFilterOptionsT2[0] !== null ? (
                      <Select
                        style={{ width: "100%", textAlign: "left" }}
                        showSearch
                        placeholder="Select sixth filter"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        disabled={
                          fifthFilterValueT2
                            ? sixthFilterOptionsT2[0] == null
                              ? true
                              : false
                            : true
                        }
                        value={sixthFilterValueT2}
                        onChange={onSixthFilterChangeT2}
                        options={sixthFilterOptionsT2.map((province) => ({
                          label: province,
                          value: province,
                        }))}
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    {seventhFilterOptionsT2[0] !== null &&
                    sixthFilterOptionsT2[0] !== null ? (
                      <Select
                        style={{ width: "100%", textAlign: "left" }}
                        showSearch
                        placeholder="Select seventh filter"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        disabled={
                          sixthFilterValueT2
                            ? seventhFilterOptionsT2[0] == null
                              ? true
                              : false
                            : true
                        }
                        value={seventhFilterValueT2}
                        onChange={onSeventhFilterChangeT2}
                        options={seventhFilterOptionsT2.map((province) => ({
                          label: province,
                          value: province,
                        }))}
                      />
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={styles.ButtomInfo}>
                      <h4>Not in the list?</h4>
                      <Input
                        placeholder="Enter part number"
                        // onFocus={resetT2}
                        value={partNoT2}
                        onChange={handleChangePartNoT2}
                        onBlur={resetT2}
                        disabled={isTerminalTwoPartNumberDisabled}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
        {/* <div className={styles.HelpContainer}>
          <div>
            <Link href={"#"}>
              <a>Need help?</a>
            </Link>
          </div>
          <button>Chat</button>
        </div> */}
      </div>
    </Container>
  );
}

export default ItemCustomization;
