import send from 'koa-send';

const sendFile = (fileName, seconds) => async ctx  => {
    await send(ctx, fileName, {
        maxage: seconds
    });
};

export default sendFile;


