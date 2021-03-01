import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliar from "../../hoc/Auxiliar";

const WithErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = { error: null };
    componentWillMount() {
      this.reqInt = axios.interceptors.response.use((response) => {
        this.setState({ error: null });
        return response;
      });
      this.resInt = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInt);
      axios.interceptors.response.eject(this.resInt);
    }

    errorConfirmedHander = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxiliar>
          <Modal modalClose={this.errorConfirmedHander} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />;
        </Auxiliar>
      );
    }
  };
};

export default WithErrorHandler;
