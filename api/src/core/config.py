from decouple import config

mongodb_host = config('MONGODB_HOST')
mongodb_username = config('MONGODB_USERNAME', default=None)
mongodb_password = config('MONGODB_PASSWORD', default=None)
mongodb_database = config('MONGODB_DATABASE')
mongodb_port = config('MONGODB_PORT', cast=int)
