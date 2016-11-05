const serverOptions = {
    debug: true,
    grants: ['password', 'refresh_token'],
    accessTokenLifetime: 3600, // This is default value.
    refreshTokenLifetime: 1209600, // This default value.
};

export default serverOptions;
