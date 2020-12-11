/* Example code for Evolv project dependencies */

var company = "None";
var teamCookieValue = getCookie('team');

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

if (teamCookieValue === "TeamWest") {
    company = "Western Corp";
} else if (document.querySelector("meta[name='IBM']")) {
    company = "IBM";
};

var loggedIn = false;
const clientCookie = 'companyLoggedIn'
const evolvKeyName = 'evolv:loggedin';
var loggedInThisSession = false;
var loggedInLast30Days = false;

if (getCookie(clientCookie)) {
    setCookie(evolvKeyName, 1, 30);
    sessionStorage.setItem(evolvKeyName, 1);
    loggedIn = true;
    loggedInLast30Days = true;
    loggedInThisSession = true;
} else {
    if (getCookie(evolvKeyName)) {
        loggedInLast30Days = true;
    }
    
    if (sessionStorage.getItem(evolvKeyName)) {
        loggedInThisSession = true;
    }
}

evolv.context.update({company:company,
                      logged_in:loggedIn,
                      logged_in_session:loggedInThisSession,
                      logged_in_last_30_days:loggedInLast30Days});