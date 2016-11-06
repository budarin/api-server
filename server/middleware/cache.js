import setCacheHeader from '../utils/setCacheHeader';

/**
 * кэширование контента на указанное количество секунд
 * использовать только для непубличного контента (ответ из БД)
 * кэширование не работает на HTTPS
 */
export default sec => {
    return async(ctx, next) => {
        setCacheHeader(ctx, sec);
        await next();
    };
};
