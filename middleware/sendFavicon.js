import path from 'path';
import send from 'koa-send';

const oneYear = 60 * 1000 * 60;

const sendFavicon = async ctx  => {
    await send(ctx, 'public/favicon.ico', {
        maxage: oneYear,
        gzip: true
    });
};

export default sendFavicon;
