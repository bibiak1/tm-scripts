// ==UserScript==
// @name         bibiak FunBox modifications
// @namespace    http://scripts.biczan.pl/
// @version      2.1
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

try {
    if( !window.$ ) return;
    if( !$ )  $ = window.$;

    if( $('disconnectedDeviceMenu') ) $('disconnectedDeviceMenu').children[0].innerHTML += '<li><a id="deletedevicemenuitem" href=""><span class="auth-required first active translation Translations.notconnecteddevices.label.deletedevice">usuń urządzenie</span></a></li>';

    //new_hideDeviceMenu;
    $('devicemenuheader').innerHTML += '<br/><span id="macaddress-device-menu" class="translation Translations.advconfig.network.dhcp.label.macaddress"></span> : <span id="mac">00:00:00:00:00:00</span>';
    var newCode = '$("mac").update(device.PhysAddress ? device.PhysAddress : device.Key);if (device.IPAddress){';
    $('deviceMenu').childNodes[1].style.width="300px";

    // object in "o" as JSON, or in objet.status as Object, Sah.Forms[6].objects.Devices

    var new_changeDevice = eval("(" + EventListner.Observe.method('changeDevice').toString().replace('if (device.IPAddress){', newCode) + ")");
    EventListner.Observe.removeMethod('changeDevice');
    EventListner.Observe.addMethod('changeDevice', new_changeDevice);

    var new_fillForm = eval("(" + Home.CustomizeDevice.method('fillForm').toString().replace('update(this.objects.device.Name)', 'update(this.objects.device.Name+\' :: \'+(this.objects.device.PhysAddress?this.objects.device.PhysAddress:this.objects.device.Key)+\' [\'+this.objects.device.IPAddress+\']\')' ) + ")");
    Home.CustomizeDevice.removeMethod('fillForm');
    Home.CustomizeDevice.addMethod('fillForm', new_fillForm);

    Sah.translator.refresh();
} catch(e) {
    alert(e.message);
}
