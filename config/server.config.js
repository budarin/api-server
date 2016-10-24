const serverConfig = {
    'development': {
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
    }
};

export default serverConfig;
