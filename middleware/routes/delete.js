import convert from 'koa-convert';
import KoaBody from 'koa-body';

const koaBody = convert(KoaBody());

export default pool => async (ctx) => {
    ctx.body = {
        resultCode: 'Ok'
    };
};
