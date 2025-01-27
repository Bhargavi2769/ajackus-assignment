import React, { Component } from "react";

class ErrorBoundary extends Component {
    state = { hasError: false, errorMessage: "" };

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, info) {
        console.error("Error occurred:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div style={{ color: "red" }}>{this.state.errorMessage}</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
