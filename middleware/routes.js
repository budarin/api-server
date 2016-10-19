import convert from 'koa-convert';
import Router from 'koa-router';
import pg from 'pg';
import koaBodyParser from 'koa-bodyparser';
import apiRoutes from './routes/';
import sendFile from './sendFile';
import pgPoolConfig from '../config/pgPool.config';

const
    router = new Router(),
    { welcomeRoute, getRoute, postRoute, putRoute, deleteRoute } = apiRoutes,

    pool = pgPoolConfig(pg),
    oneMonth = 1000 * 60 * 60 * 24 * 30,
    sendFavicon = sendFile('public/favicon.ico', oneMonth),
    sendRobotsTxt = sendFile('public/robots.txt', oneMonth),

    routes = () => router.routes(),
    allowedMethods = () => router.allowedMethods(),
    initRoutes = app => {
        const { OAuthServer } = app;

        router
            .post('/oauth2/token/', convert(koaBodyParser()), convert(OAuthServer.grant()));

        router
            .get('/', welcomeRoute)
            .get('/favicon.ico', sendFavicon)
            .get('/robots.txt', sendRobotsTxt);

        router
            .get('/api/v1/', welcomeRoute)
            .get('/api/v1/:entity/:method/', getRoute(pool))
            .post('/api/v1/:entity/', postRoute(pool))
            .put('/api/v1/:entity/', putRoute(pool))
            .delete('/api/v1/:entity/', deleteRoute(pool));

        return {
            routes,
            allowedMethods
        };
    };

export default initRoutes;
