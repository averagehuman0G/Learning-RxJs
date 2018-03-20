// a function that takes both the container and the element
function dragNDrop(elem, container) {
  //compose an observable of other simple streams

  //adapt the streams
  const elemMouseDown = Rx.Observable.fromEvent(littleBox, 'mousedown');
  const containerMouseMove = Rx.Observable.fromEvent(container, 'mousemove');
  const containerMouseUp = Rx.Observable.fromEvent(container, 'mouseup');

  //THE MOST IMPORTANT
  //THIS IS WHAT WE MAKE FROM THE STREAMS WE HAVE

  const drags = elemMouseDown.concatMap(mousedown => {
    return containerMouseMove.takeUntil(containerMouseUp);
  });

  // use the drags streams to do what you need to do
  drags.subscribe({
    next(e) {
      littleBox.style.top = e.clientY + 'px';
      littleBox.style.left = e.clientX + 'px';
    },
  });
}

const littleBox = document.querySelector('#littleBox');

dragNDrop(littleBox, document);
