// static/js/search.js
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Fetch the search index
  fetch('/index.json')
    .then(response => response.json())
    .then(data => {
      searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const results = data.filter(item => {
          return item.title.toLowerCase().includes(query) ||
                 item.content.toLowerCase().includes(query);
        });
        displayResults(results);
      });
    });

  function displayResults(results) {
    searchResults.innerHTML = results.map(result => `
      <div class="search-result">
        <a href="${result.link}">${result.title}</a>
        <p>${result.content.substring(0, 150)}...</p>
      </div>
    `).join('');
  }
});
