import { Request, Response } from "express";
import fs from "fs"
import path from "path";
import { containNodes, generateNodes, JsonFlowSpec, readFlowSpec } from "./node/json-flow-spec";
import { FlowExecutor } from "./node/flow-executor";
import { HTTPMethod } from "./node/http-request-node";

const cwd = process.cwd();

const FLOW_DIR_PATH = cwd + (process.env.FLOW_DIR_PATH ?? "/flow")
console.log('finding flow in ', FLOW_DIR_PATH)

let httpFlowSpecCache: JsonFlowSpec[] = []
httpFlowSpecCache = populateHttpReqFlow()
console.log(httpFlowSpecCache)

const file = fs.readdirSync(FLOW_DIR_PATH)
    .filter(file => fs.statSync(path.join(FLOW_DIR_PATH, file)).isFile())

console.log(file)


export async function httpFlowResolver(req: Request, res: Response) {
    const reqPath = req.path
    const reqMethod = req.method as HTTPMethod
    console.log('req path ', reqPath)
    const flowSearch = httpFlowSpecCache.filter(flow => findMatchPath(reqMethod, reqPath, flow))
    if (flowSearch.length !== 1) {
        res.status(404).send('Cannot find flow match the path and/or method')
        return
    }
    const flow = flowSearch[0]
    console.log('search flow result: ', flow)
    // special for http need to supply req
    const nodes = generateNodes(flow)(req)
    // console.log('generated nodes:', nodes)
    const flowEx = new FlowExecutor(nodes, flow.nodes.find(n => n.type === 'start')!.id);
    const context = { req, res }
    const result = await flowEx.run(context);
    // assume all req flow have sent
    // if (!result) {
    //     res.send('ok')
    // } else {
    //     res.json(result)
    // }
    // console.log('context', context)
}

export function reloadHttpReqFlowCache() {
    httpFlowSpecCache = populateHttpReqFlow()
}

function populateHttpReqFlow() {
    const jsonFlows = getJsonFlows(FLOW_DIR_PATH)
    console.log('found flow jsons:', jsonFlows.length)
    const httpRequestFlow = jsonFlows
        .map(readFlowSpec)
        .filter(f => containNodes('httpRequest', f.nodes))
    console.log('http flow populated:', httpRequestFlow.length)
    return httpRequestFlow
}

function getJsonFlows(dirPath: string): string[] {
    const jsonFlows = fs.readdirSync(dirPath)
        .filter(file => fs.statSync(path.join(dirPath, file)).isFile())
        .filter(file => last(file.split('.')) === 'json')
        .map(file => dirPath + '/' + file)
    return jsonFlows
}

function findMatchPath(method: HTTPMethod, path: string, spec: JsonFlowSpec): boolean {
    const result = spec.nodes
        .filter(n => n.node === "httpRequest")
        // .map(n => { console.log(n); return n })
        .filter(n => n.config.path === path && n.config.method === method)
    return result.length === 1 ? true : false
}

function last(arr: any[]) {
    return arr[arr.length - 1];
}