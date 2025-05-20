import { NodesFlow } from "./flow";

export class FlowExecutor {
  constructor(
    private nodes: NodesFlow,
    private startId: string
  ) {}

  async run(context: any = {}): Promise<any> {
    let currentId = this.startId;

    while (currentId) {
      console.log(`running node: `, currentId)
      const node = this.nodes[currentId];
      if (!node) throw new Error(`Node not found: ${currentId}`);

      await node.evaluate(context);
      if(!node.next) break;
      if(typeof node.next !== 'string') throw new Error(`condition node must have error logic at ${currentId}`)
      currentId = node.next
    }

    return context.result;
  }
}
