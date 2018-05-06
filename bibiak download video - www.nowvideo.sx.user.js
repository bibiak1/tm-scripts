// ==UserScript==
// @name         bibiak download video - www.nowvideo.sx
// @namespace    http://scripts.biczan.pl/
// @version      1.0
// @description  try to take over the world!
// @author       bibiak
// @match        http://www.nowvideo.sx/video/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if( flashvars )
    {
        var link1="http://www.nowvideo.sx/api/player.api.php?pass=undefined&user=undefined&cid=" + flashvars.cid + "&file=" + flashvars.file + "&cid2=" + flashvars.cid2 + "&key=" + flashvars.filekey + "&numOfErrors=0&cid3=" + flashvars.cid3;
        console.log(link1);

        $.ajax({
            url: link1
        }).done(function(data) {
            var link2=data.replace("url=", "").replace(/&title.*$/, "");
            //alert(link2);
            document.getElementById("content_player").getElementsByTagName("a")[0].href = link2;
        });
    }
})();
