import { ActionNode } from "./action-node"
import { BaseJsonNode } from "./json-flow-spec"

export type MessageNode = BaseJsonNode & {
    node: 'messageNode',
    type: 'action',
    message: string
}


export function newMessageNode(spec: MessageNode): ActionNode {
    const action = async () => { console.log(spec.message) }
    const node = new ActionNode(
        spec.id,
        spec.type,
        spec.next,
        action
    )
    return node
}