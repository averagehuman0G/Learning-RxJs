// wikipedia API
function searchWikipedia(searchTerm) {
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(
    searchTerm
  )}&callback=?`;
  $.getJSON(url, function(data) {
    console.log(data);
  });
}
