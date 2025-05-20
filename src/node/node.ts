// import { FeatureNodeType } from "./features";

import { FeatureNodeType } from "./features";

export type NodeType = "start" | "action" | "condition";
export type NodeId = string

export interface WorkFlowNode {
  id: string;
  type: NodeType;
  next?: string | string[]; // สำหรับ if อาจเป็น [truePath, falsePath]
  evaluate(context: any): Promise<void>; // หรือ return ค่าอะไรก็ได้
}

export type BaseNodeSpec = {
    id: NodeId
    // node: FeatureNodeType // this will be auto parsed by TS
    type: NodeType
    next?: NodeId
}
