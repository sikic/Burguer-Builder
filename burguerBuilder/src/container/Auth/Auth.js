import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import * as actionsType from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

const mapStatetoProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    building: state.burguerBuilder.building,
    authRedirect: state.auth.authRedirect,
  };
};

const mapDispacthtoProps = (dispatch) => {
  return {
    onAuth: (email, password, isSingup) =>
      dispatch(actionsType.auth(email, password, isSingup)),
    onSetAuthRedirect: () => dispatch(actionsType.setAuthRedirect("./")),
  };
};

class Auth extends Component {
  state = {
    controls: {
      email: {
        elemntType: "input",
        elemntConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
      },
      password: {
        elemntType: "input",
        elemntConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
    isSingup: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirect !== "./") {
      this.props.onSetAuthRedirect();
    }
  }

  swicthAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSingup: !prevState.isSingup };
    });
  };
  inputChangedHandler = (e, controlName) => {
    const form = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.chechValidity(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: form });
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
  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSingup
    );
  };
  render() {
    const formElementsArray = [];
    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    const form = this.props.loading ? (
      <Spinner />
    ) : (
      formElementsArray.map((elm) => (
        <Input
          kye={elm.id}
          elemntType={elm.config.elemntType}
          elemntConfig={elm.config.elemntConfig}
          value={elm.config.value}
          label={elm.id}
          invalid={!elm.config.valid}
          shouldValidate={elm.config.validation}
          touched={elm.config.touched}
          changed={(e) => this.inputChangedHandler(e, elm.id)}
        />
      ))
    );

    let errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    if (this.props.token) {
      return <Redirect to={this.props.authRedirect} />;
    } else {
      return (
        <div className={classes.Auth}>
          {errorMessage}
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Success">Submit</Button>
            <Button btnType="Danger" clicked={this.swicthAuthModeHandler}>
              Swicth to {this.state.isSingup ? "signIn" : "signUp"}
            </Button>
          </form>
        </div>
      );
    }
  }
}

export default connect(mapStatetoProps, mapDispacthtoProps)(Auth);
