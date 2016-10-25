import Koa from 'koa';
import convert from 'koa-convert';
import CORS from 'koa-cors';
import OAuthServer from 'koa-oauth-server';
import OAuthServerConfig from './oauth_server/config';
import CORSConfig from './config/cors.config';
import serverConfig from './config/server.config';
import getLogger from './libs/getLogger';
import logger from './middleware/logger';
import apiRoutes from './middleware/routes';

const
    app = new Koa(),
    log = getLogger(module),
    env_config = serverConfig[app.env],
    { port } = env_config,
    { routes, allowedMethods } = apiRoutes(app);

app.OAuthServer = OAuthServer(OAuthServerConfig);

app
    .use(logger)
    .use(convert(CORS(CORSConfig)))
    .use(routes())
    .use(allowedMethods())

    .listen(port, () => log.info(`server started ${port}`));

export default app;
