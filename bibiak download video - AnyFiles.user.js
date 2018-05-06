// ==UserScript==
// @name         bibiak download video - AnyFiles
// @namespace    http://scripts.biczan.pl
// @version      0.3
// @description  AnyFiles - download video
// @author       bibiak
// @match        http://video.anyfiles.pl/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

try {
	document.getElementsByClassName('container')[0].getElementsByClassName('row')[0].getElementsByTagName('iframe')[0].onload = function() {
		var framewin=document.getElementsByClassName('container')[0].getElementsByClassName('row')[0].getElementsByTagName('iframe')[0].contentWindow;
		var link=document.createElement('a');
		var linkText=document.createTextNode("download");
		link.appendChild(linkText);
		link.href=document.getElementsByClassName('container')[0].getElementsByClassName('row')[0].getElementsByTagName('iframe')[0].contentDocument.getElementsByTagName('video')[0].getElementsByTagName('source')[0].src;
		var framedoc=document.getElementsByClassName('container')[0].getElementsByClassName('row')[0].getElementsByTagName('iframe')[0];
		framedoc.parentNode.insertBefore(link, framedoc);
	};
} catch(e) {
	alert(e.message);
}
