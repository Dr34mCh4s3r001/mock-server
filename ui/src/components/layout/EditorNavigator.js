"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorNavigator;
const utils_1 = require("@/lib/utils");
const button_1 = require("../ui/button");
const lucide_react_1 = require("lucide-react");
const tabs_1 = require("../ui/tabs");
const EndpointItemLabel_1 = __importDefault(
  require("../endpoint/EndpointItemLabel"),
);
function EditorNavigator({
  className,
  isEndpointDrawerOpen,
  toggleEndpointDrawer,
  isNodeToolBoxDrawerOpen,
  toggleNodeToolBoxDrawer,
  selectedLayoutType,
  setSelectedLayoutType,
  selectedEndpoint,
}) {
  return (
    <nav
      className={(0, utils_1.cn)("bg-transparent text-white p-4", className)}
    >
      <div className="flex justify-between items-center">
        {/* Endpoint bar */}
        <div className="menu-bar">
          <button_1.Button
            variant="outline"
            size="icon"
            onClick={toggleEndpointDrawer}
          >
            {isEndpointDrawerOpen ? (
              <lucide_react_1.X />
            ) : (
              <lucide_react_1.Menu />
            )}
          </button_1.Button>
          {selectedEndpoint && (
            <EndpointItemLabel_1.default
              method={selectedEndpoint.method}
              path={selectedEndpoint.path}
            />
          )}
        </div>

        <div className="flex-1"></div>

        {/* Layout selector */}
        {selectedEndpoint && (
          <div className="menu-bar">
            <tabs_1.Tabs
              defaultValue={selectedLayoutType}
              onValueChange={(value) => setSelectedLayoutType(value)}
            >
              <tabs_1.TabsList>
                <tabs_1.TabsTrigger value="visual">Visual</tabs_1.TabsTrigger>
                <tabs_1.TabsTrigger value="code">Code</tabs_1.TabsTrigger>
              </tabs_1.TabsList>
            </tabs_1.Tabs>
          </div>
        )}

        <div className="flex-1"></div>

        {/* Menu bar */}
        {selectedEndpoint && (
          <div className="menu-bar">
            <button_1.Button>Save</button_1.Button>
            <button_1.Button
              variant="outline"
              size="icon"
              onClick={toggleNodeToolBoxDrawer}
            >
              {isNodeToolBoxDrawerOpen ? (
                <lucide_react_1.X />
              ) : (
                <lucide_react_1.Puzzle />
              )}
            </button_1.Button>
          </div>
        )}
      </div>
    </nav>
  );
}
