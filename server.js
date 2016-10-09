import Koa from 'koa';
import config from './config';
import getLogger from './libs/getLogger';
import logger from './middleware/logger';
import { routes, allowedMethods } from './middleware/routes';

const
    app = new Koa(),
    log = getLogger(module),
    env_config = config[app.env],
    port = env_config.port;

app
    .use(logger)
    .use(routes())
    .use(allowedMethods())
    .listen(port, () => log.info(`server started ${port}`));

export default app;

