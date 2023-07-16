import { encryptSha256, verifySubmitData } from "@/lib/verify";
import { ResultData } from "@/types/resultData";
import { SubmitData } from "@/types/submitData";
import type { NextApiRequest, NextApiResponse } from "next";

import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../../firebase-adminsdk.json";
import { textAtom } from "@/lib/jotai";

interface ExtendNextApiRequest extends NextApiRequest {
    body: {
        category: number;
        requiredWords: string[];
        forbiddenWords: string[];
        startTime: number;
        text: string;
        verificationHash: string;
    };
}

export default async function handler(req: ExtendNextApiRequest, res: NextApiResponse<ResultData>) {
    const submitData: SubmitData = {
        category: req.body.category,
        requiredWords: req.body.requiredWords,
        forbiddenWords: req.body.forbiddenWords,
        startTime: req.body.startTime,
        verificationHash: req.body.verificationHash,
    };

    if (verifySubmitData(submitData)) {
        if (Date.now() - submitData.startTime > 2 * 60 * 1000) {
            res.status(400).end("Time out");
            return;
        }
       
        await fetch("http://backend:5001/calc/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: req.body.text,
            }),
        }).then((response) => {
            if (response.ok) {
                const score: number[] = [];
                response
                    .json()
                    .then((json) => {
                        for (const key in json) {
                            score.push(Number(json[key]));
                        }

                        if (admin.apps.length === 0) {
                            admin.initializeApp({
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                credential: cert(serviceAccount as any),
                            });
                        }
                        var text = req.body.text;
                        for(var i in submitData.forbiddenWords) {
                            var word = submitData.forbiddenWords[i];
                            var result = text.includes(word);
                            if(result){
                                score[submitData.category] = 0;
                                console.log(text);
                                break;
                            };
                        }
                        for(var i in submitData.requiredWords) {
                            var word = submitData.requiredWords[i];
                            var result = text.includes(word);
                            if(!result){
                                score[submitData.category] = 0;
                                console.log(text);
                                break;
                            };
                        }

                        // score に関するメッセージ
                        // 100点の場合
                        // if(score[submitData.category] == 100){
                        //     textAtom.set("おめでとうございます！あなたは「" + submitData.category + "」のエモちゃれマスターです！");
                        // }
                        // // 90点以上の場合
                        // else if(score[submitData.category] >= 90){
                        //     textAtom.set("あなたは「" + submitData.category + "」のエモちゃれマスターです！");
                        // }
                        // // 20点以下の場合
                        // else if(score[submitData.category] <= 20){
                        //     textAtom.set("あなたは「" + submitData.category + "」のエモちゃれ初心者です！");
                        // }
                        // // それ以外の場合
                        // else{
                        //     textAtom.set("あなたは「" + submitData.category + "」のエモちゃれです！");
                        // }

                        const store = getFirestore();

                        const ref = store.collection("scores");
                        const query = ref.where("category", "==", submitData.category).orderBy("score", "desc").where("score", ">=", score[submitData.category]).get();

                        let rank = 0;
                        query.then((snapshot) => {
                            rank = snapshot.size + 1;
                            const result: ResultData = {
                                category: submitData.category,
                                text: req.body.text,
                                score: score[submitData.category],
                                rank: rank,
                                verificationHash: "",
                            };
                            result.verificationHash = encryptSha256(JSON.stringify(result));
                            res.status(200).json(result);
                        }).catch(() => {
                            res.status(500).end("Internal server error");
                        });
                    })
                    .catch(() => {
                        res.status(500).end("Internal server error");
                    });
            } else {
                res.status(400).end("Bad request");
            }
        });
    } else {
        res.status(400).end("Invalid verification hash");
    }
}
