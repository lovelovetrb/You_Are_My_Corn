from predict_feel import PredictFeel

predict_feel = PredictFeel()

text = "楽しい"
scores = predict_feel.predict(text)
print(scores)