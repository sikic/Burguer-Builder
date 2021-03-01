import React, { Component } from "react";
import Auxiliar from "../../hoc/Auxiliar";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSumary from "../../components/Burguer/OrderSumary/OrderSumary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler.js";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.2,
};

class BurguerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    pruchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    axios
      .get(
        "https://react-my-burguer-luis-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

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
    this.setState({
      totalPrice: updatePrice,
      ingredients: updateIngredients,
    });
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
    this.setState({
      totalPrice: updatePrice,
      ingredients: updateIngredients,
    });
    this.updatePurchase(updateIngredients);
  };

  purcharseHandler = () => {
    this.setState({ purchasing: true });
  };
  closeModal = () => {
    this.setState({ purchasing: false });
  };
  purcharseContinue = () => {
    const queryParams = [];

    for (const i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>ingredients can´t be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Auxiliar>
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

      orderSummary = (
        <OrderSumary
          ingredients={this.state.ingredients}
          cancel={this.closeModal}
          continue={this.purcharseContinue}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) orderSummary = <Spinner />;
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

export default WithErrorHandler(BurguerBuilder, axios);
