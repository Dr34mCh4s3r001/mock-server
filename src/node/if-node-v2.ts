import { ConditionNode } from "./condition-node";
import { BaseJsonNode } from "./json-flow-spec";

export type IfNodeV2 = BaseJsonNode & {
    node: 'ifNode',
    type: 'condition',
    config: IfNodeConfig,
}

type IfNodeConfig = {
    ctxEvalFunc: string,
    nextNodes: string[],
}


export function newIfNodeV2(spec: IfNodeV2): ConditionNode {
    function ifCond(ctx: any){
        return eval(spec.config.ctxEvalFunc)
    }
    const node = new ConditionNode(
        spec.id,
        spec.config.nextNodes,
        ifCond
    )
    return node
}