import axios from "../../axios-orders";
import React, { Component } from "react";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Order from "../../components/Order/CheckOutsummary/Order";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispacthToProps = (Dispacth) => {
  return {
    onFecthOrders: (token, userId) =>
      Dispacth(actions.fecthOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(
  withErrorHandler(
    class componentName extends Component {
      componentDidMount() {
        this.props.onFecthOrders(this.props.token, this.props.userId);
      }
      render() {
        let orders = <Spinner />;

        if (!this.props.loading) {
          orders = this.props.orders.map((elm) => {
            return (
              <Order
                key={elm.id}
                ingredients={elm.ingredients}
                price={elm.price}
              />
            );
          });
        }

        return <div> {orders}</div>;
      }
    },
    axios
  )
);
