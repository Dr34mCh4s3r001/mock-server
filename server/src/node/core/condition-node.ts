import { FlowContext } from '../flow-executor';
import { NodeId, NodeType, WorkFlowNode } from '../node';

export class ConditionNode implements WorkFlowNode {
  public readonly type: NodeType = 'condition';

  constructor(
    public id: string,
    public next: string | string[], // this will be string after resolved
    private condition: (context: FlowContext) => Promise<NodeId>,
  ) {}

  async evaluate(context: FlowContext): Promise<void> {
    const nextNodeId = await this.condition(context);
    // make sure the node exist assume next is a list when evaluate
    // todo: this might not needed
    // const nextNode = (this.next as NodeId[]).find(n => n === nextNodeId)
    // if(!nextNode) throw new Error(`Cannot find next |${nextNodeId}| in |${this.id}| node`)
    this.next = nextNodeId;
  }
}
