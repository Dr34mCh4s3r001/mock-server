import fs from "fs";
import path from "path";
import { JsonFlowSpec, readFlowSpec } from "./json-flow-spec";

// Constants
const ROUTE_FILE_PATH = path.resolve(__dirname, "../http-req-flow-routes.ts");
const PRESERVE_LINES = 5;
const FLOW_DIR_PATH = path.resolve(__dirname, "../../flow");

const HEAD = `
// DO NOT EDIT !! this file is auto-generated
import { generateFromJson } from "./generator/json-flow-spec";
import { FlowExecutor } from "./node/flow-executor";
import {Router, Request, Response} from "express"

export const router = Router()`

function generateNewHttpReqFlowRoute(jsonFileName: string, spec: JsonFlowSpec): string {
    const httpReqNode = spec.nodes.find(n => n.node === 'httpRequest')
    if (!httpReqNode) throw new Error('ERR: Http Req node not found')
    return `
    \n
router.get("${httpReqNode.path}", async (req: Request, res: Response) => {
    const nodes = generateFromJson("./flow/${jsonFileName}")(req)
    const flow = new FlowExecutor(nodes, "${httpReqNode.id}");
    const result = await flow.run();
    res.send('ok')
})
`.trim();
}

export function regenerateRoutes() {
    // todo: refactor all these should read and check flow type before sending here
    // const file = fs.readFileSync(ROUTE_FILE_PATH, "utf-8");
    // const lines = file.split("\n").slice(0, PRESERVE_LINES); // keep first N lines


    const flows = fs.readdirSync(FLOW_DIR_PATH)
        .filter(file => fs.statSync(path.join(FLOW_DIR_PATH, file)).isFile())
        .map(f => {
            const flowSpec = readFlowSpec(`${FLOW_DIR_PATH}/${f}`); // assuming this parses the file into a FlowSpec
            return { filename: f, flowSpec: flowSpec };
        })
        .filter(res => checkHttpReqFlow(res.flowSpec))

    let content = HEAD
    for (const flow of flows) {
        content = content + "\n\n" + generateNewHttpReqFlowRoute(flow.filename, flow.flowSpec);
    }

    fs.writeFileSync(ROUTE_FILE_PATH, content, "utf-8");
    console.log("Routes file regenerated successfully.");
}

function checkHttpReqFlow(flow: JsonFlowSpec): boolean {
    const nodes = flow.nodes
    const httpReqNodes = nodes.filter(n => n.node === "httpRequest")
    return httpReqNodes.length === 1 ? true : false
}