//Created by nickoj
//library to be loaded
var commands = '***COMMANDS***\n1. changeid-id-text\n2. changeclass-class-text\n3. cmds';
var uplog = '***UPDATES***\n-Security added\n-Commands RELEASED';
var lock = true;
var version = '0.2.1';

//Get ip

function getUserIP(onNewIP) {
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }
    pc.createDataChannel("");
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
    });
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

//Bob start

function auth() {
    getUserIP(function(ip) {
        var listed = ['10.1.1.204'];
        for(var i = listed.length - 1; i >= 0; i--) {
            if (ip == listed[i]) {
                var pins = ['emily', 'jjugly'];
                var response = prompt('ASP');
                for(var i = pins.length - 1; i >= 0; i--) {
                    if (response == pins[i]) {
                        alert('[Bob] Welcome user');
                        lock = false;
                        alert('Access has been granted');
                    }
                }
            }
        }
    });
}

function cmds() {
    if (lock == false) {
        alert(commands);
    } else {
        alert('We do not recognize you');
    }
}

//commands

function changeid(id, text) {
    document.getElementById(id).innerHTML = text;
}

function changeclass(klass, text) {
    var change = document.getElementsByClassName(klass);
    for(var bypass = 0; bypass < change.length; bypass++) {
        change[bypass].innerHTML = text;
    }
}

function loginSchool() {
    document.getElementById('LoginUsername').value = 'nicjohns3649';
}

function schoolTime() {
    var d = new Date();
    var n = d.getHours();
    alert(n);
    if (n == '8') {
        alert('You should be finished with ' + 1 + ' classes');
    } else if (n == '9') {
        alert('You should be finished with ' + 2 + ' classes');
    } else if (n == '10') {
        alert('You should be finished with ' + 3 + ' classes');
    } else if (n == '11') {
        alert('You should be finished with ' + 4 + ' classes');
    } else if (n == '12') {
        alert('You should be on ' + 'BREAK' + ' right now');
    } else if (n == '1') {
        alert('You should be finished with ' + 5 + ' classes');
    } else if (n == '2') {
        alert('You should be finished with ' + 6 + ' classes');
    } else if (n == '3') {
        alert('You should be finished with ' + 7 + ' classes');
    }
}

//console for commands

function console() {
    if (lock == false) {
        var response = prompt('Enter a command');
        if (response == 'cmds') {
            cmds();
        } else if (response == 'changeid') {
            changeid(prompt('id'), prompt('text'));
        } else if (response == 'changeclass') {
            changeclass(prompt('class'), prompt('text'));
        } else if (response == 'lesson?') {
            schoolTime();
        }
    } else {
        alert('We do not recognize you');
    }
}

function bookmark(title, url) {
    if(document.all) { // ie
        window.external.AddFavorite(url, title);
    }
    else if(window.sidebar) { // firefox
        window.sidebar.addPanel(title, url, "");
    }
    else if(window.opera && window.print) { // opera
        var elem = document.createElement('a');
        elem.setAttribute('href',url);
        elem.setAttribute('title',title);
        elem.setAttribute('rel','sidebar');
        elem.click(); // this.title=document.title;
    }
}

alert('Bob version ' + version + ' has loaded');
auth();