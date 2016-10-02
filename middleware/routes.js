import configurePgPool from '../libs/configurePgPool';
import dontCache from '../middleware/dontCache';
import getLogger from '../libs/log';
import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import pg from 'pg';

const
    router = new Router(),
    koaBody = convert(KoaBody()),
    pool = configurePgPool(pg),
    log = getLogger(module);

//TODO: проверять на корректность параметры вызова и если некорректны - выдаем ошибку

router
    .get('/', dontCache, async (ctx) => {
        // временная заглушка
        ctx.body = {
            payload: {},
            resultCode: 'Ok'
        };
    })
    .get('/api/', async (ctx) => {
        const
            result = await new Promise((resolve, reject) => {
            pool.connect(function(err, client, done) {
                if(err) {
                    //return console.error('error fetching client from pool', err);
                    return reject(err);
                }
                //client.query('SELECT * FROM root($1::json)', [{ method: 'dfdf' }], function(err, result) {
                client.query('SELECT * FROM pg_catalog.pg_tables', [], function(err, result) {
                    //call `done()` to release the client back to the pool
                    done();

                    if(err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        }),
        getTableNames = (result, item) => {
            result.push(item.tablename);
            return result;
        };

        ctx.body = result.rows.reduce(getTableNames, []);

    })
    .get('/api/foo', async (ctx) => {
        ctx.body = 'Hello World Foo';
    })
    .get('/api/err', async (ctx) => {
        throw new Error('lalala');
    });

const
    routes = () => router.routes(),
    allowedMethods = () => router.allowedMethods();

export { routes, allowedMethods };
