import torch
import numpy as np
from transformers import BertJapaneseTokenizer, BertForSequenceClassification
from mlm_scoring_transformers.mlmt import MLMScorer
import torch.nn.functional as F

pretrained_model_name = 'cl-tohoku/bert-base-japanese-whole-word-masking'

my_scorer = MLMScorer(pretrained_model_name, use_cuda=False)

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
        array *= 100
        integer_array = []
        
        # mlm-score
        scores_mlm = my_scorer.score_sentences(
            sentences=[text],
            get_token_likelihood=True
        )
        
        for x in array:
            subtract = scores_mlm[0]["all"]
            if(subtract < -15) : x = x + subtract + 15
            # index = np.round(x, 2)
            x = float(x)
            x = round(x, 2)
            if(x > 0): integer_array.append(x)
            else : integer_array.append(0)
        return integer_array