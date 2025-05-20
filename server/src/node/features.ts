import { StringEvalSpec, StringEvalNode } from './conditions/string-eval';
import { HttpJsonResNode, HttpJsonResSpec } from './http-responses/http-json-res';
import { ConsoleLogNode, ConsoleLogSpec } from './utilities/log-node';
import { BaseNodeSpec, WorkFlowNode } from './node';
import { HttpRequestNode, HttpRequestSpec } from './starts/http-request';

// function
export function generateNode(spec: FeatureNodeSpec) {
  return NodeGenerator[spec.node](spec);
}

export function containNode(targetNodeType: FeatureNodeType, nodes: FeatureNodeSpec[]): boolean {
  return nodes.filter((n) => n.node === targetNodeType).length === 1 ? true : false;
}

export function findValidStartNode(nodes: BaseNodeSpec[]): BaseNodeSpec {
  const startNodes = nodes.filter((n) => n.type === 'start');
  if (startNodes.length < 1) {
    throw new Error('Cannot find start node');
  } else if (startNodes.length > 1) {
    throw new Error('There are more than 1 start node');
  } else {
    return startNodes[0];
  }
}

// feature aggregration
type NodeGeneratorMap = Record<FeatureNodeType, (v: any) => WorkFlowNode>;
export const NodeGenerator: NodeGeneratorMap = {
  'http-request': HttpRequestNode,
  'cond-string-eval': StringEvalNode,
  'http-json-res': HttpJsonResNode,
  'log-console': ConsoleLogNode,
};

export type FeatureNodeType = FeatureNodeSpec['node'];
export type FeatureNodeSpec = HttpRequestSpec | StringEvalSpec | HttpJsonResSpec | ConsoleLogSpec;
