import { HTTPMethod } from "../../utils/types";
import { BaseNodeSpec, NodeId } from "../node";
import { StartNode } from "../start-node";
import { Request, Response } from "express";

type HttpRequestNodeCtx = {
    req: Request
    reqPathParams?: Record<string, string>
    res: Response
}


export type HttpRequestSpec = BaseNodeSpec & {
    node: 'http-request',
    type: 'start',
    next: NodeId,
    config: HttpRequestNodeConfig
}

type HttpRequestNodeConfig = {
    path: string,
    method: HTTPMethod
}

export function HttpRequestNode(spec: HttpRequestSpec): StartNode<HttpRequestNodeCtx> {
    async function validateCtx(ctx: any) {
        if (!ctx.req || !ctx.res) {
            return false
        }
        return true
    }
    return new StartNode<HttpRequestNodeCtx>(
        spec.id,
        spec.next,
        validateCtx
    )
}
