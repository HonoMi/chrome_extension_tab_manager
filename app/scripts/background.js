// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
{
"use strict";
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const util = require('./util')

const URLHASH_TO_QUERYWORDS_DICT = {}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "storeQueryWords"){
        const googleQueryWords = request["googleQueryWords"];
        const urlsAll = Object.keys(request["urls"]).map(key=>request["urls"][key].toString()).map(url => decodeURIComponent(url));
        const urls = urlsAll.filter(url => ! url.match(/^#.*/));;
        const urlHashes = urls.map(url => util.url2hash(url))
        urlHashes.forEach(hash => URLHASH_TO_QUERYWORDS_DICT[hash]=googleQueryWords)
        sendResponse({});
    }else if(request.method == "getQueryWords"){
        const url = decodeURIComponent(request["url"]);
        const urlHash = util.url2hash(url);
        if(urlHash in URLHASH_TO_QUERYWORDS_DICT){
            sendResponse(URLHASH_TO_QUERYWORDS_DICT[urlHash]);
        }else{
            sendResponse("");
        }
    }else if(request.method == "callForCSS"){
        console.log('insertCSS');
        chrome.tabs.insertCSS(sender.tab.id, { file:"styles/styles.css" });
    }
});

}


// {
// 
// 
// chrome.runtime.onInstalled.addListener((details) => {
//   console.log('previousVersion', details.previousVersion)
// })
// 
// console.log(`'Allo 'Allo! Event Page`)
// 
// 
// }
