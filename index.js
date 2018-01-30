var form = document.forms[0];
var addButton = document.getElementsByClassName('add')[0];
var ageElem = document.getElementsByName('age')[0];
var relElem = document.getElementsByName('rel')[0];
var smokeElem = document.getElementsByName('smoker')[0];
var ageDiv = document.forms[0].getElementsByTagName('div')[0];
var relDiv = document.forms[0].getElementsByTagName('div')[1];
var list = document.getElementsByClassName('household')[0];
var age;
var rel;
var smoke;
var ageValDiv;
var relValDiv;
var submitDiv;
var jsonData = [];

window.onload = function(e) {
    smoke = smokeElem.checked = false;
    ageValDiv = document.createElement("div");
    ageValDiv.style.color = 'red';
    insertAfter(ageValDiv, ageDiv);
    ageValDiv.innerHTML = '';
    relValDiv = document.createElement("div");
    relValDiv.style.color = 'red';
    insertAfter(relValDiv, relDiv);
    relValDiv.innerHTML = '';
    submitDiv = document.createElement("div");
    submitDiv.style.color = 'red';
    insertAfter(submitDiv, form);
}
ageElem.onchange = function(e) {
    age = this.value.trim();
}
relElem.onchange = function(e) {
    rel = this.value.trim();
}
smokeElem.onchange = function(e) {
    smoke = this.checked;
}
smokeElem.onload = function(e) {
    this.checked = false;
}
form.onsubmit = function(e) {
    e.preventDefault();
    buildJson();
    var preTag = document.getElementsByTagName('pre')[0];
    preTag.innerHTML = JSON.stringify(jsonData, null, ' ');
    preTag.style = 'display:block';
    submitDiv.innerHTML = jsonData.length == 0 ? 'Empty List' : '';
    
}
addButton.onclick = function(e) {
    e.preventDefault();
    var ageValid, relValid = false;
    console.log('age: ' + age + '; rel: ' + rel + '; smoke: ' + smoke);
    if (!isValidAge(age)) {
        ageValDiv.innerHTML = 'Invalid Age';
        ageValid = false;
    } else {
        ageValDiv.innerHTML = '';
        ageValid = true;
    }    
    if (!isValidRel(rel)) {
        relValDiv.innerHTML = 'Invalid Relationship';
        relValid = false;
    } else {
        relValDiv.innerHTML = '';
        relValid = true;
    }    
    if (!ageValid || !relValid) {
        return;
    }
    addHTML(age, rel, smoke);    
}

function buildJson(age, rel, smoke) {
    var root = document.getElementsByClassName('household')[0];
    jsonData.length = 0;
    jsonData = Array.from(root.childNodes).map(function(node) {
        return {
            age: node.childNodes[0].childNodes[0].childNodes[1].innerText.trim(), //sub 1 to skip 'text' node
            relationship: node.childNodes[0].childNodes[1].childNodes[1].innerText.trim(),
            smoker: node.childNodes[0].childNodes[2].childNodes[1].innerText.trim()
        }
    });
}

function addHTML(age, rel, smoke) {
    var element = document.createElement('li');
    var entryDivEl = document.createElement('div');
    
    var ageLabelEl = document.createElement('label');
    var ageSpanEl = document.createElement('span');
    ageSpanEl.innerHTML = age;
    ageLabelEl.innerHTML = 'Age: ';    
    ageLabelEl.appendChild(ageSpanEl);
    ageLabelEl.appendChild(document.createElement('br'));
    var relLabelEl = document.createElement('label');
    relLabelEl.innerHTML = 'Relationship: <span>' + rel + '</span><BR />';
    var smkLabelEl = document.createElement('label');
    smkLabelEl.innerHTML = 'Smoker: <span>' + smoke + '</span><BR />';    
    entryDivEl.appendChild(ageLabelEl);
    entryDivEl.appendChild(relLabelEl);
    entryDivEl.appendChild(smkLabelEl);
    var rmButton = document.createElement('button');
    rmButton.innerHTML = 'Remove';    
    rmButton.onclick = function() {
        list.removeChild(element);
    }
    var breakEl = document.createElement('hr');
    entryDivEl.appendChild(rmButton);
    entryDivEl.appendChild(breakEl);
    list.appendChild(element).appendChild(entryDivEl);
}
function isValidAge(age) {
    return !isNaN(parseInt(age)) && isFinite(age) && age > 0;
}

function isValidRel(rel) {
    console.log('rel: ' + rel);
    return rel != null && rel.trim() != '';
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}



