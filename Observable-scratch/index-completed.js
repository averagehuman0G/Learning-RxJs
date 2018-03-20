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
        observer.next(e);
      };
      elem.addEventListener(eventType, handler);
      return {
        unsubscribe() {
          elem.removeEventListener(eventType, handler);
        },
      };
    });
  }
}

const click$ = Observable.fromEvent(document, 'click');

click$.subscribe({
  next(e) {
    console.log(e);
  },
});
