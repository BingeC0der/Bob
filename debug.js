//Created by nickoj
//library to be loaded
var commands = '***COMMANDS***\n1. changeid-id-text\n2. changeclass-class-text\n3. slogin\n4. lesson?\n5. hackmusic\n6. cmds';
var uplog = '***UPDATES***\n-Security added\n-Commands RELEASED\n-More commands added\n-Sercurity is now more secure\n-Security(2)\n-Added a hackmusic command that allows you to listen to music';
var lock = true;
var version = '0.4.1';

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
        var response = prompt('S ' + 'E ' + 'C ' + 'R ' + 'E ' + 'T');
        if (response == 'myip') {
            var crypt = ':00.1.09' + ip;
            crypt = crypt.reverse();
            alert('ip = ' + '+1' + crypt);
        }
        var listed = ['10.1.1.204', '10.1.1.197'];
        for(var i = listed.length - 1; i >= 0; i--) {
            if (ip == listed[i]) {
                var pins = ['emily', 'jjugly'];
                response = prompt(ip + ' is whitelisted.\nEnter ASM');
                for(var i = pins.length - 1; i >= 0; i--) {
                    if (response == pins[i]) {
                        lock = false;
                        alert('Access has been granted!\nCTRL + ALT to use\nVersion: ' + version + '\n\n' + uplog);
                    }
                }
            }
        }
        if(lock == true) {
            alert('You do not have permission');
        }
    });
}

function bypassTime() {
    for(var wait = 0; wait < 1000; wait++) {
        //donothing
    }
}

function cmds() {
    if(lock == false) {
        alert(commands);
    } else {
        alert('You do not have permission');
    }
}

//commands

function changeid(id, text) {
    if (document.getElementById(id)) {
        document.getElementById(id).innerHTML = text; 
        bypassTime();
    } else {
        alert(id + ' is not valid');
    }
}

function changeclass(klass, text) {
    if (document.getElementsByClassName(klass)) {
        for(var bypass = 0; bypass < document.getElementsByClassName(klass).length; bypass++) {
            document.getElementsByClassName(klass)[bypass].innerHTML = text;
        }   
    } else {
        alert(klass + ' is not valid');
    }
}

function destroy(response) {
    if (response == 'h1') {
        response = prompt('<h1> text');
        if (response == 'center') {
            response = prompt('<h1> centered text');
            document.write('<h1 style = "text-align: center;">' + response + '</h1>');
        } else {
            document.write('<h1>' + response + '</h1>');
        }
    }
}

function loginSchool() {
    document.getElementById('LoginUsername').value = 'nicjohns3649';
    document.getElementById('LoginPassword').value = '12545';
    document.getElementById('LoginSubmit').click();
}

function schoolTime() {
    var d = new Date();
    var n = d.getHours();
    if (n == '8') {
        alert('You should be finished with ' + 1 + ' class');
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

auth();

window.onkeydown = function (e) {
  if (!e) e = window.event;
  if (e.ctrlKey && e.altKey) { 
      if (lock == false) {
          for(var loop = 1; loop > 0; loop = loop) {
              var response = prompt('command\n"cmds" for list of commands\n"stop" to close');
              if (response == 'stop') {
                  loop = 0;
              }
              if (response == 'cmds') {
                  cmds();
              }
              if (response == 'changeid') {
                  var id = prompt('id');
                  var to = prompt('text');
                  changeid(id, to);
              }
              if (response == 'changeclass') {
                  var klass = prompt('class');
                  var to = prompt('text');
                  changeclass(klass, to);
              }
              if (response == 'lesson?') {
                  schoolTime();
              }
              if (response == 'slogin') {
                  loginSchool();
              }
              if (response == 'destroy') {
                  var text = prompt('tag');
                  destroy(text);
              }
              if (response == 'hackmusic') {
                  document.write('document.write("<div style="text-align: center;"><h1>Music</h1><h3>Kevin Gates - Really Really</h3><audio controls><source src="https://bingec0der.github.io/Bob/music1.mp3">Your browser does not support the audio element.</audio></div>");');
              }
          }
      } else {
          alert('You do not have permission');
      }
  }
};