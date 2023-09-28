export const sendTokenToExtension = (token: string ,extensionId:any) => {
    if (extensionId && extensionId.length > 1) {
        // console.log("sending!!")
        chrome.runtime.sendMessage(
            // localStorage.getItem("extension_id"), // Extension ID
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