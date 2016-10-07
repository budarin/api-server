import dbQuery from '../../libs/dbQuery';
import setCacheHeader from '../../libs/setCacheHeader';

export default pool => async (ctx) => {
    const
        dbResponse = await dbQuery(ctx, pool),
        { meta, status, result } = dbResponse;

    if (status === 200) {
        ctx.body = result;

        // если указана информация о кэшировании - кешируем результат
        if (meta.maxAage) { setCacheHeader(ctx, meta.maxAge); }
    } else {
        throw new Error(dbResponse.message);
    }
};
