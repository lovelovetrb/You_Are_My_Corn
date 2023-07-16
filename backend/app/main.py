from fastapi import FastAPI
from pydantic import BaseModel
from predict_feel import PredictFeel

predict_feel = PredictFeel()
app = FastAPI()


class Item(BaseModel):
    text: str


@app.get("/")
def root():
    return {"message": "Hello, World!"}


@app.post("/calc/")
async def calc(item: Item) -> list[float]:
    score = predict_feel.predict(item.text)
    
    return score