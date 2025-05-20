export type NodeType = "start" | "if" | "action" | "end" | "condition";

export interface WorkFlowNode {
  id: string;
  type: NodeType;
  next?: string | string[]; // สำหรับ if อาจเป็น [truePath, falsePath]
  evaluate(context: any): Promise<void>; // หรือ return ค่าอะไรก็ได้
}
