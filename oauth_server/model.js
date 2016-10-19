import oauthConfig from './oauth2.config';

const ACCESS_PREFIX = 'access.';
const REFRESH_PREFIX = 'refresh.';

/*
 * Get access token
 */
const getAccessToken = async (bearerToken, callback) => {
    const token = await Promise.resolve('8a85026205ce364f427e5f371092b225ac251d63');

    if (token) {
        return callback(false, token);
    }

    return callback(false, false);
};

/*
 * Get refresh token
 */
const getRefreshToken = async (bearerToken, callback) => {
    const token = await Promise.resolve('9cec634a252054d6c4edaa07d9324ca7a0bdec9f');

    if (token) {
        return callback(false, token);
    }

    return callback(false, false);
};

/*
 * Get client
 */
const getClient = (clientId, clientSecret, callback) => {
    const client = oauthConfig.allowedClients[clientId];

    if (client && (clientSecret === null || client.clientSecret === clientSecret)) {
        return callback(false, client);
    }

    return callback(false, false);
};

/*
 * Get corresponding client's allowed grant type.
 */
const grantTypeAllowed = (clientId, grantType, callback) => {
    const allowedGrantTypeClients = oauthConfig.authorizedClientIds[grantType];

    return callback(false, allowedGrantTypeClients && allowedGrantTypeClients.includes(clientId));
};

/*
 * Save the access token
 */
const saveAccessToken = (accessToken, clientId, expires, userId, callback) => {
    const token = {
        accessToken,
        clientId,
        userId,
        expires,
    };

    const cacheKey = `${ACCESS_PREFIX}${accessToken}`;

    return callback(false);
};

/*
 *  Save the refresh token
 */
const saveRefreshToken = (refreshToken, clientId, expires, userId, callback) => {
    const token = {
        refreshToken,
        clientId,
        userId,
        expires,
    };

    const cacheKey = `${REFRESH_PREFIX}${refreshToken}`;

    return callback(false);
};

/*
 *  Get user
 */
const getUser = (username, password, callback) => {
    const user = oauthConfig.users[username];

    if (user && user.password === password) {
        return callback(false, user);
    }

    return callback(false, false);
};

export default {
    getAccessToken,
    getRefreshToken,
    getClient,
    grantTypeAllowed,
    saveAccessToken,
    saveRefreshToken,
    getUser
};