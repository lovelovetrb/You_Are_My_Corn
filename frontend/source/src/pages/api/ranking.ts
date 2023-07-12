import { RankingData } from "@/types/rankingData";
import type { NextApiRequest, NextApiResponse } from "next";

import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../../firebase-adminsdk.json";

export default async function handler(_req: NextApiRequest, res: NextApiResponse<RankingData[]>) {
    const ranking: RankingData[] = [
    ];

    if (admin.apps.length === 0) {
        admin.initializeApp({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            credential: cert(serviceAccount as any),
        });
    }
    const store = getFirestore();

    for (let i = 0; i < 4; i++) {
        const snapshot = await store
            .collection("scores")
            .where("category", "==", i)
            .orderBy("score", "desc")
            .limit(5)
            .get();
        snapshot.forEach((doc) => {
            const data = doc.data();
            ranking.push({
                category: data.category,
                username: data.username,
                text: data.text,
                score: data.score,
            });
        });
    }
    res.status(200).json(ranking);
}
