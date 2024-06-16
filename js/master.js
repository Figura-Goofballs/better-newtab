window.onload = function() {
    var dialog;

    var closeButton = document.getElementById("close");
    var hidden = document.getElementById("hidden");
    var dialogContainer = document.getElementById("dialog-container");

    closeButton.onclick = function() {
        hidden.appendChild(dialog);
    }

    document.getElementById("add").onclick = function() {
        document.getElementById("add-close-container").appendChild(closeButton);

        dialogContainer.appendChild(document.getElementById("add-dialog"));

        closeButton.style = 'position: absolute; top: 0; right: 0; translate: translateX(-100%);'
        
        dialog = document.getElementById("add-dialog");
    }

    document.getElementById("add-panel").onclick = function() {
        var url = document.getElementById("url-input").value;
        var name = document.getElementById("name-input").value;
        var icon = document.getElementById("icon-input").value;

        if (name === '') {
            name = url
        }

        console.log(url, name, icon)
        closeButton.onclick()
    }
}
