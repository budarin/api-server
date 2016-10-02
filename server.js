import Koa from 'koa';
import getLogger from './libs/log';
import handle500 from './middleware/500';
import handle404 from './middleware/404';
import logger from './middleware/logger';
import { routes, allowedMethods } from './middleware/routes';

const
    app = new Koa(),
    log = getLogger(module);

app.use(logger);
app.use(handle500);
app.use(handle404);
app.use(routes());
app.use(allowedMethods());

app.listen(80, () => log.info('server started 80'));

export default app;

