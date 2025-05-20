import express from 'express';
import { resolveHttpFlow } from './flow';
import { Dependencies } from './di';

export function createApp(deps: Dependencies) {
  const { flowConfigService } = deps;

  const app = express();

  app.use(express.json());

  app.get('/flow/reload', (req, res) => {
    flowConfigService.reload();
    res.send('Reloaded');
  });

  app.use('/', (req, res) => resolveHttpFlow(flowConfigService.getFlow().httpFlowSpec, req, res));

  return app;
}
