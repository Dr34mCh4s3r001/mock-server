import { NodeType, WorkFlowNode } from "../node/node"
import { JsonHttpRequestNode, newHttpRequestFlow } from "./features/httpRequest"
import { MessageNode, newMessageNode } from "./features/messageNode"

export const exampleJson: JsonFlowSpec = {
    info: { name: 'Example Flow' },
    nodes: [
        {
            id: "GetOTPRequest",
            node: "httpRequest",
            type: "start",
            path: "/otp/new",
            next: "ShowStart"
        },
        {
            id: 'ShowStart',
            node: "messageNode",
            type: "action",
            message: "Test starting flow"
        }

    ]
}

// generator
const fs = require('fs');

export function generateFromJson(filePath: string) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(raw);
    const nodesFlow = generateNodes(json)
    return nodesFlow
}

export function generateNodes(spec: JsonFlowSpec) {
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


// feature aggregration
type NodeGeneratorMap = Record<FeatureNodeType, any>
export const NodeGenerator: NodeGeneratorMap = {
    httpRequest: newHttpRequestFlow,
    messageNode: newMessageNode
}

type JsonNode = JsonHttpRequestNode | MessageNode
// let ts compiler handle the feature type aggregration but it's not working well for generator type safety
type FeatureNodeType = 'httpRequest' | 'messageNode'

// Core
type JsonFlowSpec = {
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
