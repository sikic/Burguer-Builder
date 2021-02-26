import React, { Component } from "react";
import Auxiliar from "../../hoc/Auxiliar";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSumary from "../../components/Burguer/OrderSumary/OrderSumary";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.2,
};

export default class BurguerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    pruchaseable: false,
    purchasing: false,
  };

  updatePurchase(ingredients) {
    const sum = Object.keys(ingredients)
      .map((elm) => {
        return ingredients[elm];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ pruchaseable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCounter = this.state.ingredients[type];
    const updateCounter = oldCounter + 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updateCounter;
    const priceAddittion = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatePrice = oldPrice + priceAddittion;
    this.setState({ totalPrice: updatePrice, ingredients: updateIngredients });
    this.updatePurchase(updateIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCounter = this.state.ingredients[type];
    const updateCounter = oldCounter - 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updateCounter;
    const priceAddittion = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatePrice = oldPrice - priceAddittion;
    this.setState({ totalPrice: updatePrice, ingredients: updateIngredients });
    this.updatePurchase(updateIngredients);
  };

  purcharseHandler = () => {
    this.setState({ purchasing: true });
  };
  closeModal = () => {
    this.setState({ purchasing: false });
  };
  purcharseContinue = () => {
    alert("You continue");
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Auxiliar>
        <Modal show={this.state.purchasing} modalClose={this.closeModal}>
          <OrderSumary
            ingredients={this.state.ingredients}
            cancel={this.closeModal}
            continue={this.purcharseContinue}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burguer ingredients={this.state.ingredients} />
        <BuildControls
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          pruchaseable={this.state.pruchaseable}
          ordered={this.purcharseHandler}
        />
      </Auxiliar>
    );
  }
}
