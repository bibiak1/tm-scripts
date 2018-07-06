// ==UserScript==
// @name         bibiak download video - no popup
// @namespace    http://blog.biczan.pl/
// @version      0.2
// @description  try to take over the world!
// @author       bibiak
// @match        http://thevideo.me/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

try {
    window.open=function(e) { console.log("Script tried to open: " + e); };
} catch(e) {
	alert(e.message);
}
