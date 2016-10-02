export default (ctx, seconds) => {
    ctx.set('Cache-Control', 'private, max-age=' + seconds);
    ctx.set('Date', new Date());
};
