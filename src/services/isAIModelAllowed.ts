
export const isAIModelAllowed = (model: string, allModel: any) => {
    return new Promise(async (resolve, reject) => {
        allModel.map((m: any, i: number) => {
            if (m.id == model) {
                resolve(true);
            }
            if (i == allModel.length - 1) {
                resolve(false)
            }
        })
    })
}   