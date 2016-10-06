import path from 'path';
import send from 'koa-send';

const oneYear = 60 * 1000 * 60;

// TODO: брать иконку из /public/

const sendFavicon = async (ctx, next) => {
    console.log(path.resolve(__dirname + '/favicon.png'), { root: __dirname });

    await send(ctx, './favicon.png', {
        root: __dirname,
        maxage: oneYear,
        gzip: true
    });
};

export default sendFavicon;
