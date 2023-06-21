import { Conditions, encryptSha256 } from "@/types/conditions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Conditions>) {
    const conditions: Conditions = {
        category: "test",
        requiredWords: ["test"],
        forbiddenWords: ["test"],
        startDateTime: Date.now(),
        verificationHash: "",
    };
    conditions.verificationHash = encryptSha256(JSON.stringify(conditions));
    res.status(200).json(conditions);
}
