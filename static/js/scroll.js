document.addEventListener('DOMContentLoaded', function() {
    const toc = document.getElementsByClassName("toc")[0];
    const tocButton = document.getElementById("toc-toggle");
    window.addEventListener('scroll', function() {
        if (window.scrollY > 260) { // Show the div after scrolling down 100px
            toc.classList.add("show");
            tocButton.classList.add("show");
        } else { // Hide the div if scrolled back up within 100px from the top
            toc.classList.remove("show");
            tocButton.classList.remove("show");
        }
    });
});