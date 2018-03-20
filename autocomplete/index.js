// wikipedia API
function searchWikipedia(searchTerm) {
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(
    searchTerm
  )}&callback=?`;
  $.getJSON(url, function(data) {
    console.log(data);
  });
}

//get the results area

//get the textbox

//keypress observable
// {.....'z'....'e'.'b'.'r'.'a'...}
// {......'z'...................'a'}
//create keypress stream

//adapt our wikipedia api function into an Observable

//getWikiSearchResults observable
//{.................['zebra animal', 'zebra printer']}

//WHAT WE WANT
// {..........['zebra animal', 'zebra printer'].....['zebra technologies']}

//What if the request fails
