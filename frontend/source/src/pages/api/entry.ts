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
        username: string;
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
        // :TODO

    } else {
        res.status(400).end("Invalid verification hash");
    }
}
