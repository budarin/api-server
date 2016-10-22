import convert from 'koa-convert';
import Router from 'koa-router';
import pg from 'pg';
import koaBodyParser from 'koa-bodyparser';
import apiRoutes from './routes/';
import sendFile from './sendFile';
import pgPoolConfig from '../config/pgPool.config';

const
    router = new Router(),
    pool = pgPoolConfig(pg),
    routes = () => router.routes(),
    allowedMethods = () => router.allowedMethods(),

    oneMonth = 1000 * 60 * 60 * 24 * 30,
    sendFavicon = sendFile('public/favicon.ico', oneMonth),
    sendRobotsTxt = sendFile('public/robots.txt', oneMonth),

    { welcomeRoute, getRoute, postRoute, putRoute, deleteRoute } = apiRoutes,

    initRoutes = app => {
        const
            parser = convert(koaBodyParser()),
            grant = convert(app.OAuthServer.grant()),
            authorize = convert(app.OAuthServer.authorise());

        router
            .post('/oauth2/token/', parser, grant)

            .get('/', welcomeRoute)
            .get('/favicon.ico', sendFavicon)
            .get('/robots.txt', sendRobotsTxt)

            .get('/api/v1/', authorize, welcomeRoute)
            .get('/api/v1/:entity/:method/', authorize, getRoute(pool))
            .post('/api/v1/:entity/', authorize, postRoute(pool))
            .put('/api/v1/:entity/', authorize, putRoute(pool))
            .delete('/api/v1/:entity/', authorize, deleteRoute(pool));

        return {
            routes,
            allowedMethods
        };
    };

export default initRoutes;
