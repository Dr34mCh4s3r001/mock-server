import fs from 'fs';
import path from 'path';
import { FlowSpec, readFlowSpec } from '../node/flow';
import { getLast } from '../utils/array';
import { containNode } from '../node/features';

export interface FlowConfig {
  httpFlowSpec: FlowSpec[];
}

export class FlowConfigService {
  private dir: string;
  private flow: FlowConfig = {
    httpFlowSpec: [],
  };

  constructor(dir: string) {
    this.dir = dir;
    console.log('FlowConfigService: using flow dir', this.dir);
    this.loadConfig();
  }

  public getFlow(): FlowConfig {
    return this.flow;
  }

  public reload(): void {
    this.loadConfig();
  }

  private loadConfig(): FlowConfig {
    const flow = this.getFlows();

    const httpFlowSpec = this.getHttpFlowSpec(flow);

    this.flow = {
      httpFlowSpec,
    };

    return this.flow;
  }

  private getHttpFlowSpec(flows: string[]): FlowSpec[] {
    const httpFlowSpec = flows
      .map(readFlowSpec)
      .filter((f) => containNode('http-request', f.nodes));

    console.log('FlowConfigService: http flow populated', httpFlowSpec.length);

    return httpFlowSpec;
  }

  private getFlows(): string[] {
    return fs
      .readdirSync(this.dir)
      .filter((file) => fs.statSync(path.join(this.dir, file)).isFile())
      .filter((file) => getLast(file.split('.')) === 'json')
      .map((file) => path.join(this.dir, file));
  }
}
