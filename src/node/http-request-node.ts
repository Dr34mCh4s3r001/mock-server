import { NodeType, WorkFlowNode } from "./node";
import { Request } from "express";

export class HttpRequestNode implements WorkFlowNode {
  public readonly type: NodeType = "start";

  constructor(public id: string, public next: string, public req: Request) {}

  async evaluate(context: any) {
    context.http = { request: this.req };
  }
}
