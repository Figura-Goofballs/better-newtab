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
                icon: '<svg width="256" height="250" viewBox="0 0 256 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0m-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931m6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66m4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08m7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27m9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622m10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868m10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403" fill="#ff7011"/></svg>'
            },
            {
                name: 'Example',
                url: 'https://www.example.com/',
                icon: '<svg stroke-width="3" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100" fill="none" stroke="#fff"><circle r="45" cx="50" cy="50"/><ellipse rx="45" ry="30" cx="50" cy="50"/><ellipse rx="45" ry="10" cx="50" cy="50"/><ellipse rx="30" ry="45" cx="50" cy="50"/><ellipse rx="10" ry="45" cx="50" cy="50"/></svg>'
            },
            {
                name: 'DevDocs',
                url: 'https://www.devdocs.io/',
                icon: '<svg stroke="#ff7011" stroke-width="3" width="137.451" height="71.387" viewBox="0 0 137.451 71.387" stroke-linecap="round" fill-rule="evenodd" font-size="9pt" fill="#ff7011" xmlns="http://www.w3.org/2000/svg"><path d="M 46.289 53.857 L 46.289 58.398 L 0 37.207 L 0 34.18 L 46.289 11.963 L 46.289 16.504 L 5.713 35.596 L 46.289 53.857 Z M 91.162 58.398 L 91.162 53.857 L 131.738 35.596 L 91.162 16.504 L 91.162 11.963 L 137.451 34.18 L 137.451 37.207 L 91.162 58.398 Z M 79.59 0 L 84.57 0 L 57.91 71.387 L 52.881 71.387 L 79.59 0 Z" vector-effect="non-scaling-stroke"/></svg>'
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
        var icon = document.getElementById("icon-input").value ?? '<svg stroke-width="3" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100" fill="none" stroke="#fff"><circle r="45" cx="50" cy="50"/><ellipse rx="45" ry="30" cx="50" cy="50"/><ellipse rx="45" ry="10" cx="50" cy="50"/><ellipse rx="30" ry="45" cx="50" cy="50"/><ellipse rx="10" ry="45" cx="50" cy="50"/></svg>';

        if (name === '') {
            name = url
        }

        icon = icon.replace(new RegExp('<?.*?>'), '').replace(new RegExp('<!--.*-->'), '')

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
