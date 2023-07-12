export type submit = {
    category: number;
    requiredWords: string[];
    forbiddenWords: string[];
    startTime: number;
    text: string;
    verificationHash: string;
};
