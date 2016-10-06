import Koa from 'koa';
import config from './config.json';
import getLogger from './libs/getLogger';
import logger from './middleware/logger';
import { routes, allowedMethods } from './middleware/routes';

const
    app = new Koa(),
    log = getLogger(module),
    port = config[app.env].port;

app
    .use(async (ctx, next) => { ctx.rootPath = __dirname; await next(); })
    .use(logger)
    .use(routes())
    .use(allowedMethods())
    .listen(port, () => log.info(`server started ${port}`));

export default app;

