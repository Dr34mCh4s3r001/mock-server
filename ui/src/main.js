"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
require("./index.css");
const App_1 = __importDefault(require("./App"));
const react_2 = require("@xyflow/react");
(0, client_1.createRoot)(document.getElementById("root")).render(
  <react_1.StrictMode>
    <react_2.ReactFlowProvider>
      <App_1.default />
    </react_2.ReactFlowProvider>
  </react_1.StrictMode>,
);
