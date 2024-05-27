function setTOC(mode) {
    localStorage.setItem("toc", mode);
    if (mode === "hide") {
        document.getElementsByClassName("toc")[0].classList.add("hide");
        document.getElementById("toc-toggle").innerHTML = "<i data-feather=\"list\"></i>";
        feather.replace()
    } else {
        document.getElementsByClassName("toc")[0].classList.remove("hide");
        document.getElementById("toc-toggle").innerHTML = "<i data-feather=\"list\"></i>";
        feather.replace()
    }
}

function toggleTOC() {
    if (localStorage.getItem("toc") === "hide") {
        setTOC("");
    } else if (localStorage.getItem("toc") === "") {
        setTOC("hide");
    }
}

var savedView = localStorage.getItem("toc") || "";
setTOC(savedView);

// Also attach a listener for quick action using "f" for fullscreen

window.addEventListener("keypress", (e) => {
    if (e.code === "KeyT" && e.target.tagName !== "INPUT") {
        toggleTOC();
    }
})