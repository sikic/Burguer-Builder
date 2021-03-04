import * as actionsType from "../actions/actionsType";
import { updateObject } from "../utils";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};
export const reducerOrder = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.PURCHASE_BURGUER_START:
      return updateObject(state, { loading: true, purchased: false });

    case actionsType.PURCHASE_BURGUER_SUCCESS:
      const newOrder = updateObject(action.orderData, {
        id: action.orderId,
      });
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      });

    case actionsType.PURCHASE_BURGUER_FAIL:
      return updateObject(state, { loading: false });

    case actionsType.PURCHASE_INIT:
      return updateObject(state, { purchased: false });

    case actionsType.FECTH_ORDER_START:
      return updateObject(state, { loading: true });

    case actionsType.FECTH_ORDER_SUCCESS:
      return updateObject(state, { orders: action.orders, loading: false });

    case actionsType.FECTH_ORDER_FAILED:
      return updateObject(state, { purchased: false });
    default:
      return state;
  }
};
