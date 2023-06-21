import { Conditions, verifyConditions } from "@/types/conditions";
import { Result } from "@/types/result";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendNextApiRequest extends NextApiRequest {
    body: {
        category: string;
        requiredWords: string[];
        forbiddenWords: string[];
        startDateTime: number;
        inputText: string;
        verificationHash: string;
    };
}

export default async function handler(req: ExtendNextApiRequest, res: NextApiResponse<Result>) {
    const conditions: Conditions = {
        category: req.body.category,
        requiredWords: req.body.requiredWords,
        forbiddenWords: req.body.forbiddenWords,
        startDateTime: req.body.startDateTime,
        verificationHash: req.body.verificationHash,
    };
    if (verifyConditions(conditions)) {
        if (Date.now() - conditions.startDateTime > 2 * 60 * 1000) {
            res.status(400).end("Time out");
            return;
        }
        const result: Result = {
            category: conditions.category,
            inputText: req.body.inputText,
            inputScore: 0,
        };
        res.status(200).json(result);
    } else {
        res.status(400).end("Invalid verification hash");
    }
}
