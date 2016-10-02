import getLogger from '../libs/getLogger';

const
    log = getLogger(module),
    logger = async (ctx, next) => {
        const
            start = new Date(),
            IP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;

        try {
            await next();
            const ms = new Date() - start;
            log.info(`${IP} ${ ctx.method } ${ ctx.url } - ${ ms }ms`);

            if (ctx.status === 404) { ctx.throw(404); }
        } catch (err) {
            log.error(err.message);

            if (err.status === 404) {
                ctx.status = err.status;
                ctx.body = {
                    message: `Url not found: ${ctx.url}`,
                    resultCode: 'Error',
                    trackingId: String(Math.random()).split('.')[1]
                };
            } else {
                ctx.status = err.status || 500;
                ctx.body = {
                    message: `Internal error`,
                    resultCode: 'Error',
                    trackingId: String(Math.random()).split('.')[1]
                };
            }
        }
    };

export default logger;
