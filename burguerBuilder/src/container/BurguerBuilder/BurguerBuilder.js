import React, { Component } from "react";
import Auxiliar from "../../hoc/Auxiliar";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSumary from "../../components/Burguer/OrderSumary/OrderSumary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler.js";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurguerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.init();
  }

  updatePurchase(ingredients) {
    const sum = Object.keys(ingredients)
      .map((elm) => {
        return ingredients[elm];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purcharseHandler = () => {
    if (this.props.token) this.setState({ purchasing: true });
    else {
      this.props.redirect("/checkout");
      this.props.history.push("/auth");
    }
  };
  closeModal = () => {
    this.setState({ purchasing: false });
  };
  purcharseContinue = () => {
    this.props.initBurguer();
    this.props.history.push("/checkout");
  };
  render() {
    const disabledInfo = {
      ...this.props.ing,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>ingredients can´t be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ing) {
      burger = (
        <Auxiliar>
          <Burguer ingredients={this.props.ing} />
          <BuildControls
            add={this.props.add}
            remove={() => this.props.remove()}
            disabledInfo={disabledInfo}
            price={this.props.price}
            pruchaseable={this.updatePurchase}
            ordered={this.purcharseHandler}
            token={this.props.token}
          />
        </Auxiliar>
      );

      orderSummary = (
        <OrderSumary
          ingredients={this.props.ing}
          cancel={this.closeModal}
          continue={this.purcharseContinue}
          price={this.props.price}
        />
      );
    }
    return (
      <Auxiliar>
        <Modal show={this.state.purchasing} modalClose={this.closeModal}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    error: state.burguerBuilder.error,
    token: state.auth.token,
  };
};
const mapDispacthToProps = (dispatch) => {
  return {
    add: (name) => dispatch(actions.addIngredient(name)),
    remove: (name) => dispatch(actions.removeIngredient(name)),
    init: () => dispatch(actions.initIngredients()),
    initBurguer: () => dispatch(actions.initBurguer()),
    redirect: (path) => dispatch(actions.setAuthRedirect(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(WithErrorHandler(BurguerBuilder, axios));
