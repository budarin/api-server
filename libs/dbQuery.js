import getLogger from './log';

const log = getLogger(module);

export default async (ctx, pool) => {
    const
        entity = ctx.params.entity,
        method = ctx.params.method,
        params = ctx.request.query || {},
        payload = {
            entity,
            method,
            params
        };

    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if (err) {
                log.error('error fetching client from pool', err);
                reject(new Error(err));
            }

            log.info('query params', payload);

            client.query('SELECT * FROM www_root($1::json)', [payload], function(err, result) {
                done(); // call `done()` to release the client back to the pool

                if (err) {
                    log.error('error executing db_query', err);
                    reject(new Error(err));
                }

                const ret = result.rows[0].www_root;

                if (ret.status !== 200) {
                    let ex = new Error(ret.message);

                    ex.status = ret.status;
                    reject(ex);
                }

                resolve(ret);
            });
        });
    });
};
