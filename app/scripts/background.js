// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
{
"use strict";
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const util = require('./util')

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.method == "manageTab"){
            // activeなタブ(現在見ているタブ)
            chrome.tabs.query({active: true, currentWindow: true}, function(result){
                const curTabId = result[0].id;
                // 全てのタブ
                chrome.tabs.query({currentWindow: true}, function(result){
                    const closeTabIds = [];
                    if(request.type === "closeAll"){
                        for(let i=0; i<result.length; i++){
                            const tabId = result[i].id;
                            console.log(tabId);
                            closeTabIds.push(tabId);
                        }
                    }else if(request.type === "closeOthers"){
                        for(let i=0; i<result.length; i++){
                            const tabId = result[i].id;
                            if(tabId !== curTabId){
                                closeTabIds.push(tabId);
                            }
                        }
                    }else{
                        let curTabPassed = false;
                        for(let i=0; i<result.length; i++){
                            const tabId = result[i].id;
                            if(tabId === curTabId){
                                curTabPassed = true;
                                continue;
                            }
                            if(request.type === "closeRight" && curTabPassed){
                                closeTabIds.push(tabId)
                            }
                            if(request.type === "closeLeft" && !curTabPassed){
                                closeTabIds.push(tabId)
                            }
                        }
                    }
                    chrome.tabs.remove(closeTabIds);
                })
            })

        }
        sendResponse({});
    });

}
