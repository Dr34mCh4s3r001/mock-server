import { AppConfig } from './app-config';
import { FlowConfigService } from './flow';

export const appConfig = new AppConfig();
export const flowConfig = new FlowConfigService(appConfig.flowDir);
