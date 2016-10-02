import Koa from 'koa';
import err from './middleware/error';
import logger from './middleware/logger';
import { routes, allowedMethods } from './middleware/routes';
import getLogger from './libs/log';

const
    app = new Koa(),
    log = getLogger(module);

app.use(err);
app.use(logger);
app.use(routes());
app.use(allowedMethods());

app.listen(80, () => log.info('server started 80'));

export default app;

