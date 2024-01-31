export const checkIfDallEExists = (data: any) => {
    // data = [
    //     {
    //         id: "gpt-3.5-turbo-0301",
    //         object: "model",
    //         created: 1677649963,
    //         owned_by: "openai"
    //     },
    //     {
    //         id: "text-embedding-3-large",
    //         object: "model",
    //         created: 1705953180,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "dall-e-3",
    //         object: "model",
    //         created: 1698785189,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "whisper-1",
    //         object: "model",
    //         created: 1677532384,
    //         owned_by: "openai-internal"
    //     },
    //     {
    //         id: "dall-e-2",
    //         object: "model",
    //         created: 1698798177,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "text-embedding-ada-002",
    //         object: "model",
    //         created: 1671217299,
    //         owned_by: "openai-internal"
    //     },
    //     {
    //         id: "tts-1-hd-1106",
    //         object: "model",
    //         created: 1699053533,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "tts-1-hd",
    //         object: "model",
    //         created: 1699046015,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "davinci-002",
    //         object: "model",
    //         created: 1692634301,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "babbage-002",
    //         object: "model",
    //         created: 1692634615,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "text-embedding-3-small",
    //         object: "model",
    //         created: 1705948997,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "gpt-3.5-turbo",
    //         object: "model",
    //         created: 1677610602,
    //         owned_by: "openai"
    //     },
    //     {
    //         id: "gpt-4-0314",
    //         object: "model",
    //         created: 1687882410,
    //         owned_by: "openai"
    //     },
    //     {
    //         id: "gpt-4",
    //         object: "model",
    //         created: 1687882411,
    //         owned_by: "openai"
    //     },
    //     {
    //         id: "gpt-4-32k-0314",
    //         object: "model",
    //         created: 1687979321,
    //         owned_by: "openai"
    //     },
    //     {
    //         id: "gpt-4-0613",
    //         object: "model",
    //         created: 1686588896,
    //         owned_by: "openai"
    //     },
    //     {
    //         id: "gpt-4-vision-preview",
    //         object: "model",
    //         created: 1698894917,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "gpt-3.5-turbo-0613",
    //         object: "model",
    //         created: 1686587434,
    //         owned_by: "openai"
    //     },
    //     {
    //         id: "gpt-3.5-turbo-16k-0613",
    //         object: "model",
    //         created: 1685474247,
    //         owned_by: "openai"
    //     },
    //     {
    //         id: "gpt-4-0125-preview",
    //         object: "model",
    //         created: 1706037612,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "gpt-4-turbo-preview",
    //         object: "model",
    //         created: 1706037777,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "gpt-4-1106-preview",
    //         object: "model",
    //         created: 1698957206,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "gpt-3.5-turbo-1106",
    //         object: "model",
    //         created: 1698959748,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "tts-1-1106",
    //         object: "model",
    //         created: 1699053241,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "gpt-3.5-turbo-instruct",
    //         object: "model",
    //         created: 1692901427,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "tts-1",
    //         object: "model",
    //         created: 1681940951,
    //         owned_by: "openai-internal"
    //     },
    //     {
    //         id: "gpt-3.5-turbo-instruct-0914",
    //         object: "model",
    //         created: 1694122472,
    //         owned_by: "system"
    //     },
    //     {
    //         id: "gpt-3.5-turbo-16k",
    //         object: "model",
    //         created: 1683758102,
    //         owned_by: "openai-internal"
    //     }
    // ]
    try {
        interface Model {
            id: string;
            object: string;
            created: number;
            owned_by: string;
        }

        function findDALL_E_Model(models: Model[]): any {
            const dallE3Exists = models.some(model => model.id === "dall-e-3");
            const dallE2Exists = models.some(model => model.id === "dall-e-2");


            if (dallE3Exists && dallE2Exists) {
                return models.filter(model => model.id === "dall-e-3" || model.id === "dall-e-2");
            } else if (dallE3Exists) {
                return models.filter(model => model.id === "dall-e-3");
            } else if (dallE2Exists) {
                return models.filter(model => model.id === "dall-e-2");
            } else {
                return false;
            }
        }

        // Example usage with the provided data

        // console.log(result);
        if (data != null) {
            const result = findDALL_E_Model(data);
            return result;
        }
        return false;
    } catch (e) {
        console.log("error in checkIfDallEExists:", e)
        return false;
    }


}

export const checkIfGPT4Exists = (data: any) => {

}
