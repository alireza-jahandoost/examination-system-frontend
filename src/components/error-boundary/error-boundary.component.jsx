import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { error: false, message: "" };

  static getDerivedStateFromError(error) {
    const status = error?.response?.status;
    if (status) {
      return { error, message: status };
    } else {
      return { error, message: "something went wrong" };
    }
  }

  componentDidCatch(error) {
    // Log or store the error
  }

  render() {
    return this.state.error ? <p>{this.state.message}</p> : this.props.children;
  }
}
