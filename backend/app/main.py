from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()


class Item(BaseModel):
    text: str


@app.get("/")
def root():
    return {"message": "Hello, World!"}


@app.post("/calc/")
async def calc(item: Item) -> list[int]:
    score = []
    for _ in range(4):
        score.append(random.randint(0, 100))
    # TODO: calculate the result
    return score
