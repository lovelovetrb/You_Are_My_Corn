import { PlayData } from "@/types/playData";
import { atom } from "jotai";

export const playDataAtom = atom<PlayData>({
    category: 0,
    requiredWords: [],
    forbiddenWords: [],
    startTime: 0,
    verificationHash: "",
});
export const textAtom = atom<string>("");
