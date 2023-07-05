import { Conditions, encryptSha256 } from "@/types/conditions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Conditions>) {
    const conditions: Conditions = {
        category: 0,
        requiredWords: ["test"],
        forbiddenWords: ["test"],
        startTime: Date.now(),
        verificationHash: "",
    };
    conditions.verificationHash = encryptSha256(JSON.stringify(conditions));
    res.status(200).json(conditions);
}
