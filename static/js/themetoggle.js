function setTheme(mode) {
    localStorage.setItem("theme-storage", mode);
    if (mode === "dark") {
        document.getElementById("darkModeStyle").disabled=false;
        document.getElementById("dark-mode-toggle").innerHTML = "<i data-feather=\"sun\"></i>";
        feather.replace()
    } else if (mode === "light") {
        document.getElementById("darkModeStyle").disabled=true;
        document.getElementById("dark-mode-toggle").innerHTML = "<i data-feather=\"moon\"></i>";
        feather.replace()
    }
    // const zoom = mediumZoom('img');
    window.mediumZoomInstance?.update({background: mode === "dark" ? "#000" : "#f7f7f1"})
    // zoom.detach();
    //mediumZoom('img', {background: mode === "dark" ? "#000" : "#fff"});
}

function toggleTheme() {
    if (localStorage.getItem("theme-storage") === "light") {
        setTheme("dark");
    } else if (localStorage.getItem("theme-storage") === "dark") {
        setTheme("light");
    }
}

var savedTheme = localStorage.getItem("theme-storage") || "light";
setTheme(savedTheme);

// Also attach a listener for quick action using "t" for toggle

window.addEventListener("keypress", (e) => {
    if (e.code === "KeyT" && e.target.tagName !== "INPUT") {
        toggleTheme();
    }
})