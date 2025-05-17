import { Request } from "express"
import { HttpRequestNode } from "../../node/http-request-node"
import { WorkFlowNode } from "../../node/node"
import { BaseJsonNode, NodeId } from "../json-flow-spec"

export type JsonHttpRequestNode = BaseJsonNode & {
    node: 'httpRequest',
    type: 'start',
    next: NodeId
    path: string,
}

export function newHttpRequestFlow(spec: JsonHttpRequestNode, nodes: Record<string, WorkFlowNode>) {
    return (req: Request) => {
        return {
            [spec.id]: new HttpRequestNode(spec.id, spec.next, req),
            ...nodes
        }
    }
}