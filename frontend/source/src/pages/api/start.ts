import { encryptSha256 } from "@/lib/verify";
import { SubmitData } from "@/types/submitData";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse<SubmitData>) {
    //TODO: 返すデータの作成
    const category = Math.floor(Math.random() * 4);
    const submitData: SubmitData = {
        category,
        requiredWords: ["test"],
        forbiddenWords: ["test"],
        startTime: Date.now(),
        verificationHash: "",
    };
    submitData.verificationHash = encryptSha256(JSON.stringify(submitData));
    res.status(200).json(submitData);
}
