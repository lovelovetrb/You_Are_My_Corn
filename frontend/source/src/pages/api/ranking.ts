import { Ranking } from "@/types/ranking";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Ranking[]>) {
    // dummy ranking data
    const ranking: Ranking[] = [
    ];
    for (let i = 0; i < 20; i++) {
        ranking.push({
            category: i % 4,
            username: "test" + i,
            date: new Date(),
            text: "test",
            score: i * 100,
        });
    }
    res.status(200).json(ranking);
}
