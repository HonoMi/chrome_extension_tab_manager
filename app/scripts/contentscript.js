// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
// console.log(`'Allo 'Allo! Content script`)
//
// import jquery from 'jquery';
// import 'jquery-slimscroll';

{
'use strict';
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const util = require('./util');

// キーボードリスナーを登録する。
window.document.onkeydown = function(event){
    if(event.altKey){
        if(event.key === "h"/* Upper case because shift key is simultaneously pressed.*/){
            chrome.runtime.sendMessage({method: "manageTab", type: "closeLeft"}, function(response) {});
        }else if(event.key === "l"){
            chrome.runtime.sendMessage({method: "manageTab", type: "closeRight"}, function(response) {});
        }else if(event.key === "o"){
            chrome.runtime.sendMessage({method: "manageTab", type: "closeOthers"}, function(response) {});
        }else if(event.key === "b"){
            chrome.runtime.sendMessage({method: "manageTab", type: "closeAll"}, function(response) {});
        }
    }
}
}
