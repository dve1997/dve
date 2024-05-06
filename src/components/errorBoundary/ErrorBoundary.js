import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true,
    });
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <div style={{ color: "red", textAlign: "center", padding: "30px" }}>
            ERROR
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
