import Koa from 'koa';
import convert from 'koa-convert';
import model from './model';
import CORS from 'koa-cors';
import OAuthServer from 'koa-oauth-server';
import getLogger from './utils/getLogger';
import loggerMiddleware from './middleware/logger';
import apiRoutes from './middleware/routes';
import oauthConfig from './config/oauth.config';
import CORSConfig from './config/cors.config';
import serverConfig from './config/server.config';

const
    app = new Koa(),
    log = getLogger(module),
    corsMiddleware = convert(CORS(CORSConfig)),
    env_config = serverConfig[app.env],
    { port } = env_config;

app.OAuthServer = OAuthServer({
    model,
    ...oauthConfig
});

const { routes, allowedMethods } = apiRoutes(app);

app
    .use(loggerMiddleware)
    .use(corsMiddleware)
    .use(routes())
    .use(allowedMethods())

    .listen(port, () => log.info(`server started ${port}`));

export default app;
