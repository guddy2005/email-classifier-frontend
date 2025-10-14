import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Service worker for PWA capabilities
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Create root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register service worker for offline capabilities
serviceWorkerRegistration.unregister({
  onSuccess: () => {
    console.log("Service worker registration successful");
  },
  onUpdate: (registration) => {
    console.log("Service worker update available");
    // You can show a notification to the user here
    if (
      window.confirm("A new version is available. Would you like to update?")
    ) {
      registration.waiting?.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  },
});

// Performance monitoring
reportWebVitals((metric) => {
  // Log performance metrics
  console.log("Web Vitals:", metric);

  // You can send metrics to your analytics service
  // sendToAnalytics(metric);
});

// Global error handler
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  // You can send errors to your logging service
  // sendErrorToService(event.error);
});

// Unhandled promise rejection handler
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  // You can send errors to your logging service
  // sendErrorToService(event.reason);
});

// Development environment helpers
if (process.env.NODE_ENV === "development") {
  // Enable React DevTools profiling
  if (typeof window !== "undefined") {
    window.React = React;
  }

  // Log environment info
  console.log("🚀 Email Classifier App - Development Mode");
  console.log("📱 API URL:", "/");
}
