import { verifyResultData } from "@/lib/verify";
import { ResultData } from "@/types/resultData";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendNextApiRequest extends NextApiRequest {
    body: {
        category: number;
        text: string;
        score: number;
        rank: number;
        username: string;
        verificationHash: string;
    };
}

export default async function handler(req: ExtendNextApiRequest, res: NextApiResponse<ResultData>) {
    const resultData: ResultData = {
        category: req.body.category,
        text: req.body.text,
        score: req.body.score,
        rank: req.body.rank,
        verificationHash: req.body.verificationHash,
    };
    if (verifyResultData(resultData)) {
        // :TODO

    } else {
        res.status(400).end("Invalid verification hash");
    }
}
