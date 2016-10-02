export default async (ctx) => {
    ctx.body = {
        message: 'Welcome! Our valid entry point is at: /api/.',
        resultCode: 'Ok'
    };
};
