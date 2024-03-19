export const getTitleCalculation = (title: string) => {
    if (title.length > 49 && title.length < 61) {
        return { score: 100, msg: "Ideal title length" };
    }
    else if (title.length < 50) {
        let score = ((title.length) / 50) * 100
        score = customRound(score)
        return { score: score, msg: "Title is short. Ideal title length is 50-60 characters." }
    }
    else if (title.length > 60) {
        let score = 0;
        if (title.length > 101) {

            score = 40

        } else {
            let extra = title.length - 60;
            let x = 60 - extra;
            score = (x / 60) * 100
            score = customRound(score)
        }

        return { score: score, msg: "Title is long. Ideal title length is 50-60 characters." }
    } else {
        return { score: 100, msg: "Ideal title length" };
    }
}

export const getWordCountCalculations = (words: number) => {

    if (words < 2101) {
        let score = ((words) / 2100) * 100
        score = customRound(score)
        return { score: score, msg: "Ideal word count is 2100." }
    } else {
        if (words > 2500 && words < 3000) {
            let extra = words - 2500;
            let score = ((2500 - extra) / 2500) * 100
            score = customRound(score)
            return { score: score, msg: "Ideal word count is ~2100. Try to keep it around 2100-2500." }
        } else if (words > 3000) {
            return { score: 60, msg: "Article is too long. Ideal word count is ~2100. Try to keep it around 2100-2500." }
        } else { // words > 2101. words <3000, words <2500
            return { score: 100, msg: "Ideal word count is ~2100." }
        }
    }


}



function customRound(number: number) {
    const roundedNumber = Math.round(number * 100) / 100; // Round to two decimal places
    return Math.round(roundedNumber); // Round to the nearest integer
}