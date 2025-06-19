import { getCategoryAx } from "../CategoryService/CategoryService";

export const cacheNaviBar = async () => {
  const oldNaviObj = JSON.parse(localStorage.getItem("navi"));

  const data = await getCategoryAx();
  if (data) {
    const newNaviObj = {
      time: "",
      navi: data,
    };
    localStorage.setItem("navi", JSON.stringify(newNaviObj));
    return data;
  }
};
