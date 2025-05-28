import { AppConfig } from '../app-config';
import { NodesFlow } from './flow';

export type FlowContext<T = {}> = T & {
  config: AppConfig
} & {
  [key: string]: any;
};

export class FlowExecutor {
  constructor(
    private nodes: NodesFlow,
    private startId: string,
  ) {}

  async run(context: FlowContext): Promise<any> {
    let currentId = this.startId;

    while (currentId) {
      console.log(`running node: `, currentId);
      const node = this.nodes[currentId];
      if (!node) throw new Error(`Node not found: ${currentId}`);

      await node.evaluate(context);
      if (!node.next) break;
      if (typeof node.next !== 'string')
        throw new Error(`condition node must have error logic at ${currentId}`);
      currentId = node.next;
    }

    return context.result;
  }
}
