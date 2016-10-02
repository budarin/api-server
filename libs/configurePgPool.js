import getLogger from './getLogger';

const
    log = getLogger(module),
    config = {
        user: 'postgres', //env var: PGUSER
        database: 'kometa_db', //env var: PGDATABASE
        password: 'wwwboy123', //env var: PGPASSWORD
        host: 'localhost', // Server hosting the postgres database
        port: 5432, //env var: PGPORT
        max: 50, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    },
    pgPoolIdleErrorHandler = (err, client) => {
        // if an error is encountered by a client while it sits idle in the pool
        // the pool itself will emit an error event with both the error and
        // the client which emitted the original error
        // this is a rare occurrence but can happen if there is a network partition
        // between your application and the database, the database restarts, etc.
        // and so you might want to handle it and at least log it out
        log.error('idle client error', err.message, err.stack);
        throw err;
    };

export default pg => {
    const pool = new pg.Pool(config);

    pool.on('error', pgPoolIdleErrorHandler);
    return pool;
}
