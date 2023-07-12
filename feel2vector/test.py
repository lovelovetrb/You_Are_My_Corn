import random
import glob
from tqdm import tqdm

import torch
import pandas as pd
import numpy as np
from torch.utils.data import TensorDataset, random_split
from torch.utils.data import DataLoader, RandomSampler, SequentialSampler
from mlflow import log_metric, log_param, log_artifact
from transformers import BertJapaneseTokenizer, BertForSequenceClassification
import pytorch_lightning as pl

## Tokenizerの準備
tokenizer = BertJapaneseTokenizer.from_pretrained('cl-tohoku/bert-base-japanese-whole-word-masking')

bert_sc = BertForSequenceClassification.from_pretrained(
    './model_transformers'
)

bert_sc
# bert_sc.cuda()

df = pd.read_csv("data/test.csv")

t1_test = df.Sentence.values
labels_test = df.label.values

predicted = []
correct_labels = []
wrong = []
i = 0


for x , label in zip(t1_test, labels_test):

    correct_labels.append(label)
    correct = label

    encoding = tokenizer(
            x,
            max_length=500,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )

    #encoding = { k: v.cuda() for k, v in encoding.items() }
    encoding = { k: v for k, v in encoding.items() }

    with torch.no_grad():
        output = bert_sc.forward(**encoding)
        scores = output.logits
        print(scores)
        labels_predicted = scores[0].argmax(-1).cpu().numpy().tolist()
        predicted.append(labels_predicted)

    if labels_predicted == correct:
        wrong.append(i)

    i+= 1

# scores = Softmax(scores)

print(predicted)