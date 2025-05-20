"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EndpointItem;
const EndpointItemLabel_1 = __importDefault(require("./EndpointItemLabel"));
const utils_1 = require("@/lib/utils");
function EndpointItem({ method, path, onSelect, active = false }) {
  return (
    <div
      className={(0, utils_1.cn)(
        "flex px-4 py-2 space-x-2 cursor-pointer hover:bg-gray-50",
        active && "bg-blue-100 font-semibold",
      )}
      onClick={onSelect}
    >
      <EndpointItemLabel_1.default
        method={method}
        path={path}
      ></EndpointItemLabel_1.default>
    </div>
  );
}
