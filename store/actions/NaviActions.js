export const INIT_NAVI = "INIT_NAVI";
export const SET_SUB_CAT = "SET_SUB_CAT";
export const SET_MAIN = "SET_MAIN";

//Action Creator
export const initializeNavi = (navi) => {
  return { type: INIT_NAVI, navi };
};
export const setSubCat = (subCats) => {
  return { type: SET_SUB_CAT, subCats };
};
