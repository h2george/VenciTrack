import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 20, color: "red", background: "white", zIndex: 9999, position: "relative" }}>
                    <h1>Something went wrong.</h1>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error?.toString()}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
);
