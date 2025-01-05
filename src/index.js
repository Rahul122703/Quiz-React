import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// import Final from "../../react-projects-minimal/src/23-quiz/final/src/App";
// import { AppProvider } from "../../react-projects-minimal/src/23-quiz/final/src/context";

import Setup from "../../react-projects-minimal/src/23-quiz/setup/src/App";
import { AppProvider } from "../../react-projects-minimal/src/23-quiz/setup/src/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      {/* <Final /> */}
      <Setup />
    </AppProvider>
  </React.StrictMode>
);
