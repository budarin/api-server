import Koa from 'koa';
import convert from 'koa-convert';
import cors from 'koa-cors';
import config from './config';
import OAuthServer from 'koa-oauth-server';
import OAuthModel from './oauth_server/model';
import OAuthServerConfig from './oauth_server/server.config';
import getLogger from './libs/getLogger';
import logger from './middleware/logger';
import apiRoutes from './middleware/routes';

const
    app = new Koa(),
    log = getLogger(module),
    env_config = config[app.env],
    { port } = env_config,
    corsOptions = {
        headers: 'Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin'
    },
    OAuthServerOptions = {
        model: OAuthModel,
        ...OAuthServerConfig
    };

app.OAuthServer = OAuthServer(OAuthServerOptions);

const
    { routes, allowedMethods } = apiRoutes(app);

app
    .use(logger)
    .use(convert(cors(corsOptions)))
    .use(routes())
    .use(allowedMethods())
    .listen(port, () => log.info(`server started ${port}`));

export default app;
