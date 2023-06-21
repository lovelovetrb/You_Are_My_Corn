import { createHash } from "crypto";

export type Conditions = {
    category: string;
    requiredWords: string[];
    forbiddenWords: string[];
    startDateTime: number;
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
    return hash == encryptSha256(JSON.stringify(conditions));
};
