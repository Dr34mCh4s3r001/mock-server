"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Editor;
const NoEndpointSelect_1 = __importDefault(
  require("@/components/empty-state/NoEndpointSelect"),
);
const EndpointCodeEditor_1 = __importDefault(
  require("@/components/endpoint/EndpointCodeEditor"),
);
const EndpointVisual_1 = __importDefault(
  require("@/components/endpoint/EndpointVisual"),
);
const EditorNavigator_1 = __importDefault(
  require("@/components/layout/EditorNavigator"),
);
const EndpointDrawer_1 = __importDefault(
  require("@/components/layout/EndpointDrawer"),
);
const NodeToolbarDrawer_1 = __importDefault(
  require("@/components/layout/NodeToolbarDrawer"),
);
const react_1 = require("react");
function Editor() {
  const [isEndpointDrawerOpen, setIsEndpointDrawerOpen] = (0, react_1.useState)(
    false,
  );
  const [isNodeToolBoxDrawerOpen, setIsNodeToolBoxDrawer] = (0,
  react_1.useState)(false);
  const [selectedLayoutType, setSelectedLayoutType] = (0, react_1.useState)(
    "visual",
  );
  const [selectedEndpoint, setSelectedEndpoint] = (0, react_1.useState)(null);
  const toggleEndpointDrawer = () => {
    setIsEndpointDrawerOpen(!isEndpointDrawerOpen);
  };
  const toggleNodeToolBoxDrawer = () => {
    setIsNodeToolBoxDrawer(!isNodeToolBoxDrawerOpen);
  };
  const renderLayout = () => {
    switch (selectedLayoutType) {
      case "visual":
        return <EndpointVisual_1.default />;
      case "code":
        return <EndpointCodeEditor_1.default editorMargin="80px" />;
    }
  };
  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Endpoint */}
      <EndpointDrawer_1.default
        isOpen={isEndpointDrawerOpen}
        toggle={toggleEndpointDrawer}
        selectedEndpoint={selectedEndpoint}
        setSelectedEndpoint={setSelectedEndpoint}
      />

      {/* Main Content */}
      <div className="main-container relative">
        <EditorNavigator_1.default
          className="absolute top-0 left-0 z-50 w-full h-[80px]"
          isEndpointDrawerOpen={isEndpointDrawerOpen}
          toggleEndpointDrawer={toggleEndpointDrawer}
          isNodeToolBoxDrawerOpen={isNodeToolBoxDrawerOpen}
          toggleNodeToolBoxDrawer={toggleNodeToolBoxDrawer}
          selectedLayoutType={selectedLayoutType}
          setSelectedLayoutType={setSelectedLayoutType}
          selectedEndpoint={selectedEndpoint}
        />
        {!selectedEndpoint ? (
          <NoEndpointSelect_1.default />
        ) : (
          <>{renderLayout()}</>
        )}
      </div>

      {/* Tool box */}
      <NodeToolbarDrawer_1.default
        isOpen={isNodeToolBoxDrawerOpen}
        toggle={toggleNodeToolBoxDrawer}
      />
    </div>
  );
}
