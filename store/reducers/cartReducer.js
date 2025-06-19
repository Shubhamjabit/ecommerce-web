import {
  INIT_CARD,
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  REMOVE_CART,
  INCREMENT_QTY,
  DECREMENT_QTY,
  ADD_TO_WISHLIST,
  TOTAL_CALC,
  TOGGLE_ISQUOTED,
  UPDATE_SHIPPING_AMOUNT,
  UPDATE_CREDIT_AMOUNT,
  UPDATE_APPLIED_VOUCHER,
} from "./../actions/cartActions";

const initialState = {
  cart: [],
  loading: false,
  cartId: null,
  quoteId: null,
  isQuoted: null,
  orderSummary: {},
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CARD:
      return {
        ...state,
        cart: action.cart,
        cartId: action.cartId,
        quoteId: action.quoteId,
        isQuoted: action.isQuoted,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.cart,
        cartId: action.cartId,
        quoteId: action.quoteId,
        isQuoted: action.isQuoted,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: action.cart,
      };
    case REMOVE_CART:
      return { ...state, cart: action.cart };
    case ADD_TO_WISHLIST:
      return { ...state, wishcart: action.wishcart, cartId: action.cartId };
    case DECREMENT_QTY:
      return { ...state, cart: action.cart };
    case INCREMENT_QTY:
      return { ...state, cart: action.cart };
    // case TOTAL_CALC:
    //   return { ...state, orderSummary: action.order };
    case TOTAL_CALC:
      let totalAmount = 0;
      let subAmount = 0;
      const { cart } = state;
      
      cart.forEach(item => {
        let itemTotalPrice = 0;
        if (item.productType == 2) {
          itemTotalPrice = ((item.cable_pricing_permeter * item.cableLength) + item.price) * item.qty;
        } else {
          itemTotalPrice = item.price * item.qty;
        }
        subAmount += itemTotalPrice;
      });

      totalAmount = subAmount - (state.orderSummary?.appliedVoucherObj?.amount || 0) + (state.orderSummary?.shippingAmount || 0);

      return {
        ...state,
        orderSummary: {
          ...action.order,
          subAmount,
          totalAmount: totalAmount < 0 ? 0 : totalAmount,
        },
      };
    case TOGGLE_ISQUOTED:
      return { ...state, isQuoted: action.isQuoted };
    case UPDATE_SHIPPING_AMOUNT:
      console.log("UPDATE_SHIPPING_AMOUNT STATE = ", state);
      /* start - if voucher is selected, update shipping amount accordingly*/
      let voucherAmount = 0;
      if (state.orderSummary.appliedVoucherObj) {
        if (state.orderSummary.appliedVoucherObj.amountType == 0) {
          voucherAmount = state.orderSummary.appliedVoucherObj.flatAmount;
        } else {
          voucherAmount =
            state.orderSummary.appliedVoucherObj.amountTobeDeductedIfPercentage;
        }
      }
      /* end */
      return {
        ...state,
        orderSummary: {
          ...state.orderSummary,
          shippingAmount: action.shippingAmount,
          totalAmount:
            state.orderSummary.subAmount -
              voucherAmount +
              action.shippingAmount <
            0
              ? 0
              : state.orderSummary.subAmount -
                voucherAmount +
                action.shippingAmount,
        },
      };
    case UPDATE_CREDIT_AMOUNT:
      console.log("UPDATE_CREDIT_AMOUNT STATE = ", state.orderSummary, action);
      return {
        ...state,
        // ...state.orderSummary,
        // shippingAmount: action.shippingAmount,
        orderSummary: {
          ...state.orderSummary,
          creditAmount: action.creditAmount,
          totalAmountWithCredit: parseFloat(
            state.orderSummary.totalAmount - action.creditAmount
          ).toFixed(2),
        },
      };
    case UPDATE_APPLIED_VOUCHER:
      console.log(
        "UPDATE_APPLIED_VOUCHER STATE = ",
        state.orderSummary,
        action
      );
      // if selected voucher is flat amount
      if (action.appliedVoucherObj.amountType == 0) {
        return {
          ...state,
          // ...state.orderSummary,
          // shippingAmount: action.shippingAmount,
          orderSummary: {
            ...state.orderSummary,
            appliedVoucherObj: action.appliedVoucherObj,
            totalAmount:
              state.orderSummary.subAmount -
                action.appliedVoucherObj.flatAmount +
                state.orderSummary.shippingAmount <
              0
                ? 0
                : state.orderSummary.subAmount -
                  action.appliedVoucherObj.flatAmount +
                  state.orderSummary.shippingAmount,
            totalAmountWithCredit: parseFloat(
              state.orderSummary.subAmount -
                action.appliedVoucherObj.flatAmount +
                state.orderSummary.shippingAmount -
                state.orderSummary.creditAmount
            ).toFixed(2),
          },
        };
      }
      // if selected voucher is discount
      else {
        let subAmount = state.orderSummary.subAmount;
        let discountAmountAfterVoucher =
          (subAmount * action.appliedVoucherObj.discountPercentage) / 100;
        let amountTobeDeductedIfPercentage =
          discountAmountAfterVoucher <
          action.appliedVoucherObj.maxAmountIfPercentage
            ? discountAmountAfterVoucher
            : action.appliedVoucherObj.maxAmountIfPercentage;
        return {
          ...state,
          // ...state.orderSummary,
          // shippingAmount: action.shippingAmount,
          orderSummary: {
            ...state.orderSummary,
            appliedVoucherObj: {
              ...action.appliedVoucherObj,
              amountTobeDeductedIfPercentage: amountTobeDeductedIfPercentage,
            },
            totalAmount:
              state.orderSummary.subAmount -
              amountTobeDeductedIfPercentage +
              state.orderSummary.shippingAmount,
            totalAmountWithCredit: parseFloat(
              state.orderSummary.subAmount -
                amountTobeDeductedIfPercentage +
                state.orderSummary.shippingAmount -
                state.orderSummary.creditAmount
            ).toFixed(2),
          },
        };
      }

    default:
      return { ...state };
  }
};

export default cartReducer;
