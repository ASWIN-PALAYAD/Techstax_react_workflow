import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./context/DnDContex.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
        <ReactFlowProvider>
          <DnDProvider>
            <App />
          </DnDProvider>
        </ReactFlowProvider>
    </Provider>
  </StrictMode>
);
