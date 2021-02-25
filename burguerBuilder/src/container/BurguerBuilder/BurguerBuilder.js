import React, { Component } from "react";
import Auxiliar from "../../hoc/Auxiliar";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls"

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.2
}

export default class BurguerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 1,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };


  addIngredientHandler = (type) => {
    const oldCounter = this.state.ingredients[type];
    if (oldCounter <= 0)
      return;
    const updateCounter = oldCounter + 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updateCounter;
    const priceAddittion = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatePrice = oldPrice + priceAddittion;
    this.setState({ totalPrice: updatePrice, ingredients: updateIngredients })
  }

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
    this.setState({ totalPrice: updatePrice, ingredients: updateIngredients })
  }
  render() {
    return (
      <Auxiliar>
        <Burguer ingredients={this.state.ingredients} />
        <BuildControls add={this.addIngredientHandler} remove={this.removeIngredientHandler} />
      </Auxiliar>
    );
  }
}
