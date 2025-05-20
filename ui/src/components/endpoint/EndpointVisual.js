"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EndpointVisual;
const react_1 = require("@xyflow/react");
const react_2 = __importStar(require("react"));
// TODO resolve this in react way
let id = 0;
function EndpointVisual() {
  const getId = () => `node_${id++}`;
  const [nodes, setNodes] = (0, react_2.useState)([]);
  const [edges, setEdges] = (0, react_2.useState)([]);
  const { screenToFlowPosition } = (0, react_1.useReactFlow)();
  const onNodesChange = (0, react_2.useCallback)(
    (changes) => setNodes((nds) => (0, react_1.applyNodeChanges)(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = (0, react_2.useCallback)(
    (changes) => setEdges((eds) => (0, react_1.applyEdgeChanges)(changes, eds)),
    [setEdges],
  );
  const onDrop = (event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("application/reactflow");
    if (!nodeType) return;
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    const newNode = {
      id: getId(),
      type: nodeType,
      position,
      data: { label: `${nodeType} node` },
    };
    setNodes((nds) => nds.concat(newNode));
  };
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  return (
    <react_1.ReactFlow
      nodes={nodes}
      edges={edges}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    >
      <react_1.Controls />
      <react_1.MiniMap />
      <react_1.Background
        variant={react_1.BackgroundVariant.Dots}
        gap={12}
        size={1}
      />
    </react_1.ReactFlow>
  );
}
