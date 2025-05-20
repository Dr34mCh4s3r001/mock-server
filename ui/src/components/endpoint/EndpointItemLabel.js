"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodColorMap = void 0;
exports.default = EndpointItemLabel;
const utils_1 = require("@/lib/utils");
exports.methodColorMap = {
  GET: "text-green-500",
  POST: "text-blue-500",
  PUT: "text-yellow-500",
  DELETE: "text-red-500",
};
function EndpointItemLabel({ method, path }) {
  return (
    <>
      <p
        className={(0, utils_1.cn)(
          exports.methodColorMap[method],
          "text-sm",
          "font-semibold",
          "me-2",
        )}
      >
        {method}
      </p>
      <p className="text-sm text-muted-foreground">{path}</p>
    </>
  );
}
