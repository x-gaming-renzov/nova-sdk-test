import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NovaProvider } from "nova-react-sdk";
import NovaRegistry from "./nova-objects.json";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NovaProvider
      config={{
        organisationId: "org123",
        appId: "app123",
        //apiEndpoint: "https://nova-manager-475016739432.us-central1.run.app",
        apiEndpoint: "http://localhost:8000",
        registry: NovaRegistry,
      }}
    >
      <App />
    </NovaProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
