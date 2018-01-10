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

setTimeout(

function(){

$(document).ready(function(){
    const url = location.href;
    chrome.runtime.sendMessage({method: "getQueryWords", url: url}, function(response){
            const googleQueryWords = util.getQueryWordsFromDOM() !== "" ? util.getQueryWordsFromDOM() : response
            if(googleQueryWords !== ""){
                const urls = $("a[href]").map(function(){
                    const path = $(this).attr("href");
                    if(path.match("^\/.*")){
                        return location.protocol + "//" + location.hostname + path
                    }else{
                        return path
                    }
                })
                chrome.runtime.sendMessage({method: "storeQueryWords", urls: urls, googleQueryWords: googleQueryWords}, function(response) {});
            }
        });

})


const url = location.href;
chrome.runtime.sendMessage({method: "getQueryWords", url: url}, function(response){

    const googleQueryWords = util.getQueryWordsFromDOM() !== "" ? util.getQueryWordsFromDOM() : response
    const title = $("title").text().replace(/\n/g, "").replace(/^ +/, "").replace(/ +$/g, "")

    // meta情報を表示するdiv
    const div = $("<div>").attr("id", "show_google_query_words_meta").attr("class", "meta_parent");
    $("<li>").attr("id", "show_google_query_words_title").append($("<span>").text("title: ")).append(title).appendTo(div);
    $("<li>").attr("id", "show_google_query_words_query").append($("<span>").text("query: ")).append(googleQueryWords).appendTo(div);
    if($("#show_google_query_words_meta").length === 0){
        $("body").append(div);
    }else{
        $("#show_google_query_words_meta").replaceWith(div);
    }

    // mouseoverで隠す。
    $("#show_google_query_words_meta").on("mouseover", function(){
        $("#show_google_query_words_meta").attr("id", "hide");
        setTimeout(function() { $("#hide").attr("id", "show_google_query_words_meta") }, 5000);
        });

})
// Css
chrome.runtime.sendMessage({method: "callForCSS"})


}
, 3000);
}
