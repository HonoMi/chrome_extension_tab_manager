const hashCode = function(str){
    let hash = 0;
    if (str.length == 0) return hash;
    for(let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        hash = ((hash<<5)-hash) + charCode;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
}

exports.url2hash = function(url){
    return "extension_ShowGoogleQueryWords" + "__urlhash_" + hashCode(url);
}

exports.getQueryWordsFromDOM = function(){
    if(location.href.match(/^.*www\.google.*\/search\?.*q=.*/)){
        return $("title").text().replace(/ - Google.*/, "");
    }else{
        return "";
    }
}
