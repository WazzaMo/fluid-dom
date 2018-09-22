
class LaterPromise<Tnow, Tlater> {
  later: LaterOrNow<Tnow, Tlater>;

  constructor(_later: LaterOrNow<Tnow,Tlater>) {
    this.later = _later;
  }

  emerges(
    action: (result: Tlater) => Promise<Tlater>
  ) {
    let newPromise = this.later.promise.then(action);
    return new LaterOrNow<Tnow, Tlater>(this.later.immediateValue, newPromise);
  }

  whenFails(
    errAction: (error: string) => PromiseLike<any>
  ) {
    let newPromise = this.later.promise.catch(errAction);
    return new LaterOrNow<Tnow, Tlater>(
      this.later.immediateValue, newPromise
    );
  }
}

export class LaterOrNow<Tnow,Tlater> {
  immediateValue: Tnow;
  promise: Promise<Tlater>;

  constructor(now: Tnow, thePromise: Promise<Tlater>) {
    this.immediateValue = now;
    this.promise = thePromise;
  }

  later() : LaterPromise<Tnow, Tlater> {
    return new LaterPromise<Tnow,Tlater>(this);
  }

  now() : Tnow {
    return this.immediateValue;
  }
}