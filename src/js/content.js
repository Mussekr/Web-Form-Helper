import { generateSsn } from './generators/generateSsn';
import { generateIban } from './generators/generateIban';

let startDate = '1960-01-01';
let endDate = '1980-01-01';

chrome.storage.sync.get('settings', function (obj) {
    const settings = JSON.parse(obj.settings);
    if(settings.startDate !== undefined && settings.endDate !== undefined) {
        startDate = settings.startDate;
        endDate = settings.endDate;
    }
});

chrome.runtime.onMessage.addListener(function (request) {
    switch (request.type) {
        case 'hetu':
            replaceSelectedText(document.activeElement, generateSsn(startDate, endDate));
            break;
        case 'iban':
            replaceSelectedText(document.activeElement, generateIban());
            break;
        default:
            console.error('Type not defined!');
    }
});

function replaceSelectedText(elem, text) {
    const start = elem.selectionStart;
    const end = elem.selectionEnd;
    elem.value = elem.value.slice(0, start) + text + elem.value.substr(end);
    elem.selectionStart = start + text.length;
    elem.selectionEnd = elem.selectionStart;
    if ("createEvent" in document) {
        const evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        elem.dispatchEvent(evt);
    }
    else
        elem.fireEvent("onchange");
}