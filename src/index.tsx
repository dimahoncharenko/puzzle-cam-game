// Babel polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";

import React, { StrictMode } from "react";
import { render } from "react-dom";

// Imports styles
import "./styles";

// Imports components
import { App } from "./App";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
