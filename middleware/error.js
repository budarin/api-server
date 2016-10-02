import getLogger from '../libs/log';

const
    log = getLogger(module),
    handle500 = async (ctx, next) => {
        try {
            await next();
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

export default handle500;
