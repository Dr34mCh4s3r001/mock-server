import { Response } from "express";
import { BaseJsonNode, NodeId } from "./json-flow-spec";
import { NodeType, WorkFlowNode } from "./node";

export class HttpResponseNode implements WorkFlowNode {
  public readonly type: NodeType = "end";

  constructor(
    public id: string,
    private buildResponse: (context: any) => Promise<any>
  ) { }

  async evaluate(context: any) {
    const result = await this.buildResponse(context);
    context.result = result;
  }
}


// jsonhttp response

export function newJsonHttpResponse(spec: JsonHttpResponseNode) {
  const config = spec.config
  return new HttpResponseNode(spec.id, async (ctx) => {
    const res = ctx.res as Response
    res.status(config.httpStatus).json(config.json)
  })
}

type JsonHttpResProps = {
  httpStatus: number,
  json: object
}

export type JsonHttpResponseNode = BaseJsonNode & {
  node: 'jsonHttpResponse',
  type: 'action',
  config: JsonHttpResProps
}