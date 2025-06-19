import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
const moment = require("moment");
//Action Types
import _ from "lodash";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const REMOVE_CART = "REMOVE_CART";
export const DECREMENT_QTY = "DECREMENT_QTY";
export const INCREMENT_QTY = "INCREMENT_QTY";
export const INIT_CARD = "INIT_CARD";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const TOTAL_CALC = "TOTAL_CALC";
export const TOGGLE_ISQUOTED = "TOGGLE_ISQUOTED";
export const UPDATE_SHIPPING_AMOUNT = "UPDATE_SHIPPING_AMOUNT";
export const UPDATE_CREDIT_AMOUNT = "UPDATE_CREDIT_AMOUNT";
export const UPDATE_APPLIED_VOUCHER = "UPDATE_APPLIED_VOUCHER";

export const initCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const cartId = JSON.parse(localStorage.getItem("cartId"))
    ? JSON.parse(localStorage.getItem("cartId"))
    : null;
  const quoteId = JSON.parse(localStorage.getItem("quoteId"))
    ? JSON.parse(localStorage.getItem("quoteId"))
    : null;
  const isQuoted = JSON.parse(localStorage.getItem("isQuoted"))
    ? JSON.parse(localStorage.getItem("isQuoted"))
    : null;

  return {
    type: INIT_CARD,
    cart: cart,
    cartId,
    quoteId,
    isQuoted,
  };
};

// export const totalOrderCalc = (order) => {
//   // console.log("^^^^^^^^^^^^^ totalOrderCalc called", order);
//   return { type: TOTAL_CALC, order };
// };



export const totalOrderCalc = (cart) => {
  let subAmount = 0;

  // Ensure `cart` is an array, or default to an empty array if not
  if (!Array.isArray(cart)) {
    cart = []; // Fallback to an empty array to avoid issues
  }

  cart.forEach((item) => {
    let itemTotalPrice = 0;
    if (item.productType == 2) {
      itemTotalPrice = ((item.cable_pricing_permeter * item.cableLength) + item.price) * item.qty;
    } else {
      itemTotalPrice = item.price * item.qty;
    }
    subAmount += itemTotalPrice;
  });

  return {
    type: TOTAL_CALC,
    order: {
      subAmount,
      totalAmount: subAmount, // Adjusted later by reducer with shipping, credit, etc.
    },
  };
};


export const addToWishlistCount = (productId, qty) => {
  const localCart = JSON.parse(localStorage.getItem("wishlist"))
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [];

  let newList;
  const objIndex = localCart.findIndex((obj) => obj.id === productId);

  if (objIndex > -1) {
    // Item already exist. So increment the number
    localCart[objIndex].qty = localCart[objIndex].qty + qty;
    newList = localCart;
  } else {
    // Item does not exist. Let's add.
    const cartItem = {
      id: productId,
    };
    newList = [cartItem];
  }
  localStorage.setItem("wishlist", JSON.stringify(newList));
  return { type: ADD_TO_WISHLIST, wishcart: newList };
};

export const addToCart = (product, qty, cableLength) => {
  console.log(
    "ppppppppp addToCart Action product shu= ",
    product,
    qty,
    cableLength
  );
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  let discount = 0;
  if (
    "productsDiscountJson" in user &&
    product &&
    user.productsDiscountJson !== null
  ) {
    let newPrices = product.product_price.map((item) => {
      let discountPrice =
        item.price -
        (item.price * user?.productsDiscountJson[0]?.discountPercentage) / 100;
      return { ...item, discountPrice };
    });
    product.product_price = [...newPrices];
    console.log("adding product", product, newPrices);
  }
  const localCart = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  console.log("localCart", localCart);
  let cartId = JSON.parse(localStorage.getItem("cartId"));
  let quoteId = JSON.parse(localStorage.getItem("quoteId"));
  var isQuoted = false;
  if (!cartId) {
    cartId = uuidv4();
    // quoteId = uuidv4();
    // const array = new Uint32Array(8);
    // quoteId = window.crypto.getRandomValues(array[0]);
    quoteId = parseInt(Math.random().toString().slice(3, 11));
    localStorage.setItem("cartId", JSON.stringify(cartId));
    localStorage.setItem("quoteId", quoteId);
    localStorage.setItem("isQuoted", JSON.stringify(isQuoted));
  }
  let newList;
  const objIndex = localCart.findIndex((obj) => obj.id === product.id);
  // if (product.productType == 3) {
  //   objIndex = -1;
  // }
  if (objIndex > -1) {
    // Item already exist. So increment the number
    localCart[objIndex].qty = localCart[objIndex].qty + qty;
    // START => IF USER HAS DISCOUNT, FIX THE PRICE TO FIRST QUANTITY ONLY, FRED REQUIREMENT - 08/05/2024
    let itemprice = product.product_price[0]?.price;
    let discount_price = product.product_price[0]?.discountPrice;
    if (!user.productsDiscountJson || user.productsDiscountJson.length == 0) {
      // let itemprice = 0;
      // let discount_price;
      for (let v in product.product_price) {
        if (product.product_price[v].quantity == localCart[objIndex].qty) {
          itemprice = product.product_price[v].price;
          discount_price = product.product_price[v]?.discountPrice;
        } else if (
          product.product_price[v].quantity <= localCart[objIndex].qty
        ) {
          itemprice = product.product_price[v].price;
          discount_price = product.product_price[v]?.discountPrice;
        }
      }
    }
    localCart[objIndex].price = itemprice;
    localCart[objIndex].price_after_discount = discount_price;
    // else {
    //   let itemprice = product.product_price[0]?.price;
    //   let discount_price = product.product_price[0]?.discountPrice;
    //   localCart[objIndex].price = itemprice;
    //   localCart[objIndex].price_after_discount = discount_price;
    // }
    // END => IF USER HAS DISCOUNT, FIX THE PRICE TO FIRST QUANTITY ONLY, FRED REQUIREMENT - 08/05/2024

    // if cable length for prodcuts with length
    if (cableLength) {
      localCart[objIndex].price = itemprice * cableLength;
      localCart[objIndex].price_after_discount = discount_price * cableLength;
    }
    newList = localCart;
  } else {
    // Item does not exist. Let's add.
    console.log("Item does not exist. Let's add.");
    // START => IF USER HAS DISCOUNT, FIX THE PRICE TO FIRST QUANTITY ONLY, FRED REQUIREMENT - 08/05/2024
    let itemprice = product.product_price[0].price;
    let discount_price = product.product_price[0]?.discountPrice;
    if (!user.productsDiscountJson || user.productsDiscountJson.length == 0) {
      // let itemprice = 0;
      // let discount_price;
      for (let v in product.product_price) {
        if (product.product_price[v].quantity == qty) {
          discount_price = product.product_price[v]?.discountPrice;
          itemprice = product.product_price[v].price;
        } else if (product.product_price[v].quantity <= qty) {
          discount_price = product.product_price[v]?.discountPrice;
          itemprice = product.product_price[v].price;
        }
      }
    }
    // else {
    //   let itemprice = product.product_price[0].price;
    //   let discount_price = product.product_price[0]?.discountPrice;
    // }
    // END => IF USER HAS DISCOUNT, FIX THE PRICE TO FIRST QUANTITY ONLY, FRED REQUIREMENT - 08/05/2024
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.product_media_list[0].path,
      price: itemprice,
      price_after_discount: discount_price,
      qty: qty,
      pricelist: product.product_price,
      pallets: product.pallets,
      weight: product.weight,
      cbm: product.cbm,
      cable_pricing_permeter: product.cable_pricing_permeter || 0,   // New price for calculation of preassembled lead cart
       // priceTotal:  itemprice * qty,
      priceTotal: cableLength ? itemprice * qty * cableLength : itemprice * qty,
      stock: parseFloat(product.stock),
      cableLength: product.productType !== 1 ? cableLength : null,
      productType: product.product_type,
      imageArrayIfCust: product.product_media_list,
      T1: product.T1,
      T2: product.T2,
      cable: product.cable,
      heatSinkImageT1: product.heatSinkImageT1,
      heatSinkImageT1Color: product.heatSinkImageT1Color,
      heatSinkImageT2: product.heatSinkImageT2,
      heatSinkImageT2Color: product.heatSinkImageT2Color,
    };
    newList = [...localCart, cartItem];
  }
  localStorage.setItem("cart", JSON.stringify(newList));
  return {
    type: ADD_TO_CART,
    cart: newList,
    user: user,
    cartId,
    quoteId,
    isQuoted,
  };
};

export const removeCartItem = (productID) => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  var tempCart = JSON.parse(localStorage.getItem("cart"));
  const length = tempCart.length;
  if (length === 1) {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartId");
    localStorage.removeItem("quoteId");
    localStorage.removeItem("isQuoted");
    tempCart = [];
  } else {
    var removeIndex = tempCart.map((item) => item.id).indexOf(productID);

    tempCart.splice(removeIndex, 1);
    localStorage.setItem("cart", JSON.stringify(tempCart));
  }
  return { type: REMOVE_CART_ITEM, cart: tempCart, user: user };
};

export const removeCart = () => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  localStorage.removeItem("cart");
  localStorage.removeItem("cartId");
  localStorage.removeItem("quoteId");
  localStorage.removeItem("isQuoted");
  return { type: REMOVE_CART, cart: [], user: user };
};

export const incrementQty = (productID, num) => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  let products = JSON.parse(localStorage.getItem("cart"));
  var productIndex = products.map((item) => item.id).indexOf(productID);
  products[productIndex].qty = products[productIndex].qty + num;

  // IF USER HAS DISCOUNT, FIX THE PRICE TO FIRST QUANTITY ONLY, FRED REQUIREMENT - 08/05/2024
  if (!user.productsDiscountJson || user.productsDiscountJson.length == 0) {
    const priceData = products[productIndex].pricelist;
    let itemprice = 0;
    let discount_price;
    for (let v in priceData) {
      if (priceData[v].quantity == products[productIndex].qty) {
        itemprice = priceData[v].price;
        discount_price = priceData[v]?.discountPrice;
      } else if (priceData[v].quantity <= products[productIndex].qty) {
        itemprice = priceData[v].price;
        discount_price = priceData[v]?.discountPrice;
      }
    }
    products[productIndex].price = itemprice;
    products[productIndex].price_after_discount = discount_price;
  }
  localStorage.setItem("cart", JSON.stringify(products));
  return { type: INCREMENT_QTY, cart: products, user: user };
};

export const decrementQty = (productID) => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  let products = JSON.parse(localStorage.getItem("cart"));
  var productIndex = products.map((item) => item.id).indexOf(productID);

  if (products[productIndex].qty <= 1 == false) {
    products[productIndex].qty = products[productIndex].qty - 1;
    // IF USER HAS DISCOUNT, FIX THE PRICE TO FIRST QUANTITY ONLY, FRED REQUIREMENT - 08/05/2024
    if (!user.productsDiscountJson || user.productsDiscountJson.length == 0) {
      const priceData = products[productIndex].pricelist;
      let itemprice = 0;
      let discount_price;
      for (let v in priceData) {
        if (priceData[v].quantity == products[productIndex].qty) {
          discount_price = priceData[v]?.discountPrice;
          itemprice = priceData[v].price;
        } else if (priceData[v].quantity <= products[productIndex].qty) {
          discount_price = priceData[v]?.discountPrice;
          itemprice = priceData[v].price;
        }
      }
      products[productIndex].price_after_discount = discount_price;
      products[productIndex].price = itemprice;
    }
    localStorage.setItem("cart", JSON.stringify(products));
  }
  return { type: DECREMENT_QTY, cart: products, user: user };
};
export const toggleIsQuoted = () => {
  let isQuoted = JSON.parse(localStorage.getItem("isQuoted"));
  isQuoted = !isQuoted;
  // console.log("toggleIsQuoted action calleddddddd isQuoted = ", isQuoted);
  localStorage.setItem("isQuoted", JSON.stringify(isQuoted));
  return { type: TOGGLE_ISQUOTED, isQuoted: isQuoted };
};

export const updateShippingAmount = (shippingAmount) => {
  // console.log("^^^^^^^^^^^^^ updateShippingAmount called", shippingAmount);
  return { type: UPDATE_SHIPPING_AMOUNT, shippingAmount: shippingAmount };
};
export const updateCreditAmount = (creditAmount) => {
  // console.log("^^^^^^^^^^^^^ updateShippingAmount called", shippingAmount);
  return { type: UPDATE_CREDIT_AMOUNT, creditAmount: creditAmount };
};
export const updateAppliedVoucher = (appliedVoucherObj) => {
  // console.log("^^^^^^^^^^^^^ updateShippingAmount called", shippingAmount);
  return { type: UPDATE_APPLIED_VOUCHER, appliedVoucherObj: appliedVoucherObj };
};
