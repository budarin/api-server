export default {
    'development': {
        'port': 80,
        'pg_config': {
            'database': 'kometa_db',
            'user': 'api_user',
            'password': 'password123',
            'host': 'localhost',
            'port': 5432,
            'max': 50,
            'idleTimeoutMillis': 30000
        }
    },
    'production': {
        'port': 3000,
        'pg_config': {
            'database': 'kometa_db',
            'user': 'api_user',
            'password': 'password123',
            'host': 'localhost',
            'port': 5432,
            'max': 50,
            'idleTimeoutMillis': 30000
        }
    },
    'app_identity': {
        'id': 'www-client',
        'key': 'test12345'
    },
    oauth_server: {
        grants: ['password', 'refresh_token'],
        debug: true,
        accessTokenLifetime: 3600,
        refreshTokenLifetime: 1209600
    }
};
