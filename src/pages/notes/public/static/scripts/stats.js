document.getElementById("stats")

function createTable() {
    let statsElement = document.getElementById("stats")
    let entries = Object.entries(localStorage).filter(ob => ob[0][0] === "/")

    let sorted = entries.sort((a, b) => parseInt(b[1]) - parseInt(a[1]));
    let progress = document.createElement("div")
    progress.innerHTML = `<h2>You've read</h2>\n<p>${sorted.length}/${sitemap.length} articles 🥂</p>`
    progress.innerHTML += `<p>That's %${(sorted.length) / sitemap.length * 100} 👀 You absolute legend! </p>`
    statsElement.appendChild(progress)

    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
    let currVisited = Object.keys(localStorage).filter(name => name[0] === "/")
    let unvisited = sitemap.filter(value => !currVisited.includes(value))

    let randomLink = unvisited[random(0, unvisited.length)]
    let randomPage = document.createElement("div")
    randomPage.innerHTML = `<a href="${randomLink}">Take me to a random unread page!🍀</a>`
    statsElement.appendChild(randomPage)
    console.log(randomLink)

    const elements = sorted
    const headings = ["page", "times visited"]
    const table = document.createElement("table");
    table.createCaption().textContent = "Your reading history";

    const hrow = table.insertRow();
    for (let heading of headings) {
        hrow.insertCell(-1).outerHTML = `<th>${heading}</th>`;
    }
    for (let element of elements) {
        const drow = table.insertRow(-1);
        let titlePretty = decodeURI(element[0].split("/")[1].split("-").join(" "))
        titlePretty = titlePretty === ""? "Home" : titlePretty
        drow.insertCell(-1).innerHTML = `<a href="${element[0]}">${titlePretty}</a>`;
        drow.insertCell(-1).innerHTML = element[1];
    }
    statsElement.appendChild(table)

}

createTable()