"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EndpointCodeEditor;
const react_1 = require("@monaco-editor/react");
const JSON_EXAMPLE = {
  $schema: "../schema/flow-schema.json",
  info: {
    name: "Example Flow",
  },
  nodes: [
    {
      id: "GetOTPRequest",
      node: "httpRequest",
      type: "start",
      path: "/otp/new",
      next: "ShowStart",
    },
    {
      id: "ShowStart",
      node: "messageNode",
      type: "action",
      message: "Test Json flow",
      next: "NextStep",
    },
    {
      id: "NextStep",
      node: "messageNode",
      type: "action",
      message: "Second Action",
    },
  ],
};
function EndpointCodeEditor({ editorMargin }) {
  return (
    <div className="h-screen bg-white">
      <div className="h-full w-full" style={{ marginTop: editorMargin }}>
        <react_1.Editor
          defaultLanguage="json"
          defaultValue={JSON.stringify(JSON_EXAMPLE, null, 2)}
        />
      </div>
    </div>
  );
}
