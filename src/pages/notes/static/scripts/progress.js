const NUM_VIEWED = "numViewed"

const currname = location.pathname.split("index.html")[0]

function updateProgress(){

    let previous = localStorage.getItem(currname)
    let curr_length = localStorage.getItem(NUM_VIEWED)

    if (previous === null) {
        localStorage.setItem(currname, 1);
        if (curr_length === null){
            localStorage.setItem(NUM_VIEWED, 1)
        } else {
            localStorage.setItem(NUM_VIEWED, parseInt(curr_length) + 1)
        }
    } else {
        localStorage.setItem(currname, parseInt(previous) + 1);
    }
    
    document.getElementById("progress").innerHTML = `${localStorage.getItem(NUM_VIEWED)}`
}

function clearProgress() {
    if (window.confirm("Are you sure you want to clear your wiki reading progress?")){
        let themeChoice = localStorage.getItem("theme")
        localStorage.clear()
        localStorage.setItem("theme", themeChoice)
        updateProgress()
    }
}

updateProgress()