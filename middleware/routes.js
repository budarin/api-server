import Router from 'koa-router';
import pg from 'pg';
import configurePgPool from '../libs/configurePgPool';
import dontCache from '../middleware/dontCache';
import getLogger from '../libs/log';
import getRoute from './routes/get';
import postRoute from './routes/post';
import putRoute from './routes/put';
import deleteRoute from './routes/delete';

const
    router = new Router(),
    pool = configurePgPool(pg),
    log = getLogger(module);

//TODO: проверять на корректность параметры вызова и если некорректны - выдаем ошибку

router
    .get('/', dontCache, async (ctx) => {
        // временная заглушка
        ctx.body = {
            message: 'Welcome! Our valid entry point is at: /api/.',
            resultCode: 'Ok'
        };
    })
    .get('/api/:entity/:method/', getRoute(pool))
    .post('/api/:entity/', postRoute(pool))
    .put('/api/:entity/', putRoute(pool))
    .delete('/api/:entity/', deleteRoute(pool));

const
    routes = () => router.routes(),
    allowedMethods = () => router.allowedMethods();

export { routes, allowedMethods };
