// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
// console.log(`'Allo 'Allo! Content script`)

{
'use strict';
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const Rx = require('rxjs');
const R = require('ramda');

function sendMessage(keyboardEvent){
    if(keyboardEvent.altKey){
        if(keyboardEvent.key === "h"){
            chrome.runtime.sendMessage({method: "manageTab", type: "closeLeft"}, ()=>{});
        }else if(keyboardEvent.key === "l"){
            chrome.runtime.sendMessage({method: "manageTab", type: "closeRight"}, ()=>{});
        }else if(keyboardEvent.key === "o"){
            chrome.runtime.sendMessage({method: "manageTab", type: "closeOthers"}, ()=>{});
        }else if(keyboardEvent.key === "b"){
            chrome.runtime.sendMessage({method: "manageTab", type: "closeAll"}, ()=>{});
        }
    }
}

$(document).ready(()=>{
    Rx.Observable.fromEvent(document, 'keydown')
        .subscribe(
            event => sendMessage(event),
            err => console.log('[Error] ' + err),
            () => console.log('[complete]'));
    }
)

}
