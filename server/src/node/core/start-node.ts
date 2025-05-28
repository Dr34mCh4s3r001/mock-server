import { FlowContext } from '../flow-executor';
import { NodeId, NodeType, WorkFlowNode } from '../node';


export class StartNode<T> implements WorkFlowNode {
  public type: NodeType = 'start';

  constructor(
    public id: NodeId,
    public next?: string, // ? do we really require this ???
    private validateContext?: (context: FlowContext<T>) => Promise<boolean>,
  ) {}

  async evaluate(context: FlowContext<T>) {
    if (!this.validateContext) {
      return;
    }
    const valid = await this.validateContext(context);
    if (!valid) {
      // todo: more graceful error
      throw new Error(`Start node invalid context node: ${this.id}`);
    }
  }
}
