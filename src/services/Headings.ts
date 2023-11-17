export function getHeadings(htmlString: string) {
    // /:not(#chrm-ext-99r-seo-monster img)
    // const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6::not(#chrm-ext-99r-seo-monster)");
    // return headings;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const filteredHeadings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
    // const excludedElement = document.querySelector("#chrm-ext-99r-seo-monster");

    // const filteredHeadings = Array.from(headings).filter((heading) => {
    //     return heading !== excludedElement && !heading.contains(excludedElement);
    // });
    let finalHeadings: any = [];
    // console.log(filteredHeadings);
    filteredHeadings.forEach(h => {
        let obj = {
            tagName: h.tagName.trim(),
            textContent: h.textContent?.trim()
        }
        finalHeadings.push(obj)
    })
    console.log("sdfksadfksadkfjksadfsadf:", finalHeadings)
    return finalHeadings;
}