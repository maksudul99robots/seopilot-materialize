export const sendTokenToExtension = (token: string, extensionId: any) => {
    if (extensionId && extensionId.length > 1) {
        chrome.runtime.sendMessage(
            extensionId,
            { action: "storeToken", token: token },
            (response) => {
                console.log("response:", response)
                if (response && response.success) {
                    console.log("Token stored in extension's local storage.", response);
                } else {
                    console.error("Failed to store token in extension.");
                }
            }
        );
    }

};