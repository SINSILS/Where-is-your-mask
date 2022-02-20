from pymongo import MongoClient
import src.core.config as config

client = MongoClient(
    host=config.mongodb_host,
    port=config.mongodb_port,
    username=config.mongodb_username,
    password=config.mongodb_password,
)

db = client.get_database(config.mongodb_database)
