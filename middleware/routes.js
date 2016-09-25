import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';
import pg from 'pg';

var config = {
    user: 'postgres', //env var: PGUSER
    database: 'kometa_db', //env var: PGDATABASE
    password: 'wwwboy123', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const
    router = new Router(),
    koaBody = convert(KoaBody()),
    pool = new pg.Pool(config);

pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack);
    throw err;
});

router
    .get('/', async (ctx) => {
        const
            result = await new Promise((resolve, reject) => {
            pool.connect(function(err, client, done) {
                if(err) {
                    //return console.error('error fetching client from pool', err);
                    return reject(err);
                }
                client.query('SELECT tablename FROM pg_catalog.pg_tables', function(err, result) {
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
    .get('/foo', async (ctx) => {
        ctx.body = 'Hello World Foo';
    })
    .get('/err', async (ctx) => {
        throw new Error('lalala');
    });

const
    routes = () => router.routes(),
    allowedMethods = () => router.allowedMethods();

export { routes, allowedMethods };
