import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export class AppConfig {
  readonly env: string;
  readonly port: number;
  readonly flowDir: string;
  readonly resourceDir: string

  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.flowDir = process.env.FLOW_DIR || path.resolve(process.cwd(), 'flow');
    this.resourceDir = process.env.RESOURCE_DIR || path.resolve(process.cwd(), 'flow/resource');
  }
}
