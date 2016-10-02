/**
 * кэширование контента на указанное количество секунд
 * использовать только для непубличного контента (ответ из БД)
 * кэширование не работает на HTTPS
 */
export default sec => {
    return async(ctx, next) => {
        ctx.set('Cache-Control', 'private, max-age=' + sec);
        ctx.set('Date', new Date());
        await next();
    };
};
