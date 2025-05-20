"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
require("@xyflow/react/dist/style.css");
const Editor_1 = __importDefault(require("./page/Editor"));
function App() {
  return <Editor_1.default></Editor_1.default>;
}
