class Observable {
  //makes our Observable lazy
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  static fromEvent(elem, eventType) {
    return new Observable(observer => {
      const handler = e => {
        obserer.next(e);
      };
      elem.addEventListener(eventType, e => {
        observer.next(e.clientX);
      });
      return {
        unsubscribe() {
          elem.removeEventListener(eventType, handler);
        },
      };
    });
  }
}

const clickMe = document.querySelector('#click');
const clicks = Observable.fromEvent(clickMe, 'click');

clicks.subscribe({
  next(e) {
    console.log(e);
  },
});
