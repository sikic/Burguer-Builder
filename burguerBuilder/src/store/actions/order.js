import axios from "../../axios-orders";
import * as actionsType from "./actionsType";

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionsType.PURCHASE_BURGUER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseFail = (error) => {
  return {
    type: actionsType.PURCHASE_BURGUER_FAIL,
    error: error,
  };
};

export const purchaseBurguerStart = () => {
  return {
    type: actionsType.PURCHASE_BURGUER_START,
  };
};

export const initPurchase = (orderData, token) => {
  return (dispacth) => {
    dispacth(purchaseBurguerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispacth(purchaseSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispacth(purchaseFail(error));
      });
  };
};

export const initBurguer = () => {
  return {
    type: actionsType.PURCHASE_INIT,
  };
};

export const fecthOrderStart = () => {
  return {
    type: actionsType.FECTH_ORDER_START,
  };
};

export const fecthOrderSuccess = (orders) => {
  return {
    type: actionsType.FECTH_ORDER_SUCCESS,
    orders: orders,
  };
};

export const fecthOrderFail = (error) => {
  return {
    type: actionsType.FECTH_ORDER_FAILED,
    error: error,
  };
};

export const fecthOrders = (token, userId) => {
  return (dispacth) => {
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        console.log("entro");
        const fechrOrder = [];
        for (const key in res.data) {
          fechrOrder.push({ ...res.data[key], id: key });
        }
        dispacth(fecthOrderSuccess(fechrOrder));
      })
      .catch((err) => dispacth(fecthOrderFail(err)));
  };
};
