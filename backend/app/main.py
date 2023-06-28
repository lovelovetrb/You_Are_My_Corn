from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    text: str


@app.get("/")
def root():
    return {"message": "Hello, World!"}


@app.post("/calc/")
async def calc(item: Item) -> list[float]:
    # TODO: calculate the result
    return [3.1, 4.0]
