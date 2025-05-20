import { Request, Response } from "express";
import fs from "fs"
import path from "path";
import { FlowSpec, generateFlow, readFlowSpec } from "./node/flow";
import { FlowExecutor } from "./node/flow-executor";
import { match } from "path-to-regexp";
import { HTTPMethod } from "./utils/types";
import { containNode } from "./node/features";

const cwd = process.cwd();

const FLOW_DIR_PATH = cwd + (process.env.FLOW_DIR_PATH ?? "/flow")
console.log('finding flow in ', FLOW_DIR_PATH)

let httpFlowSpecCache: FlowSpec[] = []
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
    const flowSpec = flowSearch[0]
    console.log('search flow result: ', flowSpec.info)
    const flow = generateFlow(flowSpec)
    const startNode = flowSpec.nodes.find(n => n.type === 'start')!
    // console.log('generated nodes:', nodes)
    const flowEx = new FlowExecutor(flow, startNode.id);
    const pathParams = getPathParams(startNode.config.path, reqPath)
    const context = { req, pathParams, res }
    const result = await flowEx.run(context);
}

export function reloadHttpReqFlowCache() {
    httpFlowSpecCache = populateHttpReqFlow()
}

function populateHttpReqFlow() {
    const jsonFlows = getJsonFlows(FLOW_DIR_PATH)
    console.log('found flow jsons:', jsonFlows.length)
    const httpRequestFlow = jsonFlows
        .map(readFlowSpec)
        .filter(f => containNode('http-request', f.nodes))
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

function findMatchPath(method: HTTPMethod, path: string, spec: FlowSpec): boolean {
    const result = spec.nodes
        .filter(n => n.node === "http-request")
        // .map(n => { console.log(n); return n })
        .filter(n => matchPath(n.config.path, path) && n.config.method === method)
    return result.length === 1 ? true : false
}

function last(arr: any[]) {
    return arr[arr.length - 1];
}

function matchPath(template: string, path: string): boolean {
    const matcher = match(template, { decode: decodeURIComponent });
    const result = matcher(path);
    if (!result) return false;
    return true
}

function getPathParams(template: string, path: string): null | Record<string, string> {
    const matcher = match(template, { decode: decodeURIComponent });
    const result = matcher(path);
    if (!result) return null;
    return result.params as Record<string, string>;
}