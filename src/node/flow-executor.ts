import { WorkFlowNode } from "./node";

export class FlowExecutor {
  constructor(
    private nodes: Record<string, WorkFlowNode>,
    private startId: string
  ) {}

  async run(context: any = {}): Promise<any> {
    let currentId = this.startId;

    while (currentId) {
      const node = this.nodes[currentId];
      if (!node) throw new Error(`Node not found: ${currentId}`);

      await node.evaluate(context);

      if (node.type === "if") {
        const branchIndex = context.__branch; // 0 or 1
        currentId = (node.next as string[])[branchIndex];
      } else {
        currentId = node.next as string;
      }
    }

    return context.result;
  }
}
