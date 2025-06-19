import {DELIVERY, PICKUP} from '../../data/enums';
export const mapCartItem = (Items) => {
  let Items_ = Items;
  let array = [];

  Items.map((i) => {
    array.push({
      product: {id: i.id},
      delivery_method: i.shippingMethod === DELIVERY ? 'DELIVERY' : 'PICKUP',
      quantity: i.qty,
    });
  });
  return array;
};

export const doWeHaveAnyDelivery = (cartItems) => {
  let i;
  for (i = 0; i < cartItems.length; i++) {
    if (cartItems[i].shippingMethod === DELIVERY) {
      return true;
    }
  }

  return false;
};

export const doWeHaveAnyPickup = (cartItems) => {
  let i;
  for (i = 0; i < cartItems.length; i++) {
    if (cartItems[i].shippingMethod === PICKUP) {
      return true;
    }
  }

  return false;
};
