import { Response } from "express"
import { ActionNode } from "../action-node"
import { BaseNodeSpec } from "../node"

export function HttpJsonResNode(spec: HttpJsonResSpec) {
    const config = spec.config
    return new ActionNode(spec.id, spec.next, async (ctx) => {
        const res = ctx.res as Response
        res.status(config.httpStatus).json(config.json)
    })
}

type HttpJsonResConfig = {
    httpStatus: number,
    json: object
}

export type HttpJsonResSpec = BaseNodeSpec & {
    node: 'http-json-res',
    type: 'action',
    config: HttpJsonResConfig
}