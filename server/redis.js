import redis from 'redis';
import redisUrl from './config/redis.config';
import getLogger from './utils/getLogger';

const
    client = redis.createClient(redisUrl),
    log = getLogger(module);

client.select(1, () => {
    log.info('Using redis database 1.'); // eslint-disable-line no-console
});

client.on('ready', () => {
    log.info('redis server ready!'); // eslint-disable-line no-console
});

client.on('error', (err) => {
    log.error('Error: ', err); // eslint-disable-line no-console
});

client.asyncGet = (key) =>
    new Promise((resolve, reject) => {
        client.get(key, (err, value) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(value);
        });
    });

export default client;
