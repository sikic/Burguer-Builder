import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const mapDispachToProps = (dispatch) => {
  return {
    onLongOut: () => dispatch(actions.logOut()),
  };
};
export class Logout extends Component {
  componentDidMount() {
    this.props.onLongOut();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default connect(null, mapDispachToProps)(Logout);
