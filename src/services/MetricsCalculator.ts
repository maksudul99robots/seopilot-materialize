export const getTitleCalculation = (title: string) => {
    if (title.length > 49 && title.length < 61) {
        return { score: 100, msg: "Ideal title length 50-60 characters." };
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
        return { score: 100, msg: "Ideal title length 50-60 characters." };
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
export const getTermCalculations = (primaryKeyword: string, keywords: any, content: string, wordCount: number) => {
    // console.log("incoming:", primaryKeyword, keywords, content)
    return new Promise((resolve, reject) => {
        try {
            // Calculate primary keyword count
            const regex = new RegExp(`\\b${primaryKeyword}\\b`, 'gi');
            let count = (content.match(regex) || []).length;
            let idealPKcount: number = wordCount * 2 / 100;
            // console.log("count:", count)
            if (count > idealPKcount)
                count = idealPKcount;
            // console.log("count:", count, idealPKcount)
            let primaryKeywordScore = (50 * count) / idealPKcount

            keywords = keywords.filter((item: any) => item.keyword !== primaryKeyword.toLowerCase());
            let usedKeywords = 0;
            let secondaryKeywordScore = 0;
            keywords.map((k: any, i: number) => {
                if (k.count > 0)
                    usedKeywords++;
                if (i == keywords.length - 1) {
                    if (usedKeywords >= 15) {
                        secondaryKeywordScore = 45;
                    } else {
                        secondaryKeywordScore = (45 * usedKeywords) / 15;
                        let total = (primaryKeywordScore + secondaryKeywordScore).toFixed(2)
                        // console.log({ score: primaryKeywordScore + secondaryKeywordScore, msg: `Primary Keyword score: ${primaryKeywordScore} , Secondary Keyword Score: ${secondaryKeywordScore}` })
                        resolve({ score: primaryKeywordScore + secondaryKeywordScore, msg: `Target Keyword Score: ${primaryKeywordScore.toFixed(2)} , Secondary Keyword Score: ${secondaryKeywordScore.toFixed(2)}` })
                    }
                }
            })

        } catch (e) {
            console.log(e)
            resolve({ score: 0, msg: `Target Keyword score: 0 , Secondary Keyword Score: 0` })
        }
    })

}
export const getLinkCalculations = (content: string) => {
    // console.log("incoming:", primaryKeyword, keywords, content)
    return new Promise((resolve, reject) => {
        try {
            // Calculate primary keyword count
            // Create a new DOMParser instance
            const parser = new DOMParser();

            // Parse the HTML string into a document
            const doc = parser.parseFromString(content, 'text/html');

            // Query the document for all <a> tags
            const anchorTags = doc.querySelectorAll('a');
            let ret = anchorTags.length >= 5 && anchorTags.length < 10 ?
                { score: 100, msg: `It is ideal to have 3-5 links per 1000 words` }
                : anchorTags.length > 10 ?
                    { score: 80, msg: `Too many Links! It is ideal to have 3-5 links per 1000 words.` } : { score: anchorTags.length * 100 / 5, msg: `It is ideal to have 3-5 links per 1000 words` }
            // Return the count of <a> tags
            return resolve(ret);

        } catch (e) {
            console.log(e)
            resolve({ score: 0, msg: `It is ideal to have 3-5 links per 1000 words` })
        }
    })

}



function customRound(number: number) {
    const roundedNumber = Math.round(number * 100) / 100; // Round to two decimal places
    return Math.round(roundedNumber); // Round to the nearest integer
}