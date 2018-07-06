// ==UserScript==
// @name         bibiak FunBox JSON fix
// @namespace    http://scripts.biczan.pl/
// @version      1.0
// @description  bibiak FunBox modifications for SoftAtHome SG10_sip-pl-6.2.19.17 firmware
// @author       bibiak
// @match        *://*/notConnectedDevices.html*
// @match        *://*/homeDevicesCustomize.html*
// @match        *://10.10.0.254/*
// @include      *://*/notConnectedDevices.html*
// @include      *://*/homeDevicesCustomize.html*
// @include      *://10.10.0.254/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
//'use strict';

(function() {
    'use strict';

    window.escapeUnicode = function(str, shouldEscapePrintable){
        return str.replace(/[\s\S]/g, function(ch){
            // skip printable ASCII chars if we should not escape them
            if (!shouldEscapePrintable && (/[\x20-\x7E]/).test(ch)) {
                return ch;
            }
            // we use "000" and slice(-4) for brevity, need to pad zeros,
            // unicode escape always have 4 chars after "\u"
            return '\\u'+ ('000'+ ch.charCodeAt(0).toString(16)).slice(-4);
        });
    }
    JSON.old_parse=JSON.parse
    JSON.parse=function(str) { return JSON.old_parse(window.escapeUnicode(str)) }
})();
