"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeItem;
const react_1 = __importDefault(require("react"));
function NodeItem({ icon, title, description }) {
  return (
    <div className="flex px-4 py-2 cursor-pointer hover:bg-gray-50">
      <div className="flex items-center mr-4">{icon}</div>
      <div className="flex-1 flex flex-col">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
