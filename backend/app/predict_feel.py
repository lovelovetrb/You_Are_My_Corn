import torch
from transformers import BertJapaneseTokenizer, BertForSequenceClassification
import torch.nn.functional as F

class PredictFeel:
    def __init__(self):
        # Tokenizerの準備
        self.tokenizer = BertJapaneseTokenizer.from_pretrained(
            'cl-tohoku/bert-base-japanese-whole-word-masking')
        self.bert_sc = BertForSequenceClassification.from_pretrained(
            './model_transformers',
            
        )

    def predict(self, text: str) -> list:
        text = str(text)  # textを文字列に変換
        encoding = self.tokenizer(
            text,
            max_length=500,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        encoding = {k: v for k, v in encoding.items()}
        with torch.no_grad():
            output = self.bert_sc.forward(**encoding)
            scores = output.logits
        scores = F.softmax(scores, dim=1)
        array = scores.cpu().numpy()
        array = array[0]
        array = array*100
        integer_array = []
        for x in array:
            x = int(x)
            integer_array.append(x)
        return integer_array