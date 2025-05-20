"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NodeToolboxDrawer;
const data_1 = require("@/data");
const NodeItem_1 = __importDefault(require("../node/NodeItem"));
function NodeToolboxDrawer({ isOpen }) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <aside
      className={`drawer ${isOpen ? "drawer-open" : ""}
    `}
    >
      <div className="p-4">
        <h2 className="font-semibold">Node toolbox</h2>
      </div>

      {data_1.NODE_TOOL.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          <NodeItem_1.default
            title={node.title}
            description={node.description}
            icon={node.icon}
          ></NodeItem_1.default>
        </div>
      ))}
    </aside>
  );
}
