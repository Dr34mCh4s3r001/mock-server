import { Request, Response } from 'express';
import { FlowSpec, generateFlow } from '../node/flow';
import { FlowExecutor } from '../node/flow-executor';
import { match } from 'path-to-regexp';
import { HTTPMethod } from '../utils/types';

export async function resolveHttpFlow(
  httpFlowSpec: FlowSpec[],
  req: Request,
  res: Response,
): Promise<any> {
  const { path } = req;
  const method = req.method as HTTPMethod;

  console.log('req path ', path);

  const flowSearch = httpFlowSpec.filter((flow) => findMatchPath(method, path, flow));

  if (flowSearch.length !== 1) {
    res.status(404).send('Cannot find flow match the path and/or method');
    return;
  }

  const flowSpec = flowSearch[0];

  const startNode = flowSpec.nodes.find((n) => n.type === 'start')!;
  const pathParams = getPathParams(startNode.config.path, path);
  const flow = generateFlow(flowSpec);
  const flowEx = new FlowExecutor(flow, startNode.id);

  const result = await flowEx.run({ req, pathParams, res });

  return result;
}

function matchPath(template: string, path: string): boolean {
  const matcher = match(template, { decode: decodeURIComponent });
  const result = matcher(path);
  if (!result) return false;
  return true;
}

function findMatchPath(method: HTTPMethod, path: string, spec: FlowSpec): boolean {
  const result = spec.nodes
    .filter((n) => n.node === 'http-request')
    // .map(n => { console.log(n); return n })
    .filter((n) => matchPath(n.config.path, path) && n.config.method === method);
  return result.length === 1 ? true : false;
}

function getPathParams(template: string, path: string): null | Record<string, string> {
  const matcher = match(template, { decode: decodeURIComponent });
  const result = matcher(path);

  // TODO: zero value is better? cause prevent nullpointer
  if (!result) return null;

  return result.params as Record<string, string>;
}
