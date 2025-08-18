export const sortAZ = (arry, label) => {
  const compareAZ = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a[label].toUpperCase();
    const bandB = b[label].toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };
  return arry.sort(compareAZ);
};

export const getSubCategory = (arry, lable) => {
  let newArry = [];
  newArry = arry;
  return newArry.filter(
    (i) => i.name.toLowerCase() === lable.replace('-', ' '),
  )[0];
};

export const getSubCategoryId = (arry, lable) => {
  let newArry = [];
  newArry = arry;
  const tt = newArry.filter(
    (i) => i.name.toLowerCase() === lable.replace('-', ' '),
  )[0];
  return tt && tt.id;
};

export const getMainCategory = (arry, lable) => {
  let newArry = [];
  newArry = arry;
  let sub = newArry.filter(
    (i) => i.name.toLowerCase() === lable.replace('-', ' '),
  )[0];
  let naviArray = [];

  sub &&
    sub.sub_categories.map((i) => {
      naviArray.push({
        id: i.id,
        name: i.name,
        state: false,
      });
    });

  return naviArray;
};

export const checkObjectInList = (list, value) => {

  const fff = list.filter((i) => {
    i.id === value;
    return true;
  });
  // return removeIndex < 0 ? true : false;
  return true;
};

export const mapSubCategory = (arry) => {
  let newArry = [];
  newArry = arry;
  const newArry_ = newArry.map((i) => {
    i.state = false;
  });
};
