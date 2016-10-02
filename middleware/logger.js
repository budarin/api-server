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
        } catch (err) {}
    };

export default logger;
