import {
  INIT_PREASSEMBLE,
  SET_PREASSEMBLE_TERMINAL_T1,
  SET_PREASSEMBLE_TERMINAL_T2,
  SET_PREASSEMBLE_CABLE,
  SET_HEAT_SINK_IMAGE,
  SAVE_PREASSEMBLE_TERMINALS_DATA,
  PREASSEMBLE_TERMINALS_UPDATE_STATUS,
  SET_PREASSEMBLE_TERMINALS_MEDIA,
} from "../actions/preassembleActions";

if (typeof window !== "undefined") {
  var d1 = JSON.parse(localStorage.getItem("preassembleTerminalT1"));
  var d2 = JSON.parse(localStorage.getItem("preassembleTerminalT2"));
  var d3 = JSON.parse(localStorage.getItem("preassembleCable"));
}

var initialState = {
  editPreassembleTerminalsModal: false,
  // preassembleTerminalT1: d1,
  preassembleTerminalT1: null,
  preassembleTerminalT2: null,
  preassembleCable: null,
  heatSinkImage: null,
  preassembleTerminalsresponse: null,
  preassembleTerminalsMedia: null,
};

const preassemblesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PREASSEMBLE:
      return {
        ...state,
        preassembleTerminalT1: action.preassembleTerminalT2,
        preassembleTerminalT2: action.preassembleTerminalT2,
        preassembleCable: action.preassembleCable,
      };
    case SET_PREASSEMBLE_TERMINAL_T1:
      return { ...state, preassembleTerminalT1: action.preassembleTerminalT1 };
    case SET_PREASSEMBLE_TERMINAL_T2:
      return { ...state, preassembleTerminalT2: action.preassembleTerminalT2 };
    case SET_PREASSEMBLE_CABLE:
      return { ...state, preassembleCable: action.preassembleCable };
    case SET_PREASSEMBLE_CABLE:
      return { ...state, heatSinkImage: action.heatSinkImage };
    case SET_HEAT_SINK_IMAGE:
      return { ...state, product: action.product };
    case PREASSEMBLE_TERMINALS_UPDATE_STATUS:
      return { ...state, response: action.response };
    case SET_PREASSEMBLE_TERMINALS_MEDIA:
      return { ...state, productMedia: action.productMedia };
    default:
      return { ...state };
  }
};

export default preassemblesReducer;
