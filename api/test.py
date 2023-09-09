from pymongo import MongoClient

client = MongoClient("mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/")

db_names = client.list_database_names()
print(db_names)
