//Created by nickoj
//library to be loaded
var commands = '***COMMANDS***\n1. changeid-id-text\n2. changeclass-class-text\n5. hackmusic\n6. cmds';
var uplog = '***UPDATES***\n-Security added\n-Commands RELEASED\n-More commands added\n-Sercurity is now more secure\n-Security(2)\n-Added a hackmusic command that allows you to listen to music';
var asnw = '';
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
for (var i = 0; i < 5; i++)
asnw += possible.charAt(Math.floor(Math.random() * possible.length));
var finessed = '';
var version = '0.5.0';

//Get ip

function securityUP(string) {
    if(string.length > 1) {
        var data = [];
        var finished = '';
        for(var i = string.length -1; i >= 0; i--) {
            data.push(string[i]);
        }
        for(var i2 = 0; i2 < data.length; i2++) {
            finished = finished + data[i2];
        }
        return finished;
    }
}

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
        var listed = ['10.1.1.204', '10.1.1.197', '192.168.20.31', '192.168.20.15', '192.168.20.18'];
        for(var i = listed.length - 1; i >= 0; i--) {
            if (ip == listed[i]) {
                var pins = ['emily', 'jjugly'];
                var response = prompt(ip + ' is whitelisted.\nEnter ASM');
                for(var i = pins.length - 1; i >= 0; i--) {
                    if (response == pins[i]) {
                        finessed = securityUP(asnw);
                        alert('Access has been granted!\nCTRL + ALT to use\nVersion: ' + version + '\n\n' + uplog);
                    }
                }
            }
        }
        if(finessed.length < 12) {
            alert('You do not have permission');
        }
    });
}

function cmds() {
    if(finessed == securityUP(asnw)) {
        alert(commands);
    } else {
        alert('You do not have permission');
    }
}

//commands

function changeid(id, text) {
    if (document.getElementById(id)) {
        document.getElementById(id).innerHTML = text; 
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

function edit(response) {
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

auth();

window.onkeydown = function (e) {
  if (!e) e = window.event;
  if (e.ctrlKey && e.altKey) { 
      if (finessed == securityUP(asnw)) {
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
                  loop = 0;
              }
              if (response == 'changeclass') {
                  var klass = prompt('class');
                  var to = prompt('text');
                  changeclass(klass, to);
                  loop = 0;
              }
              if (response == 'customize') {
                  var text = prompt('tag');
                  edit(text);
                  loop = 0;
              }
              if (response == 'hackmusic') {
                  document.write('<div style="text-align: center;"><h1>Music</h1><h3>Kevin Gates - Really Really</h3><audio controls><source src="https://bingec0der.github.io/Bob/music1.mp3">Your browser does not support the audio element.</audio><h1>Music</h1><h3>Kevin Gates - Out The Mud</h3><audio controls><source src="https://bingec0der.github.io/Bob/music2.mp3">Your browser does not support the audio element.</audio></div>;');
                  loop = 0;
              }
              if (response == 'partner?!') {
                  response = prompt('What is the password?');
                  if (response == 'hardtimes') {
                      for(var loop = 0; loop < 1; loop--) {
                          response = prompt('In one sentence, describe how you are feeling nick');
                          var a = response.includes('bad' || 'Bad');
                          if (a == true) {
                              response = prompt('Did you have a bad day nick?');
                              if (response == 'yes' || 'Yes'); {
                                  prompt('It will get better nick. Dont worry about yourself as much as you should others. You cannot bring happines to yourself. Let it find you.');
                              }
                          }
                      }
                  }
              }
          }
      } else {
          alert('You do not have permission');
      }
  }
};