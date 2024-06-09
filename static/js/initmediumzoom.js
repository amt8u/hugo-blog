let darkMode = false;
if (!document.getElementById("darkModeStyle")?.disabled) {
    darkMode = true;
}
window.mediumZoomInstance = mediumZoom('img', {background: darkMode ? "#000" : "#f7f7f1"});