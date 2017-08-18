import '../img/icon-128.png'
import '../img/icon-34.png'

function getHetuClickHandler(info, tab) {
    chrome.tabs.sendMessage(tab.id, {type: "hetu"});
}

function getIbanClickHandler(info, tab) {
    chrome.tabs.sendMessage(tab.id, {type: "iban"});
}

chrome.contextMenus.create({
    "title": "Generate Hetu",
    "type" : "normal",
    "contexts" : ["editable"],
    "onclick" : getHetuClickHandler
});

chrome.contextMenus.create({
    "title": "Generate IBAN",
    "type" : "normal",
    "contexts" : ["editable"],
    "onclick" : getIbanClickHandler
});
