import getLogger from '../libs/log';

const
    log = getLogger(module),
        error = async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            log.error(err.message);

            // will only respond with JSON
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                message: err.message
            };
        }
    };

export default error;
