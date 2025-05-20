import { FeatureNodeSpec, generateNode } from "./features";
import { WorkFlowNode } from "./node";

export type NodesFlow = Record<string, WorkFlowNode>

// generator
const fs = require('fs');

export function readFlowSpec(filePath: string): FlowSpec {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(raw) as FlowSpec;
    return json
}

export function generateFromJson(filePath: string): NodesFlow {
    const spec = readFlowSpec(filePath)
    const nodesFlow = generateFlow(spec)
    return nodesFlow
}

export function generateFlow(flowSpec: FlowSpec): NodesFlow {
    const nodesSpec = flowSpec.nodes
    const nodes = nodesSpec.map(generateNode)
    const flow: NodesFlow = {}
    nodes.forEach(n => {
        flow[n.id] = n
    })
    return flow
}

// Core
export type FlowSpec = {
    info: FlowInfo
    nodes: FeatureNodeSpec[]
}

type FlowInfo = {
    name: string
}