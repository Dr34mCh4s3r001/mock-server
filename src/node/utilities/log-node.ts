import { ActionNode } from "../action-node"
import { BaseNodeSpec } from "../node"

export type ConsoleLogSpec = BaseNodeSpec & {
    node: 'log-console',
    type: 'action',
    config: ConsoleLogConfig
}

type ConsoleLogConfig = {
    message: string
}


export function ConsoleLogNode(spec: ConsoleLogSpec): ActionNode {
    const action = async () => { console.log(spec.config.message) }
    const node = new ActionNode(
        spec.id,
        spec.next,
        action
    )
    return node
}