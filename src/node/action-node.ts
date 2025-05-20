import { NodeId, NodeType, WorkFlowNode } from "./node";

export class ActionNode implements WorkFlowNode {
  public type: NodeType = "action"
  constructor(
    public id: NodeId,
    public next?: string,
    private action?: (context: any) => Promise<void>
  ) { }

  async evaluate(context: any) {
    const action = this.action;

    if (!action) {
      return;
    }

    await action(context);
  }
}
