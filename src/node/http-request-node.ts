import { BaseJsonNode, NodeId } from "./json-flow-spec";
import { NodeType, WorkFlowNode } from "./node";
import { Request } from "express";

export class HttpRequestNode implements WorkFlowNode {
  public readonly type: NodeType = "start";

  constructor(public id: string, public next: string, public req: Request) { }

  async evaluate(context: any) {
    context.http = { request: this.req };
  }
}


export type JsonHttpRequestNode = BaseJsonNode & {
  node: 'httpRequest',
  type: 'start',
  next: NodeId,
  config: HttpRequestConfig
}

type HttpRequestConfig = {
  path: string,
  method: HTTPMethod
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export function newHttpRequestFlow(spec: JsonHttpRequestNode, nodes: Record<string, WorkFlowNode>) {
  return (req: Request) => {
    return {
      [spec.id]: new HttpRequestNode(spec.id, spec.next, req),
      ...nodes
    }
  }
}