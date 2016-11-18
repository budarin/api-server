export default async (ctx) => {
    ctx.body = {
        message: 'Welcome!',
        doc: 'http://localhost/doc',
        resultCode: 'Ok'
    };
};
