//Action Types
export const INIT_PREASSEMBLE = "INIT_PREASSEMBLE";
export const SET_PREASSEMBLE_TERMINAL_T1 = "SET_PREASSEMBLE_TERMINAL_T1";
export const SET_PREASSEMBLE_TERMINAL_T2 = "SET_PREASSEMBLE_TERMINAL_T2";
export const SET_PREASSEMBLE_CABLE = "SET_PREASSEMBLE_CABLE";
export const SET_HEAT_SINK_IMAGE = "SET_HEAT_SINK_IMAGE";
export const SET_PREASSEMBLE_TERMINALS_MEDIA =
  "SET_PREASSEMBLE_TERMINALS_MEDIA";
export const PREASSEMBLE_TERMINALS_UPDATE_STATUS =
  "PREASSEMBLE_TERMINALS_UPDATE_STATUS";
export const SAVE_PREASSEMBLE_TERMINALS_DATA =
  "SAVE_PREASSEMBLE_TERMINALS_DATA";

export const initPreassemble = () => {
  const preassembleTerminalT1 = JSON.parse(
    localStorage.getItem("preassembleTerminalT1")
  )
    ? JSON.parse(localStorage.getItem("preassembleTerminalT1"))
    : {};
  const preassembleTerminalT2 = JSON.parse(
    localStorage.getItem("preassembleTerminalT2")
  )
    ? JSON.parse(localStorage.getItem("preassembleTerminalT2"))
    : {};
  const preassembleCable = JSON.parse(localStorage.getItem("preassembleCable"))
    ? JSON.parse(localStorage.getItem("preassembleCable"))
    : {};

  const heatSinkImage = JSON.parse(localStorage.getItem("heatSinkImage"))
    ? JSON.parse(localStorage.getItem("heatSinkImage"))
    : {};

  return {
    type: INIT_PREASSEMBLE,
    preassembleTerminalT1: preassembleTerminalT1,
    preassembleTerminalT2: preassembleTerminalT2,
    preassembleCable: preassembleCable,
    heatSinkImage: heatSinkImage,
  };
};

export const setPreassembleTerminalT1 = (preassembleTerminalT1) => {
  localStorage.setItem(
    "preassembleTerminalT1",
    JSON.stringify(preassembleTerminalT1)
  );
  return {
    type: SET_PREASSEMBLE_TERMINAL_T1,
    preassembleTerminalT1: preassembleTerminalT1,
  };
};

export const setPreassembleTerminalT2 = (preassembleTerminalT2) => {
  localStorage.setItem(
    "preassembleTerminalT2",
    JSON.stringify(preassembleTerminalT2)
  );
  return {
    type: SET_PREASSEMBLE_TERMINAL_T2,
    preassembleTerminalT2: preassembleTerminalT2,
  };
};

export const setPreassembleCable = (preassembleCable) => {
  localStorage.setItem("preassembleCable", JSON.stringify(preassembleCable));
  return {
    type: SET_PREASSEMBLE_CABLE,
    preassembleCable: preassembleCable,
  };
};

export const setHeatSinkImage = (heatSinkImageObj) => {
  localStorage.setItem("heatSinkImage", JSON.stringify(heatSinkImageObj));
  return {
    type: SET_HEAT_SINK_IMAGE,
    heatSinkImage: heatSinkImageObj,
  };
};

export const setProductMediaList = (productMedia) => {
  // console.log("setProductMediaList");
  return { type: SET_PREASSEMBLE_TERMINALS_MEDIA, productMedia: productMedia };
};

export const setValueWhenProduUpdate = (res) => {
  return { type: PREASSEMBLE_TERMINALS_UPDATE_STATUS, response: res };
};

export const initProduct = () => {
  const product = JSON.parse(localStorage.getItem("product"))
    ? JSON.parse(localStorage.getItem("product"))
    : null;
  return { type: SAVE_PREASSEMBLE_TERMINALS_DATA, product: product };
};
