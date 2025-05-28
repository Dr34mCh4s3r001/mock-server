import express from 'express';
import { resolveHttpFlow } from './flow';
import { Dependencies } from './di';

export function createApp(deps: Dependencies) {
  const { config, flowConfigService } = deps;

  const app = express();

  app.use(express.json());

  app.get('/flow/reload', (req, res) => {
    flowConfigService.reload();
    res.json({ message: 'Reloaded' })
  });

  app.use('/', (req, res) => resolveHttpFlow(config, flowConfigService.getFlow().httpFlowSpec, req, res));

  return app;
}
