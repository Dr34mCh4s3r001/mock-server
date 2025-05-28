import { Response } from 'express';
import { ActionNode } from '../core/action-node';
import { BaseNodeSpec } from '../node';
import * as fs from 'fs';
import * as path from 'path';

export function HttpJsonFileResNode(spec: HttpJsonFileResSpec) {
  const config = spec.config;
  return new ActionNode(spec.id, spec.next, async (ctx) => {
    const res = ctx.res as Response;

    const { resourceDir } = ctx.config;
    const filePath = path.resolve(resourceDir, spec.config.file)
    const raw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(raw);
    res.status(config.httpStatus).json(json);
  });
}

type HttpJsonFileResConfig = {
  httpStatus: number;
  file: string;
};

export type HttpJsonFileResSpec = BaseNodeSpec & {
  node: 'http-json-file-res';
  type: 'action';
  config: HttpJsonFileResConfig;
};
