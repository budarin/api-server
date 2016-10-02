import getLogger from '../libs/log';

const
    log = getLogger(module),
    handle500 = async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            log.error(err.message);

            ctx.status = 500;
            ctx.body = {
                message: `Internal error`,
                resultCode: 'Error',
                trackingId: String(Math.random()).split('.')[1]
            };
        }
    };

export default handle500;
