function appendToList(value, login, title) {
    var billingLink = '?module=userprofile&username=';
    var userLink = billingLink.concat(login);

    var node = document.createElement("li");
    var link = document.createElement("a");
    var container = document.createElement("div");
    var textnode = document.createTextNode(value);

    link.appendChild(textnode);
    link.title = title;
    link.href = userLink;
    node.classList.add('ui-menu-item');
    container.appendChild(link);
    container.classList.add('ui-menu');
    container.classList.add('ui-menu-item-wrapper');
    node.appendChild(container);
    document.getElementById("ssearchcontainer").appendChild(node);
    document.getElementById("ssearchcontainer").style.display = "block";
}
function querySearch(value) {
    var searchList = document.getElementById('ssearchcontainer');
    if (value !== "") {
        var xhr = new XMLHttpRequest();
        var searchString = 'search=';
        var searchQuery = searchString.concat(value);
        xhr.open('POST', '?module=usersearch&sphinxsearch=true', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            searchList.innerHTML = "";
            var JSONresponse = JSON.parse(this.responseText);
            JSONresponse.forEach(function (object) {
                if (object.value !== undefined) {
                    var description = object.title.concat(": ");
                    var fulldesc = description.concat(object.value);
                    appendToList(object.value, object.login, fulldesc);
                }
            })
        };
        xhr.send(searchQuery);
    } else {
        searchList.innerHTML = "";
        document.getElementById("ssearchcontainer").style.display = "none";
    }
}
