import Router from 'koa-router';
import pg from 'pg';
import configurePgPool from '../libs/configurePgPool';
import getRoute from './routes/get';
import postRoute from './routes/post';
import putRoute from './routes/put';
import deleteRoute from './routes/delete';
import welcome from './routes/welcome';

const
    router = new Router(),
    pool = configurePgPool(pg);

router
    .get('/', welcome)
    .get('/api/:entity/:method/', getRoute(pool))
    .post('/api/:entity/', postRoute(pool))
    .put('/api/:entity/', putRoute(pool))
    .delete('/api/:entity/', deleteRoute(pool));

const
    routes = () => router.routes(),
    allowedMethods = () => router.allowedMethods();

export { routes, allowedMethods };
