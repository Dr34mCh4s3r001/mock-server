"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EndpointDrawer;
const data_1 = require("@/data");
const EndpointItem_1 = __importDefault(require("../endpoint/EndpointItem"));
function EndpointDrawer({ isOpen, selectedEndpoint, setSelectedEndpoint }) {
  const isSelect = (selected, target) => {
    if (!selected) {
      return false;
    }
    const selectedPath = selected.method + selected.path;
    const targetPath = target.method + target.path;
    return selectedPath === targetPath;
  };
  return (
    <aside
      className={`drawer ${isOpen ? "drawer-open" : ""}
    `}
    >
      <div className="p-4">
        <h2 className="font-semibold">Endpoint</h2>
      </div>

      {data_1.MOCK_ENDPOINT.map((endpoint) => (
        <div key={endpoint.path}>
          <EndpointItem_1.default
            method={endpoint.method}
            path={endpoint.path}
            onSelect={() => setSelectedEndpoint(endpoint)}
            active={isSelect(selectedEndpoint, endpoint)}
          ></EndpointItem_1.default>
        </div>
      ))}
    </aside>
  );
}
