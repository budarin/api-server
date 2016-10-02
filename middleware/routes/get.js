export default pool => async (ctx) => {
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
};
