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
            } else {
                return [i, num / i]; // Found factors, return them as an array
            }
        }
    }
}

window.addEventListener('load', function () {
    if (navigator.userAgent.includes('Firefox')) {
        document.getElementById('favicon').setAttribute('href', 'chrome://branding/content/icon32.png')
    } else {
        document.getElementById('favicon').setAttribute('href', '/favicon.svg')
    }

    // Disable dark reader (it fucks up my css)
    const lock = document.createElement('meta');
    lock.name = 'darkreader-lock';
    document.head.appendChild(lock);

    var dialog;
    var removeElement;
    var removeName;

    var closeButton = document.getElementById("close");
    var hidden = document.getElementById("hidden");
    var dialogContainer = document.getElementById("dialog-container");
    var removeButton = document.getElementById("remove");

    closeButton.addEventListener('click', function () {
        hidden.appendChild(dialog);
        dialogContainer.style.visibility = 'hidden';
    })

    var panelContainer = document.getElementById('panel-container')

    function generatePanels(panels) {
        panelContainer.innerHTML = ''
        const factors = getClosestFactors(panels.length)

        if (factors != null && factors != undefined) {
            factors.sort((a, b) => b - a);

            var iter = 0

            for (i = 0; i < panels.length; i++) {
                panelContainer.appendChild(panels[i])
            }

            panelContainer.style.gridTemplateRows = `repeat(${factors[1]}, 1fr)`;
            panelContainer.style.gridTemplateColumns = `repeat(${factors[0]}, 1fr)`;
        }
    }

    // Example panels   
    var panelTable = JSON.parse(localStorage.getItem('panels'))

    if (panelTable == null) {
        panelTable = [
            {
                name: 'GitHub',
                url: 'https://www.github.com/',
                icon: '<svg viewBox="0 0 98 96" width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/></svg>'
            },
            {
                name: 'Example',
                url: 'https://www.example.com/',
                icon: '<svg class="orange" stroke-width="3" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100" fill="none" stroke="#fff"><circle r="45" cx="50" cy="50"/><ellipse rx="45" ry="30" cx="50" cy="50"/><ellipse rx="45" ry="10" cx="50" cy="50"/><ellipse rx="30" ry="45" cx="50" cy="50"/><ellipse rx="10" ry="45" cx="50" cy="50"/></svg>'
            },
            {
                name: 'DevDocs',
                url: 'https://www.devdocs.io/',
                icon: '<svg class="orange" stroke="#ff7011" stroke-width="3" width="137.451" height="71.387" viewBox="0 0 137.451 71.387" stroke-linecap="round" fill-rule="evenodd" font-size="9pt" fill="#ff7011" xmlns="http://www.w3.org/2000/svg"><path d="M 46.289 53.857 L 46.289 58.398 L 0 37.207 L 0 34.18 L 46.289 11.963 L 46.289 16.504 L 5.713 35.596 L 46.289 53.857 Z M 91.162 58.398 L 91.162 53.857 L 131.738 35.596 L 91.162 16.504 L 91.162 11.963 L 137.451 34.18 L 137.451 37.207 L 91.162 58.398 Z M 79.59 0 L 84.57 0 L 57.91 71.387 L 52.881 71.387 L 79.59 0 Z" vector-effect="non-scaling-stroke"/></svg>'
            },
            {
                name: 'Discord',
                url: 'https://discord.com/app/',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"><path fill="#5865f2" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>'
            },
            {
                name: 'Stack Overflow',
                url: 'https://stackoverflow.com/',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><style>.st0{fill:#bcbbbb}.st1{fill:#f48023}</style><path class="st0" d="M84.4 93.8V70.6h7.7v30.9H22.6V70.6h7.7v23.2z"/><path class="st1" d="M38.8 68.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zm19.2-18.3l-6.2 4.6 23 31 6.2-4.6-23-31zM38 86h38.6v-7.7H38V86z"/></svg>'
            }
        ]

        localStorage.setItem('panels', JSON.stringify(panelTable))
    }

    function buildPanels(panelArray) {
        let builtPanelTable = []

        for (i = 0; i < panelArray.length; i++) {
            let elem = document.createElement('div')
            let url = panelArray[i].url
            let realName = panelArray[i].name

            elem.classList = 'panel'
            elem.addEventListener('click', function () {
                if (noclick == false) {
                    console.log(url)
                    location = url
                }

                noclick = false
            })

            elem.innerHTML = `<div class='fakesquare'>${panelTable[i].icon}</div>`

            let name = document.createElement('p')
            name.innerHTML = panelArray[i].name

            elem.appendChild(name)
            elem.addEventListener('mouseenter', function () {
                elem.appendChild(removeButton)

                removeElement = elem
                removeName = realName
            })

            elem.addEventListener('mouseleave', function () {
                hidden.appendChild(removeButton)
            })

            builtPanelTable.push(elem)
        }

        return builtPanelTable
    }

    generatePanels(buildPanels(panelTable))

    document.getElementById("add").addEventListener('click', function () {
        document.getElementById("add-close-container").appendChild(closeButton);

        dialogContainer.appendChild(document.getElementById("add-dialog"));

        closeButton.style = 'position: absolute; top: 0; right: 0; translate: translateX(-100%);'
        dialogContainer.style.visibility = 'visible';

        dialog = document.getElementById("add-dialog");
    })

    document.getElementById("add-panel").addEventListener('click', function () {
        var url = document.getElementById("url-input").value;
        var name = document.getElementById("name-input").value;
        var icon = document.getElementById("icon-input").value ?? '<svg stroke-width="3" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100" fill="none" stroke="#fff"><circle r="45" cx="50" cy="50"/><ellipse rx="45" ry="30" cx="50" cy="50"/><ellipse rx="45" ry="10" cx="50" cy="50"/><ellipse rx="30" ry="45" cx="50" cy="50"/><ellipse rx="10" ry="45" cx="50" cy="50"/></svg>'

        if (icon == '') {icon = '<svg class="orange" stroke-width="3" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100" fill="none" stroke="#fff"><circle r="45" cx="50" cy="50"/><ellipse rx="45" ry="30" cx="50" cy="50"/><ellipse rx="45" ry="10" cx="50" cy="50"/><ellipse rx="30" ry="45" cx="50" cy="50"/><ellipse rx="10" ry="45" cx="50" cy="50"/></svg>'}

        if (name === '') {
            name = url
        }

        icon = icon.replace(new RegExp('\\<\\?xml.*\\?\\>'), '').replace(new RegExp('\\<\\!\\-\\-.*\\-\\-\\>'), '')

        panelTable.push({
            name: name,
            url: url,
            icon: icon
        })

        console.log(url, name, icon)
        localStorage.setItem('panels', JSON.stringify(panelTable))
        generatePanels(buildPanels(panelTable))
        closeButton.click()
    })

    removeButton.addEventListener('click', function () {
        hidden.appendChild(removeElement)

        for (i = 0; i < panelTable.length; i++) {
            if (panelTable[i]) {
                if (panelTable[i].name === removeName) {
                    panelTable.splice(i, 1)
                }
            }
        }

        localStorage.setItem('panels', JSON.stringify(panelTable))
        console.log(JSON.stringify(panelTable))

        noclick = true
    }, true)
})
