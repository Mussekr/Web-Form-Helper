import "../css/options.css";
function saveChanges() {
    const startDate = document.getElementById('start').value;
    const endDate  = document.getElementById('end').value;
    const prefs = JSON.stringify({
        startDate: startDate,
        endDate: endDate
    });
    if(!startDate || !endDate) {
        message('Start or end date empty!');
        return false;
    }
    chrome.storage.sync.set({'settings': prefs}, function() {
        // Notify that we saved.
        message('Settings saved');
    });

}
function message(msg) {
    document.getElementById('message').innerHTML = msg;
}
document.getElementById("saveButton").addEventListener("click",saveChanges);

window.addEventListener("load", function() {
    chrome.storage.sync.get('settings', function (obj) {
        const settings = JSON.parse(obj.settings);
        if(settings.startDate !== undefined && settings.endDate !== undefined) {
            document.getElementById('start').value = settings.startDate;
            document.getElementById('end').value = settings.endDate;
        }
    })
});