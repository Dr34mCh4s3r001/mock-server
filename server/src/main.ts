import { createDeps } from './di';
import { createApp } from './server';

const deps = createDeps();
const app = createApp(deps);

app.listen(deps.config.port, () => {
  console.log(`Server is running on http://localhost:${deps.config.port}`);
});
