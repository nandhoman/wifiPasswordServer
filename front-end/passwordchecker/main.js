var ButtonValue = "Login";

function MainButton(){
    switch(ButtonValue) {
        case "Login":
            ButtonValue = "Loading";
            LoadingStart();
            getwifipassword();
            break;
        case "Loading":
            console.log("loading");
            break;
        case "reset":
            location.reload();
            break;
    }

}

function LoadingStart() {
    document.getElementById("TextShow").style.display = "none";
    document.getElementsByClassName("lds-ellipsis")[0].style.display = "inline-block";
    document.getElementsByClassName("input")[0].style.display = "none";
    document.getElementsByClassName("input")[1].style.display = "none";
    document.getElementsByClassName("subtitle")[0].style.display = "none";
    document.getElementsByClassName("placeholder")[0].style.display = "none";
    document.getElementsByClassName("placeholder")[1].style.display = "none";
}

function getwifipassword() {
    var SsidRequested = document.getElementById("SSID").value;
    var HostnameRequested = document.getElementById("hostname").value;
    var parameters = `?hostname=${HostnameRequested}&ssid=${SsidRequested}`
    
    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/password';
    
    Http.open("GET", url + parameters);
    Http.send();
    Http.onreadystatechange = (e) => {
    
    var response = JSON.parse(Http.responseText);
    
    if (Http.responseText == "[]"){
        SwitchToEmptyResult();
    }
    else {
        var SsidResult = response[0].SSID;
        var PasswordResult = response[0].password;
        var HostnameResult = response[0].hostname;
        SwitchToResult(SsidResult, PasswordResult, HostnameResult);
        
    }
}
}

function SwitchToResult(SsidResult, PasswordResult, HostnameResult) {
    document.getElementsByClassName("lds-ellipsis")[0].style.display = "none";
    document.getElementById("SsidResult").innerHTML = SsidResult;
    document.getElementById("PasswordResult").innerHTML = PasswordResult;
    
    var explanation = `On the device with hostname: "${HostnameResult}" are different wifi credentials found. 
    These credentails are stored in a secured cloud environment.
    The credentails will be delete after this project. The credentails are as following:`
    document.getElementsByClassName("explanation")[0].innerHTML = explanation;
    document.getElementById("TextShow").innerHTML = "Reset";
    ButtonValue = "reset"
    document.getElementById("TextShow").style.display = "inline-block";
    document.getElementsByClassName("form")[0].style.height = "410px";
}

function SwitchToEmptyResult() {
    document.getElementsByClassName("lds-ellipsis")[0].style.display = "none";
    
    var explanation = `With the given values we can't find a ssid or password.
    Please mention the fields are case sensitive.`
    document.getElementsByClassName("explanation")[0].innerHTML = explanation;
    document.getElementById("TextShow").innerHTML = "Reset";
    ButtonValue = "reset"
    document.getElementById("TextShow").style.display = "inline-block";
    document.getElementsByClassName("form")[0].style.height = "290px";
}

