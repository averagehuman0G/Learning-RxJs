// a function that takes both the container and the element
function dragNDrop(elem, container) {
  //compose an observable of other simple streams

  //adapt the streams
  const elemMouseDown =;
  const containerMouseMove =;
  const containerMouseUp =;

  //THE MOST IMPORTANT
  //THIS IS WHAT WE MAKE FROM THE STREAMS WE HAVE

  const drags = ;


  // use the drags streams to do what you need to do

}

const littleBox = document.querySelector("#littleBox");
const container = document.querySelector("#container");

dragNDrop(littleBox, container)
