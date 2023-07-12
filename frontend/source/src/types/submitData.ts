export type SubmitData = {
    category: number;
    requiredWords: string[];
    forbiddenWords: string[];
    startTime: number;
    text?: string;
    verificationHash: string;
};
