import Koa from 'koa';
import getLogger from './libs/getLogger';
import logger from './middleware/logger';
import { routes, allowedMethods } from './middleware/routes';

const
    app = new Koa(),
    log = getLogger(module);

app
    .use(logger)
    .use(routes())
    .use(allowedMethods())
    .listen(80, () => log.info('server started 80'));

export default app;

