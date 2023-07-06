import { createHash } from "crypto";

export type Conditions = {
    category: number;
    requiredWords: string[];
    forbiddenWords: string[];
    startTime: number;
    verificationHash: string;
};

export const encryptSha256 = (str: string) => {
    const hash = createHash("sha256");
    hash.update(str + "salt");
    return hash.digest("hex");
};

export const verifyConditions = (conditions: Conditions) => {
    const hash = conditions.verificationHash;
    conditions.verificationHash = "";
    return hash === encryptSha256(JSON.stringify(conditions));
};
