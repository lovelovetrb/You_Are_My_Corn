import { verifyResultData } from "@/lib/verify";
import { ResultData } from "@/types/resultData";
import type { NextApiRequest, NextApiResponse } from "next";

import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../../firebase-adminsdk.json";

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
        if (admin.apps.length === 0) {
            admin.initializeApp({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                credential: cert(serviceAccount as any),
            });
        }
        const store = getFirestore();

        const doc = store.collection("scores").doc();
        const entry = {
            category: resultData.category,
            username: req.body.username,
            text: resultData.text,
            score: resultData.score,
        };
        doc.set(entry);
        res.status(200).end("OK");
    } else {
        res.status(400).end("Invalid verification hash");
    }
}
