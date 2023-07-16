export const category = ["よろこび", "いかり", "かなしみ", "きたい"];

export const num2category = (num: number) => {
    switch (num) {
        case 0:
            return "よろこび";
        case 1:
            return "いかり";
        case 2:
            return "かなしみ";
        case 3:
            return "きたい";
        default:
            return undefined;
    }
};