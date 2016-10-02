import Koa from 'koa';
import getLogger from './libs/log';
import handle500 from './middleware/500';
import handle404 from './middleware/404';
import logger from './middleware/logger';
import { routes, allowedMethods } from './middleware/routes';

const
    app = new Koa(),
    log = getLogger(module);

app
    .use(logger)
    .use(handle500)
    .use(handle404)
    .use(routes())
    .use(allowedMethods())
    .listen(80, () => log.info('server started 80'));

export default app;

