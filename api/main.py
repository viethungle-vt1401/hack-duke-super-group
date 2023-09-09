from fastapi import FastAPI
from routes.user import user
from pymongo import MongoClient

client = MongoClient("mongodb+srv://Admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/")

db = client.HackDuke
collection = db.sample_airbnb

for document in collection.find():
    print(document)

app = FastAPI()
app.include_router(user)