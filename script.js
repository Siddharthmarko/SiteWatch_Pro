console.log("In the Script");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
});

let arr = [];
async function getAllEveryTab() {
    let tabs = [];
    try {
        tabs = await new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ action: "getTabs" }, (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
        // console.dir(tabs.tabCount);
        tabs.tabCount.map((item) => {
            const urlObject = new URL(item.url);
            arr.push({name: urlObject.hostname, id: item.id});
            return item;
        })
        console.log(arr);
    } catch (err) {
        console.error(err);
    }
}
getAllEveryTab();
