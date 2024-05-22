function setView(mode) {
    localStorage.setItem("view", mode);
    if (mode === "fullwidth") {
        document.getElementsByClassName("content")[0].classList.add("fullwidth");
        document.getElementById("view-mode-toggle").innerHTML = "<i data-feather=\"minimize\"></i>";
        feather.replace()
    } else {
        document.getElementsByClassName("content")[0].classList.remove("fullwidth");
        document.getElementById("view-mode-toggle").innerHTML = "<i data-feather=\"maximize\"></i>";
        feather.replace()
    }
}

function toggleView() {
    if (localStorage.getItem("view") === "regular") {
        setView("fullwidth");
    } else if (localStorage.getItem("view") === "fullwidth") {
        setView("regular");
    }
}

var savedView = localStorage.getItem("view") || "regular";
setView(savedView);

// Also attach a listener for quick action using "f" for fullscreen

window.addEventListener("keypress", (e) => {
    if (e.code === "KeyF" && e.target.tagName !== "INPUT") {
        toggleView();
    }
})