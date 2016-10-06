import Router from 'koa-router';
import pg from 'pg';
import configurePgPool from '../libs/configurePgPool';
import getRoute from './routes/get';
import postRoute from './routes/post';
import putRoute from './routes/put';
import deleteRoute from './routes/delete';
import welcome from './routes/welcome';
import sendFavicon from './sendFavicon';

const
    router = new Router(),
    pool = configurePgPool(pg);

router
    .get('/', welcome)
    .get('/favicon.ico', sendFavicon)

    .get('/api/v1/', welcome)
    .get('/api/v1/:entity/:method/', getRoute(pool))
    .post('/api/v1/:entity/', postRoute(pool))
    .put('/api/v1/:entity/', putRoute(pool))
    .delete('/api/v1/:entity/', deleteRoute(pool));

const
    routes = () => router.routes(),
    allowedMethods = () => router.allowedMethods();

export { routes, allowedMethods };
