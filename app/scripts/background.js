// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
{
"use strict";
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const _ = require('lodash');
const R = require('ramda');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method !== "manageTab"){
        sendResponse({});
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs){
        const curTabId = activeTabs[0].id;
        // 全てのタブ
        chrome.tabs.query({currentWindow: true}, function(activeTabs){
            // let closeTabIds = [];
            if(request.type === "closeAll"){
                chrome.tabs.remove(
                    _(activeTabs)
                        .map(tab=>tab.id)
                        .value()
                    )
            }else if(request.type === "closeOthers"){
                chrome.tabs.remove(
                    _(activeTabs)
                        .filter(tab=>tab.id !== curTabId)
                        .map(tab=>tab.id)
                        .value()
                    )
            }else if(request.type === "closeLeft"){
                chrome.tabs.remove(
                     _(activeTabs)
                        .map(tab=>tab.id)
                        .takeWhile((tabId, index, array)=>tabId!==curTabId)
                        .value()
                    )
            }else if(request.type === "closeRight"){
                chrome.tabs.remove(
                     _(activeTabs)
                        .map(tab=>tab.id)
                        .takeRightWhile((tabId, index, array)=>tabId!==curTabId)
                        .value()
                    )
            }
        })
    })
    sendResponse({});
});

}
