import { NodeId, NodeType, WorkFlowNode } from '../node';

export class StartNode<T> implements WorkFlowNode {
  public type: NodeType = 'start';
  constructor(
    public id: NodeId,
    public next?: string, // ? do we really require this ???
    private validateContext?: (context: any) => Promise<boolean>,
  ) {}

  async evaluate(context: T) {
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
