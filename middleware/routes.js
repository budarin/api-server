import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';

const
    router = new Router(),
    koaBody = convert(KoaBody());

router
    .get('/', async (ctx, next) => {
        ctx.body = 'Hello World';
    })
    .get('/foo', async (ctx, next) => {
        ctx.body = 'Hello World Foo';
    })
    .get('/err', async (ctx, next) => {
        throw new Error('lalala');
    });

const
    routes = () => router.routes(),
    allowedMethods = () => router.allowedMethods();

export { routes, allowedMethods };
