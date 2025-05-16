import { NodeType, WorkFlowNode } from "./node";

export class ActionNode implements WorkFlowNode {
  constructor(
    public id: string,
    public type: NodeType = "action",
    public next?: string,
    private action?: (context: any) => Promise<void>
  ) {}

  async evaluate(context: any) {
    const action = this.action;

    if (!action) {
      return;
    }

    await action(context);
  }
}
