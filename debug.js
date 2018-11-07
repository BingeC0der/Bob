//Created by nickoj
//library to be loaded
var commands = '***COMMANDS***\n1. changeid-id-text\n2. changeclass-class-text\n3. cmds';
var uplog = '***UPDATES***\n-Security added\n-Commands RELEASED';
var lock = true;
var version = '2.0';

function unlock(user, pass, key) {
    if (user == 'nick' && pass == 'emily' && key == '69') {
        lock = false;
        alert('Successfull');
    }
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
        }
    } else {
        alert('We do not recognize you');
    }
}

alert('Connection successfull');
unlock(prompt('user'), prompt('pass'), prompt('key'));
if (lock == false) {
    alert(uplog);
} else {
    alert('Failed')
}