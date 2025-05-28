import { FlowContext } from '../flow-executor';
import { NodeId, NodeType, WorkFlowNode } from '../node';

export class ActionNode implements WorkFlowNode {
  public type: NodeType = 'action';
  constructor(
    public id: NodeId,
    public next?: string,
    private action?: (context: FlowContext) => Promise<void>,
  ) {}

  async evaluate(context: FlowContext) {
    const action = this.action;

    if (!action) {
      return;
    }

    await action(context);
  }
}
