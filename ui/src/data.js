"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCK_ENDPOINT = exports.HttpMethod = exports.NODE_TOOL = void 0;
const lucide_react_1 = require("lucide-react");
exports.NODE_TOOL = [
  {
    icon: <lucide_react_1.Play />,
    title: "Input",
    type: "input",
    description: "Data received for processing in this node",
  },
  {
    icon: <lucide_react_1.CircleSmall />,
    title: "Output",
    type: "output",
    description: "Data produced after processing by this node",
  },
];
var HttpMethod;
(function (HttpMethod) {
  HttpMethod["GET"] = "GET";
  HttpMethod["POST"] = "POST";
  HttpMethod["PUT"] = "PUT";
  HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (exports.HttpMethod = HttpMethod = {}));
exports.MOCK_ENDPOINT = [
  {
    method: HttpMethod.GET,
    path: "/api/data",
  },
  {
    method: HttpMethod.POST,
    path: "/api/data",
  },
  {
    method: HttpMethod.DELETE,
    path: "/api/data/:id",
  },
];
