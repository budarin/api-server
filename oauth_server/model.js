import memoryDB from './memoryDB';
import cacheService from '../server/redis_client';

const ACCESS_PREFIX = 'access.';
const REFRESH_PREFIX = 'refresh.';

/*
 * Get access token
 */
const getAccessToken = async (bearerToken, callback) => {
    const token1 = await cacheService.asyncGet(`${ACCESS_PREFIX}${bearerToken}`);
    console.log(token1);

    const token = await Promise.resolve({
        accessToken: '8a85026205ce364f427e5f371092b225ac251d63',
        expires: Date.now + 1000
    });

    if (token) {
        return callback(false, token);
    }

    return callback(false, false);
};

/*
 * Get refresh token
 */
const getRefreshToken = async (bearerToken, callback) => {
    const token = await Promise.resolve({
        refreshToken: '9cec634a252054d6c4edaa07d9324ca7a0bdec9f',
        ...memoryDB.allowedClients['trackr'],
        expires: Date.now + 1000,
        user: memoryDB.users['admin'],
        userId: memoryDB.users['admin'].id
    });

    if (token) {
        return callback(false, token);
    }

    return callback(false, false);
};

/*
 * Get client
 */
const getClient = async (clientId, clientSecret, callback) => {
    const client = await Promise.resolve(memoryDB.allowedClients[clientId]);

    if (client && (clientSecret === null || client.clientSecret === clientSecret)) {
        return callback(false, client);
    }

    return callback(false, false);
};

/*
 * Get corresponding client's allowed grant type.
 */
const grantTypeAllowed = async (clientId, grantType, callback) => {
    const allowedGrantTypeClients = await Promise.resolve(memoryDB.authorizedClientIds[grantType]);

    return callback(false, allowedGrantTypeClients && allowedGrantTypeClients.includes(clientId));
};

/*
 * Save the access token
 */
const saveAccessToken = async (accessToken, clientId, expires, userId, callback) => {
    const token = await Promise.resolve({
        accessToken,
        clientId,
        userId,
        expires,
    });

    const cacheKey = `${ACCESS_PREFIX}${accessToken}`;

    return callback(false);
};

/*
 *  Save the refresh token
 */
const saveRefreshToken = async (refreshToken, clientId, expires, userId, callback) => {
    const token = await Promise.resolve({
        refreshToken,
        clientId,
        userId,
        expires,
    });

    const cacheKey = `${REFRESH_PREFIX}${refreshToken}`;

    return callback(false);
};

/*
 *  Get user
 */
const getUser = async (username, password, callback) => {
    const user = await Promise.resolve(memoryDB.users[username]);

    if (user && user.password === password) {
        return callback(false, user);
    }

    return callback(false, false);
};

const revokeRefreshToken = async (token, callback) => {
    await Promise.resolve(memoryDB.users[username]);

    return callback(token);
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