import { ConditionsData } from "@/types/conditionsData";
import { atom } from "jotai";

export const conditionsDataAtom = atom<ConditionsData>({
    category: 0,
    requiredWords: [],
    forbiddenWords: [],
    startTime: 0,
    verificationHash: "",
});
export const textAtom = atom<string>("");
