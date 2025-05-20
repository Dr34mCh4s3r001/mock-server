import { ConditionNode } from '../core/condition-node';
import { BaseNodeSpec } from '../node';

export type StringEvalSpec = BaseNodeSpec & {
  node: 'cond-string-eval';
  type: 'condition';
  config: StringEvalNodeConfig;
};

type StringEvalNodeConfig = {
  ctxEvalFunc: string;
  nextNodes: string[];
};

export function StringEvalNode(spec: StringEvalSpec): ConditionNode {
  async function ifCond(ctx: any) {
    return eval(spec.config.ctxEvalFunc) as string;
  }

  const node = new ConditionNode(spec.id, spec.config.nextNodes, ifCond);

  return node;
}
