export default sec => {
    return async(ctx, next) => {
        ctx.set('Cache-Control', 'private, max-age=' + sec);
        ctx.set('Date', new Date());
        await next();
    };
};
