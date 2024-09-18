import { arrow } from "@popperjs/core";

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

export const getWordCountCalculations = (words: number, avg: any) => {

    if (avg?.avg_wc && Math.trunc(avg?.avg_wc) <= words) {

        return { score: 100, msg: `The average word count of the similar articles is ${Math.trunc(avg.avg_wc)}`, arrow: 'tdesign:arrow-up' }
    } else if (avg?.avg_wc && avg.avg_wc > 0) {
        let score = (words * 100) / avg.avg_wc
        return { score: score, msg: `The average word count of the similar articles is ${Math.trunc(avg.avg_wc)}`, arrow: 'tdesign:arrow-down' }
    } else {
        return { score: 100, msg: `The average word count of the similar articles is ${Math.trunc(avg.avg_wc)}`, arrow: 'tdesign:arrow-up' }
    }

    // if (words < 2101) {
    //     let score = ((words) / 2100) * 100
    //     score = customRound(score)
    //     return { score: score, msg: "Ideal word count is 2100." }
    // } else {
    //     if (words > 2500 && words < 3000) {
    //         let extra = words - 2500;
    //         let score = ((2500 - extra) / 2500) * 100
    //         score = customRound(score)
    //         return { score: score, msg: "Ideal word count is ~2100. Try to keep it around 2100-2500." }
    //     } else if (words > 3000) {
    //         return { score: 60, msg: "Article is too long. Ideal word count is ~2100. Try to keep it around 2100-2500." }
    //     } else { // words > 2101. words <3000, words <2500
    //         return { score: 100, msg: "Ideal word count is ~2100." }
    //     }
    // }


}
export const getHeadingsCalculations = (headings: any, avg: any) => {

    if (avg?.avg_h && Math.trunc(avg?.avg_h) <= headings.length) {

        return { score: 100, msg: `The average number of Headings of the similar articles is ${Math.trunc(avg.avg_h)}`, arrow: 'tdesign:arrow-up' }
    } else if (avg?.avg_h && avg.avg_h > 0) {
        let score = (headings.length * 100) / avg.avg_h
        return { score: score, msg: `The average number of Headings of the similar articles is ${Math.trunc(avg.avg_h)}`, arrow: 'tdesign:arrow-down' }
    } else {
        return { score: 100, msg: `The average number of Headings of the similar articles is ${Math.trunc(avg.avg_h)}`, arrow: 'tdesign:arrow-up' }
    }

    // if (words < 2101) {
    //     let score = ((words) / 2100) * 100
    //     score = customRound(score)
    //     return { score: score, msg: "Ideal word count is 2100." }
    // } else {
    //     if (words > 2500 && words < 3000) {
    //         let extra = words - 2500;
    //         let score = ((2500 - extra) / 2500) * 100
    //         score = customRound(score)
    //         return { score: score, msg: "Ideal word count is ~2100. Try to keep it around 2100-2500." }
    //     } else if (words > 3000) {
    //         return { score: 60, msg: "Article is too long. Ideal word count is ~2100. Try to keep it around 2100-2500." }
    //     } else { // words > 2101. words <3000, words <2500
    //         return { score: 100, msg: "Ideal word count is ~2100." }
    //     }
    // }


}
export const getTermCalculations = (primaryKeyword: string, keywords: any = [], content: string, wordCount: number, setKeywordsCount: any) => {
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
            let primaryKeywordScore = (60 * count) / idealPKcount
            !keywords ? keywords = [] : null;
            keywords = keywords.filter((item: any) => item.keyword !== primaryKeyword.toLowerCase());
            let usedKeywords = 0;
            let secondaryKeywordScore = 0;
            // console.log("keywords.length:", keywords.length)

            keywords.map((k: any, i: number) => {
                if (k.count > 0)
                    usedKeywords++;
                if (i == keywords.length - 1) {
                    if (usedKeywords >= 10) {
                        secondaryKeywordScore = 40;
                    } else {
                        secondaryKeywordScore = (40 * usedKeywords) / 10;
                        let total = (primaryKeywordScore + secondaryKeywordScore).toFixed(0)
                        setKeywordsCount(count + usedKeywords)
                        // console.log({ score: primaryKeywordScore + secondaryKeywordScore, msg: `Primary Keyword score: ${primaryKeywordScore} , Secondary Keyword Score: ${secondaryKeywordScore}` })
                        resolve({
                            score: primaryKeywordScore + secondaryKeywordScore,
                            msg: `The target keywords should appear at least ${Math.trunc(idealPKcount)} times, and the secondary keywords should appear at least 10 times`,
                            arrow: (count >= idealPKcount && usedKeywords >= 10) ? 'tdesign:arrow-up' : 'tdesign:arrow-down'
                        })
                    }
                }
            })

        } catch (e) {
            console.log("error.......:", e)
            resolve({ score: 0, msg: `Target Keyword score: 0 , Secondary Keyword Score: 0`, arrow: 'tdesign:arrow-down' })
        }
    })

}
export const getLinkCalculations = (content: string, avg: any, setLink: any) => {
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
            setLink(anchorTags.length)
            if (avg?.avg_urls && Math.trunc(avg?.avg_urls) <= anchorTags.length) {
                let score = 100
                return resolve({ score: 100, msg: `The average number of Links of the similar articles is ${Math.trunc(avg.avg_urls)}`, links: anchorTags.length, arrow: 'tdesign:arrow-up' })
            } else if (avg?.avg_urls && avg.avg_urls > 0) {
                let score = (anchorTags.length * 100) / avg.avg_urls
                return resolve({ score: score, msg: `The average number of Headings of the similar articles is ${Math.trunc(avg.avg_urls)}`, links: anchorTags.length, arrow: 'tdesign:arrow-down' })
            } else {
                resolve({ score: 100, msg: `The average number of Headings of the similar articles is ${Math.trunc(avg.avg_urls)}`, links: anchorTags.length, arrow: 'tdesign:arrow-up' })
            }

        } catch (e) {
            console.log(e)
            resolve({ score: 0, msg: `The average number of Headings of the similar articles is ${Math.trunc(avg.avg_urls)}`, links: 0, arrow: 'tdesign:arrow-down' })
        }
    })

}



function customRound(number: number) {
    const roundedNumber = Math.round(number * 100) / 100; // Round to two decimal places
    return Math.round(roundedNumber); // Round to the nearest integer
}