import Koa from 'koa';
import err from './middleware/error';
import logger from './middleware/logger';
import { routes, allowedMethods } from './middleware/routes';

const app = new Koa();

app.use(err);
app.use(logger);
app.use(routes());
app.use(allowedMethods());

app.listen(80, () => console.log('server started 80'));

export default app;

