import React, { Component } from "react";
import classes from "./Modal.css";
import Auxiliar from "../../../hoc/Auxiliar";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      this.props.children !== nextProps.children
    );
  }
  render() {
    return (
      <Auxiliar>
        <Backdrop show={this.props.show} clicked={this.props.modalClose} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-500vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Auxiliar>
    );
  }
}

export default Modal;
