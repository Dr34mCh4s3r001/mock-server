import { AppConfig } from './app-config';
import { FlowConfigService } from './flow';

export interface Dependencies {
  config: AppConfig;
  flowConfigService: FlowConfigService;
}

export function createDeps() {
  const appConfig = new AppConfig();
  const flowConfig = new FlowConfigService(appConfig.flowDir);

  return {
    config: appConfig,
    flowConfigService: flowConfig,
  };
}
