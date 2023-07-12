import { Conditions, verifyConditions } from "@/lib/conditions";
import { ResultData } from "@/types/resultData";
import type { NextApiRequest, NextApiResponse } from "next";

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
    const conditions: Conditions = {
        category: req.body.category,
        requiredWords: req.body.requiredWords,
        forbiddenWords: req.body.forbiddenWords,
        startTime: req.body.startTime,
        verificationHash: req.body.verificationHash,
    };
    if (verifyConditions(conditions)) {
        if (Date.now() - conditions.startTime > 2 * 60 * 1000) {
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
                        // TODO: Ranking も返すようにする
                        const result: ResultData = {
                            category: conditions.category,
                            text: req.body.text,
                            score: score[0],
                            rank: 0,
                        };
                        res.status(200).json(result);
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
