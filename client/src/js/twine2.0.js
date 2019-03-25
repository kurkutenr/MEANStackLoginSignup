var test1 = "in parent var";

var historyState = "";
function updateVar(i, t) {
    var curS = JSON.parse(i) 
    if(curS.length > 0 && curS instanceof Array) {
        historyState = i;
        var event = new CustomEvent('onNextPassage', {
            detail: i
        })
        window.dispatchEvent(event);
    }
    
}