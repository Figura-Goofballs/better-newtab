
var noclick = false

function getClosestFactors(num) {
    if (num < 1) {
        return null; // No factors for 1 or less
    }

    if (num == 1) {
        return [1, 1]
    }

    const root = Math.floor(Math.sqrt(num)); // Square root rounded down

    // Check from sqrtNum down for factors
    for (let i = root; i >= 1; i--) {
        if (num % i === 0) {
            if (i == 1 || num / i == 1) {
                return getClosestFactors(num + 1);
            }else {
                return [i, num / i]; // Found factors, return them as an array
            }
        }
    }
}

window.onload = function() {
    if (navigator.userAgent.includes('Firefox')) {
        document.getElementById('favicon').setAttribute('href', 'chrome://branding/content/icon32.png')
    }else {
        document.getElementById('favicon').setAttribute('href', '/favicon.svg')
    }
 
    // Disable dark reader (it fucks up my css)
    const lock = document.createElement('meta');
    lock.name = 'darkreader-lock';
    document.head.appendChild(lock);

    var dialog;

    var closeButton = document.getElementById("close");
    var hidden = document.getElementById("hidden");
    var dialogContainer = document.getElementById("dialog-container");
    var removeButton = document.getElementById("remove");

    closeButton.onclick = function () {
        hidden.appendChild(dialog);
        dialogContainer.style.visibility = 'hidden';
    }

    document.getElementById("add").onclick = function () {
        document.getElementById("add-close-container").appendChild(closeButton);

        dialogContainer.appendChild(document.getElementById("add-dialog"));

        closeButton.style = 'position: absolute; top: 0; right: 0; translate: translateX(-100%);'
        dialogContainer.style.visibility = 'visible';

        dialog = document.getElementById("add-dialog");
    }

    document.getElementById("add-panel").onclick = function () {
        var url = document.getElementById("url-input").value;
        var name = document.getElementById("name-input").value;
        var icon = document.getElementById("icon-input").value;

        if (name === '') {
            name = url
        }

        console.log(url, name, icon)
        closeButton.onclick()
    }


    var panelContainer = document.getElementById('panel-container')

    function generatePanels(panels) {
        panelContainer.innerHTML = ''
        const factors = getClosestFactors(panels.length)

        factors.sort((a, b) => b - a);

        var iter = 0

        for (i = 0; i < panels.length; i++) {
            panelContainer.appendChild(panels[i])
        }

        panelContainer.style.gridTemplateRows = `repeat(${factors[1]}, 1fr)`;
        panelContainer.style.gridTemplateColumns = `repeat(${factors[0]}, 1fr)`;
    }

    // Example panels   
    var tbl = []

    for (i = 0; i < 128; i++) {
        let elem = document.createElement('div')
        elem.classList = 'panel narrow'
        elem.onclick = function() {
            if (noclick == false) {
                window.open('https://www.example.com/')
            }
            noclick = false
        }
        elem.innerHTML = `<div class='square'><svg xmlns="http://www.w3.org/2000/svg" viewbox='0 0 420 420' width="420"
        height="420" stroke="#000" fill="none">
        <path stroke-width="26"
        d="M209,15a195,195 0 1,0 2,0z"/>
        <path stroke-width="18"
        d="m210,15v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382"/>
        </svg></div>`

        let name = document.createElement('p')
        name.innerHTML = 'Example'

        elem.appendChild(name)
        elem.onmouseenter = function() {
            elem.appendChild(removeButton)
            removeButton.onclick = function() {
                noclick = true
                hidden.appendChild(elem)
            }
        }

        elem.onmouseleave = function() {
            hidden.appendChild(removeButton)
        }

        tbl.push(elem)
    }

    generatePanels(tbl)
}
