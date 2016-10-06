import send from 'koa-send';

const oneMonth = 60 * 1000 * 60 * 24 * 30;

const sendFavicon = async ctx  => {
    await send(ctx, 'public/favicon.ico', {
        maxage: oneMonth,
        gzip: true
    });
};

export default sendFavicon;
