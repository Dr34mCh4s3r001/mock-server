import { NodeType } from "./node"
import { MessageNode, newMessageNode } from "./message-node"
import { JsonHttpRequestNode, newHttpRequestFlow } from "./http-request-node";
import { JsonHttpResponseNode, newJsonHttpResponse } from "./http-response-node";

// generator
const fs = require('fs');

export function readFlowSpec(filePath: string): JsonFlowSpec{
    const raw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(raw) as JsonFlowSpec;
    return json
}

export function generateFromJson(filePath: string) {
    const spec = readFlowSpec(filePath)
    const nodesFlow = generateNodes(spec)
    return nodesFlow
}

export function generateNodes(spec: JsonFlowSpec) {
    // for this version that bound start node, we need to customize the start node generation
    const nodes = spec.nodes
    const startNode = findValidStartNode(nodes)
    const otherNodes: Record<string, any> = {};
    nodes.filter(n => n.type !== 'start')
        .forEach(n => {
            otherNodes[n.id] = NodeGenerator[n.node](n);
        });
    const nodesFlow = NodeGenerator[startNode.node](startNode, otherNodes)
    return nodesFlow
}

function findValidStartNode(nodes: BaseJsonNode[]): BaseJsonNode {
    const startNodes = nodes.filter(n => n.type === "start")
    if (startNodes.length < 1) {
        throw new Error('Cannot find start node')
    } else if (startNodes.length > 1) {
        throw new Error('There are more than 1 start node')
    } else {
        return startNodes[0]
    }
}

export function containNodes(targetNodeType: FeatureNodeType, nodes: JsonNode[]): boolean{
    return nodes.filter(n => n.node === targetNodeType).length === 1 ? true : false
}


// feature aggregration
type NodeGeneratorMap = Record<FeatureNodeType, any>
export const NodeGenerator: NodeGeneratorMap = {
    httpRequest: newHttpRequestFlow,
    messageNode: newMessageNode,
    jsonHttpResponse: newJsonHttpResponse
}

type JsonNode = JsonHttpRequestNode | MessageNode | JsonHttpResponseNode
// tried let ts compiler handle the feature type aggregration but it's not working well for generator type safety
type FeatureNodeType = 'httpRequest' | 'messageNode' | 'jsonHttpResponse'

// Core
export type JsonFlowSpec = {
    info: FlowInfo
    nodes: JsonNode[]
}

export type BaseJsonNode = {
    id: NodeId
    node: FeatureNodeType
    type: NodeType
    next?: NodeId
}

type FlowInfo = {
    name: string
}

export type NodeId = string
