// ==UserScript==
// @name         bibiak download video - videomega.tv
// @namespace    http://scripts.biczan.pl/
// @version      1.0
// @description  try to take over the world!
// @author       bibiak
// @match        http://videomega.tv/?ref=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function get()
    {
        if( !window.frames[0] || !window.frames[0].player )
        {
            setTimeout(get, 1000);
        }
        else
        {
            console.log(window.frames[0].player.src());
            var link1=window.frames[0].player.src();

            var bb_btn = document.createElement("A");
            var bb_t = document.createTextNode("Download");
            bb_btn.appendChild(bb_t);
            bb_btn.href=link1;
            bb_btn.text="Download";
            document.getElementsByClassName('video')[0].appendChild(bb_btn);
        }
    }
    setTimeout(get, 1000);
})();
