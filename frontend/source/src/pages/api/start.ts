import { Conditions, encryptSha256 } from "@/lib/conditions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Conditions>) {
    //TODO: 返すデータの作成
    const category = Math.floor(Math.random() * 4);
    const conditions: Conditions = {
        category,
        requiredWords: ["test"],
        forbiddenWords: ["test"],
        startTime: Date.now(),
        verificationHash: "",
    };
    conditions.verificationHash = encryptSha256(JSON.stringify(conditions));
    res.status(200).json(conditions);
}
