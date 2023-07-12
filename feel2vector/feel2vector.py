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




#データの読み込み
df = pd.read_csv("data/train.csv")

t1 = df.Sentence.values
labels = df.label.values

# 1. BERT Tokenizerを用いて単語分割・IDへ変換
## Tokenizerの準備
tokenizer = BertJapaneseTokenizer.from_pretrained('cl-tohoku/bert-base-japanese-whole-word-masking')

# 最大単語数の確認
max_len = []

# 1文づつ処理
for sent in t1:
    token_words_1 = tokenizer.tokenize(sent)
    # 文章数を取得してリストへ格納
    max_len.append(len(token_words_1))

max_length = max(max_len) +3 # 最大単語数にSpecial token（[CLS], [SEP]）の+2をした値が最大単語数

#max_length = 500

# 最大の値を確認
print('最大単語数: ', max_length)

dataset_for_loader = []

end_term = "[SEP]"

# 1文づつ処理
for x , label in zip(t1, labels):
    #sent= x  + end_term + y

    encoding = tokenizer(
            x,
            max_length=max_length,
            padding='max_length',
            truncation=True
        )

    encoding['labels'] = label # ラベルを追加
    encoding = { k: torch.tensor(v) for k, v in encoding.items() }
    dataset_for_loader.append(encoding)
    
# 80%地点のIDを取得
train_size = int(0.8 * len(dataset_for_loader))
val_size = len(dataset_for_loader) - train_size

# データセットを分割
train_dataset, val_dataset = random_split(dataset_for_loader, [train_size, val_size])

# データローダの作成
dataloader_train = DataLoader(
    train_dataset, batch_size=16, shuffle=True
)
dataloader_val = DataLoader(val_dataset, batch_size=16)

MODEL_NAME = 'cl-tohoku/bert-base-japanese-whole-word-masking'
bert_sc = BertForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=4)
bert_sc = bert_sc.cuda(0)

class BertForSequenceClassification_pl(pl.LightningModule):

    def __init__(self, model_name, num_labels, lr):
        super().__init__()
        self.save_hyperparameters()

        #BERTのロード
        self.bert_sc = BertForSequenceClassification.from_pretrained(
            model_name,
            num_labels = num_labels
        )

    def training_step(self, batch, batch_idx):
        output = self.bert_sc(**batch)
        loss = output.loss
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, batch_idx):
        output = self.bert_sc(**batch)
        val_loss = output.loss
        self.log('val_loss', val_loss)

    def test_step(self, batch, batch_idx):
        labels = batch.pop('labels')
        output = self.bert_sc(**batch)
        labels_predicted = output.logits.argmax(-1)
        num_correct = (labels_predicted == labels).sum().item()
        accuracy = num_correct / labels.size(0)
        self.log('accuracy', accuracy)

    def configure_optimizers(self):
        return torch.optim.AdamW(self.parameters(), lr=self.hparams.lr)
    
checkpoint = pl.callbacks.ModelCheckpoint(
    monitor = 'val_loss',
    mode = 'min',
    save_top_k = 1,
    save_weights_only = True,
    dirpath  = 'model/'
)

early_stopping = pl.callbacks.EarlyStopping(
    monitor = 'val_loss',
    mode = 'min',
    patience = 10
)

trainer = pl.Trainer(
    accelerator = 'gpu',
    devices = 0,
    #gpus = [0],
    max_epochs = 5,
    callbacks = [checkpoint, early_stopping]
)

model = BertForSequenceClassification_pl(
    MODEL_NAME, num_labels=4, lr=2e-5
)

# # gpu 指定
# gpu_num = 0
# device = torch.device('cuda', index=gpu_num)
# # もしくは　torch.device('cuda:{}'.format(gpu_num))
# model.to(device)

trainer.fit(model, dataloader_train, dataloader_val)

best_model_path = checkpoint.best_model_path # ベストモデルのファイル
print('ベストモデルのファイル: ', checkpoint.best_model_path)
print('ベストモデルの検証データに対する損失: ', checkpoint.best_model_score)

# PyTorch Lightningモデルのロード
model = BertForSequenceClassification_pl.load_from_checkpoint(
    best_model_path
)

# Transformers対応のモデルを./model_transformesに保存
model.bert_sc.save_pretrained('./model_transformers')

bert_sc = BertForSequenceClassification.from_pretrained(
    './model_transformers'
)



