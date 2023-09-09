from fastapi import FastAPI
from routes.user import user
from pymongo import MongoClient

client = MongoClient("mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/")

db_names = client.list_database_names()
print(db_names)

app = FastAPI()

@app.get("/header")
async def fun():
    return "Hello World!"

app.include_router(user)

