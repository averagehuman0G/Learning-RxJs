// wikipedia API
// function searchWikipedia(searchTerm) {
//   const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(
//     searchTerm
//   )}&callback=?`;
//   $.getJSON(url, function(data) {
//     console.log(data);
//   });
// }

//adapt our wikipedia api function into an Observable

function getWikiSearchResults(searchTerm) {
  return Rx.Observable.create(observer => {
    let cancelled = false;
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(
      searchTerm
    )}&callback=?`;
    $.getJSON(url, function(data) {
      if (!cancelled) {
        observer.next(data[1]);
        observer.complete();
      }
    });
    return () => {
      cancelled = true;
    };
  });
}
//get the results area
const results = document.querySelector('#results');
//get the textbox
const textbox = document.querySelector('#search');
//keypress observable
// {.....'z'....'e'.'b'.'r'.'a'...}
// {......'z'...................'a'}
//create keypress stream
const keypressStream = Rx.Observable.fromEvent(textbox, 'keyup');

//getWikiSearchResults observable
//{.................['zebra animal', 'zebra printer']}
//WHAT WE WANT
// {..........['zebra animal', 'zebra printer'].....['zebra technologies']}

const searchResults =
  //use the keypress stream
  keypressStream
    .throttle(val => Rx.Observable.interval(200))
    .map(keyEvent => {
      return textbox.value;
    })
    .distinctUntilChanged()
    .map(search => {
      return getWikiSearchResults(textbox.value).retry(2);
    })
    .switch();
// {
//  ...........{.............['zebra animal', 'zebra printer']}
//  ..................{.['zebra technologies', 'zebra tatoo']}
//  }

searchResults.subscribe(resultsArr => {
  results.value = JSON.stringify(resultsArr);
});
