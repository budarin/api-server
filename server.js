import Koa from 'koa';
import convert from 'koa-convert';
import cors from 'koa-cors';
import config from './config';
import oauthServer from 'koa-oauth-server';
import oauthModel from './oauth_server/model';
import serverOptions from './oauth_server/server.config';
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
    };

app.oauthServer = oauthServer({
    model: oauthModel,
    ...serverOptions
});

const { routes, allowedMethods } = apiRoutes(app);

app
    .use(logger)
    .use(convert(cors(corsOptions)))
    //.use(bodyParser())
    .use(routes())
    .use(allowedMethods())
    .listen(port, () => log.info(`server started ${port}`));

export default app;
