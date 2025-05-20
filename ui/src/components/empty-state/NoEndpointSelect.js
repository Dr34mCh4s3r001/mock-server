"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NoEndpointSelect;
const EmptyState_1 = __importDefault(require("./EmptyState"));
function NoEndpointSelect() {
  return (
    <EmptyState_1.default
      icon="empty-state/no-endpoint-select.svg"
      title="No endpoint selected"
      description="Please select an endpoint from the sidebar to get started with your API exploration."
    />
  );
}
