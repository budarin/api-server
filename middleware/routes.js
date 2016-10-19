import convert from 'koa-convert';
import Router from 'koa-router';
import pg from 'pg';
import koaBodyParser from 'koa-bodyparser';
import configurePgPool from '../libs/configurePgPool';
import getRoute from './routes/get';
import postRoute from './routes/post';
import putRoute from './routes/put';
import deleteRoute from './routes/delete';
import welcome from './routes/welcome';
import sendFile from './sendFile';

const
    router = new Router(),
    pool = configurePgPool(pg),
    oneMonth = 1000 * 60 * 60 * 24 * 30,
    sendFavicon = sendFile('public/favicon.ico', oneMonth),
    sendRobotsTxt = sendFile('public/robots.txt', oneMonth),
    routes = () => router.routes(),
    allowedMethods = () => router.allowedMethods(),
    initRoutes = app => {
        const
            tokenMiddleware = convert(app.oauthServer.grant()),
            bodyParser = convert(koaBodyParser());

        router
            .post('/oauth2/token/', bodyParser, tokenMiddleware)

            .get('/', welcome)
            .get('/favicon.ico', sendFavicon)
            .get('/robots.txt', sendRobotsTxt)

            .get('/api/v1/', welcome)
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
