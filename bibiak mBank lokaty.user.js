// ==UserScript==
// @name         bibiak mBank lokaty
// @namespace    http://blog.biczan.pl
// @version      0.10
// @description  Tworzy lokaty automagicznie
// @author       You
// @match        https://form.mbank.pl/webforms/?stkn=LOK*
// @grant        GM_registerMenuCommand
// ==/UserScript==
/* jshint -W097 */
//'use strict';

window.bb_dni = 3;
window.bb_oprocentowanie = 1.5;
window.bb_zysk = 0.10501;
window.bb_dzielnik = 0;
window.bb_dzielnik_copy = 1;
window.bb_minkwota = 500;

function bb_setLokaty() {
    console.log("[D] bb_setLokaty start");
    var bb_rach = document.getElementsByName('GesComplexComponent3.GesCombobox1')[0].selectedIndex;
    console.log("[D] bb_rach=" + bb_rach);
    var bb_text = document.getElementsByName('GesComplexComponent3.GesSection1')[0].getElementsByClassName('iew-ComboboxText')[0].innerHTML;
    console.log("[D] bb_text=" + bb_text);
    var bb_wart = bb_text.slice(bb_text.search(": ")+2, bb_text.search(" PLN")).replace(" ", "").replace(",", ".");
    console.log("[D] bb_wart=" + bb_wart);

    window.bb_dzielnik = window.bb_dzielnik_copy*2<=bb_wart?window.bb_dzielnik_copy:bb_wart;

    console.log("[D] window.bb_dzielnik=" + window.bb_dzielnik);
    var bb_ilosc = Math.floor(bb_wart/window.bb_dzielnik);
    console.log("[D] bb_ilosc=" + bb_ilosc);
    var bb_kwota = window.bb_dzielnik; //Math.floor(bb_wart*100/bb_ilosc)/100;
    console.log("[D] bb_kwota=" + bb_kwota);
    if( bb_wart-(bb_ilosc*bb_kwota)<window.bb_minkwota ) bb_ilosc--;
    console.log("[D] bb_ilosc=" + bb_ilosc);

    var bb_ikwota=document.getElementsByName('GesComplexComponent4.GesTextField1')[0];
    var bb_iliczba=document.getElementsByName('GesComplexComponent4.GesCombobox1')[0];

    document.getElementById('bb_dzielnik').innerText='Kwota lokaty: ' + window.bb_dzielnik;

    bb_ikwota.value=bb_kwota;
    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        bb_ikwota.dispatchEvent(evt);
        setTimeout(function(){ bb_iliczba.selectedIndex=bb_ilosc-1; bb_iliczba.dispatchEvent(evt); }, 1000);
    }
    else
    {
        bb_ikwota.fireEvent("onchange");
        setTimeout(function(){ bb_iliczba.selectedIndex=bb_ilosc-1; bb_iliczba.fireEvent("onchange"); }, 1000);
    }
}

window.bb_buttonloaded = false;

function bb_start() {
    console.log('bb_start');
    document.addEventListener("DOMNodeInserted", function() {
        if ( !window.bb_buttonloaded && document.location.toString().match(/Page2/) && document.getElementsByClassName('iew-CenteringFlowPanel iew-nextButtonPanel').length==2 && document.getElementsByClassName('iew-formSideBar-container').length==1 ) {
            window.bb_oprocentowanie = parseFloat(document.getElementsByName('GesComplexComponent1.GesSection1')[0].getElementsByTagName('span')[2].innerHTML.replace('%','').replace(',', '.'));
            window.bb_dzielnik_copy = Math.round(window.bb_zysk/(window.bb_oprocentowanie/100/365*window.bb_dni)*100)/100;

            window.bb_buttonloaded = true;
            var bb_btn = document.createElement("BUTTON");
            var bb_t = document.createTextNode("Wypełnij");
            bb_btn.appendChild(bb_t);
            bb_btn.className='gwt-Button iew-button iew-nextButton';
            bb_btn.onmousedown = bb_setLokaty;
            document.getElementsByClassName('iew-CenteringFlowPanel iew-nextButtonPanel')[1].appendChild(bb_btn);

            var bb_div = document.createElement("DIV");
            var bb_text = document.createElement("DIV"); bb_text.innerText='Sprawdzenie:'; bb_div.appendChild(bb_text);
            bb_text = document.createElement("DIV"); bb_text.id = 'bb_dni'; bb_text.innerText='Dni: ' + window.bb_dni; bb_div.appendChild(bb_text);
            bb_text = document.createElement("DIV"); bb_text.id = 'bb_oprocentowanie'; bb_text.innerText='Oprocentowanie: ' + window.bb_oprocentowanie; bb_div.appendChild(bb_text);
            bb_text = document.createElement("DIV"); bb_text.id = 'bb_zysk'; bb_text.innerText='Zysk: ' + window.bb_zysk; bb_div.appendChild(bb_text);
            bb_text = document.createElement("DIV"); bb_text.id = 'bb_dzielnik'; bb_text.innerText='Kwota lokaty: ' + window.bb_dzielnik; bb_div.appendChild(bb_text);
            bb_text = document.createElement("DIV"); bb_text.id = 'bb_minkwota'; bb_text.innerText='Min. kwota: ' + window.bb_minkwota; bb_div.appendChild(bb_text);

            document.getElementsByClassName("iew-formSideBar-container")[0].appendChild(bb_div);
        }
    });
}

if(window.addEventListener){
    window.addEventListener('load',bb_start,false); //W3C
}
else{
    window.attachEvent('onload',bb_start); //IE
}

GM_registerMenuCommand('Wypełnij lokaty', bb_setLokaty);
