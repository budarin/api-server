import getLogger from '../libs/log';

const
    log = getLogger(module),
    handle404 = async (ctx, next) => {
        try {
            await next();
            // Handle 404 upstream.
            var status = ctx.status || 404;
            if (status === 404) ctx.throw(404);
        } catch (err) {
            log.error(err.message, ctx.url);

            ctx.status = err.status;
            ctx.body = {
                message: `Url not found: ${ctx.url}`,
                resultCode: 'Error',
                trackingId: String(Math.random()).split('.')[1]
            };
        }
    };

export default handle404;
