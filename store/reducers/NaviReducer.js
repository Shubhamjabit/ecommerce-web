import {INIT_NAVI, SET_SUB_CAT, SET_MAIN} from '../actions/NaviActions';

const initialState = {
  navi: [],
  subCats: [],
  main: null,
};

const NaviReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_NAVI:
      return {...state, navi: action.navi};
    case SET_SUB_CAT:
      return {...state, subCats: action.subCats};

    default:
      return {...state};
  }
};

export default NaviReducer;
