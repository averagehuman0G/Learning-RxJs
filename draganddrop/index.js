// a function that takes both the container and the element
function dragNDrop(elem, container) {
  //compose an observable of other simple streams

  //adapt the streams
  const elemMouseDown = Rx.Observable.fromEvent(elem, 'mousedown');
  const containerMouseMove = Rx.Observable.fromEvent(container, 'mousemove');
  const containerMouseUp = Rx.Observable.fromEvent(container, 'mouseup');

  //THE MOST IMPORTANT

  //  [1, 2, 3].map() -> [[1], [1], [1]]
  const drags = elemMouseDown.concatMap(mousedown => {
    const startX = mousedown.offsetX;
    const startY = mousedown.offsetY;
    return containerMouseMove
      .map(mousemove => {
        // mousemove.preventDefault();
        return { left: mousemove.clientX - startX, top: mousemove.clientY - startY };
      })
      .takeUntil(containerMouseUp);
  });

  // use the drags streams to do what you need to do
  drags.subscribe(e => {
    console.log(e);
    elem.style.left = e.left + 'px';
    elem.style.top = e.top + 'px';
  });
}

const littleBox = document.querySelector('#littleBox');
dragNDrop(littleBox, document);
