import { NodeType, WorkFlowNode } from "./node";

export class HttpResponseNode implements WorkFlowNode {
  public readonly type: NodeType = "end";

  constructor(
    public id: string,
    private buildResponse: (context: any) => Promise<any>
  ) {}

  async evaluate(context: any) {
    const result = await this.buildResponse(context);
    context.result = result;
  }
}
