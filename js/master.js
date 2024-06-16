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

window.onload = function () {
    var dialog;

    var closeButton = document.getElementById("close");
    var hidden = document.getElementById("hidden");
    var dialogContainer = document.getElementById("dialog-container");

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

    for (i = 0; i < 15; i++) {
        var elem = document.createElement('div')
        elem.classList = 'panel'

        tbl.push(elem)
    }

    generatePanels(tbl)
}
