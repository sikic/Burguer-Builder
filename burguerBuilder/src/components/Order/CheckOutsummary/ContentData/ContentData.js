import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import { connect } from "react-redux";
import wihtErrorHandler from "../../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    ing: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispachToProps = (dispacth) => {
  return {
    onOrderBurguer: (orderData, token) =>
      dispacth(actions.initPurchase(orderData, token)),
  };
};
export default wihtErrorHandler(
  connect(
    mapStateToProps,
    mapDispachToProps
  )(
    class componentName extends Component {
      state = {
        orderForm: {
          name: {
            elemntType: "input",
            elemntConfig: {
              type: "text",
              placeholder: "Your name",
            },
            value: "",
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
          },

          street: {
            elemntType: "input",
            elemntConfig: {
              type: "text",
              placeholder: "Your Street",
            },
            value: "",
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
          },
          CP: {
            elemntType: "input",
            elemntConfig: {
              type: "text",
              placeholder: "Your postal code",
            },
            value: "",
            validation: {
              required: true,
              minLength: 5,
              maxLength: 5,
            },
            valid: false,
            touched: false,
          },
          country: {
            elemntType: "input",
            elemntConfig: {
              type: "text",
              placeholder: "Your contry",
            },
            value: "",
            validation: {
              required: true,
            },
            touched: false,
          },
          email: {
            elemntType: "input",
            elemntConfig: {
              type: "email",
              placeholder: "Your email",
            },
            value: "",
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
          },
        },
        formIsValid: false,
      };

      orderHandler = (e) => {
        e.preventDefault();
        const data = {};
        for (const key in this.state.orderForm) {
          data[key] = this.state.orderForm[key].value;
        }
        const order = {
          ingredients: this.props.ing,
          price: this.props.price,
          orderData: data,
          userId: this.props.userId,
        };
        this.props.onOrderBurguer(order, this.props.token);
      };

      inputChangedHandler = (e, inputId) => {
        const form = {
          ...this.state.orderForm,
        };
        const elm = { ...form[inputId] };
        elm.value = e.target.value;
        elm.touched = true;
        elm.valid = this.chechValidity(elm.value, elm.validation);
        form[inputId] = elm;
        console.log(elm);
        this.setState({ orderForm: form });
      };

      chechValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
          isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
      };
      render() {
        const formElementsArray = [];
        for (const key in this.state.orderForm) {
          formElementsArray.push({
            id: key,
            config: this.state.orderForm[key],
          });
        }

        let form = this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {formElementsArray.map((elm) => {
              return (
                <Input
                  key={elm.id}
                  elemntType={elm.config.elemntType}
                  elemntConfig={elm.config.elemntConfig}
                  value={elm.config.value}
                  label={elm.id}
                  invalid={!elm.config.valid}
                  shouldValidate={elm.config.validation}
                  touched={elm.config.touched}
                  changed={(e) => this.inputChangedHandler(e, elm.id)}
                />
              );
            })}
            <Button btnType="Success" clicked={this.orderHandler}>
              ORDER
            </Button>
          </form>
        );

        return (
          <div className={classes.ContactData}>
            <h4>Enter you contact data</h4>
            {form}
          </div>
        );
      }
    }
  ),
  axios
);
