import { ResultData } from "@/types/resultData";
import { SubmitData } from "@/types/submitData";
import { createHash } from "crypto";

export const encryptSha256 = (str: string) => {
    const hash = createHash("sha256");
    hash.update(str + "salt");
    return hash.digest("hex");
};

export const verifySubmitData = (submitData: SubmitData) => {
    const hash = submitData.verificationHash;
    submitData.verificationHash = "";
    return hash === encryptSha256(JSON.stringify(submitData));
};

export const verifyResultData = (resultData: ResultData) => {
    const hash = resultData.verificationHash;
    resultData.verificationHash = "";
    return hash === encryptSha256(JSON.stringify(resultData));
};