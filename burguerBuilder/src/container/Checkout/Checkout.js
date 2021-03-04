import React, { Component } from "react";
import CheckOutsummary from "../../components/Order/CheckOutsummary/CheckOutsummary";
import { Route, Redirect } from "react-router-dom";
import ContentData from "../../components/Order/CheckOutsummary/ContentData/ContentData";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    ing: state.burguerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(
  class componentName extends Component {
    cancelCheckOut = () => {
      this.props.history.goBack();
    };

    continueCheckOut = () => {
      this.props.history.replace("/checkout/contact-data");
    };
    render() {
      let summary = <Redirect to="/" />;
      let purchaseRedirect;
      if (this.props.ing) {
        purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      }
      summary = (
        <div>
          {purchaseRedirect}
          <CheckOutsummary
            ingredients={this.props.ing}
            cancelCheckOut={this.cancelCheckOut}
            continueCheckOut={this.continueCheckOut}
          />

          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContentData}
          />
        </div>
      );
      return summary;
    }
  }
);
