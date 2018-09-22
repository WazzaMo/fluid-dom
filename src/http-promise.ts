
import { Http } from './http';

export class HttpPromise<T> {
  httpObject: Http;
  result: T | undefined;
  promise?: Promise<T>;

  createPromise(
    handler: (
      resolve: (data:any) => void,
      reject: (error:string) => void
    ) => void
  ) {
    this.result = undefined;

    this.promise = new Promise<T>( (promiseResolver, promiseRejector) => {
      let self: HttpPromise<T> = this;
      let _resolve = function(data:T) {
        self.result = data;
        promiseResolver(data);
      };
      handler(_resolve, promiseRejector)
    });
  }

  constructor(_http: Http) {
    this.httpObject = _http;
    this.promise = undefined;
  }

  isResolved() : boolean {
    return this.result != undefined;
  }

  http() : Http {
    return this.httpObject;
  }

  afterResult(
    contextThen: (httpObject:Http, result: T)=>HttpPromise<T>|void
  ): HttpPromise<T> {
    if (this.hasPromise(this.promise)) {
      this.promise.then(resolvedResult => {
        contextThen(this.httpObject, resolvedResult);
      });
    }
    return this;
  }

  then(when: (result: T) => T | PromiseLike<T> ) {
    if (this.hasPromise(this.promise)) {
      return this.next(this.promise.then(when) );
    }
    return this;
  }

  catch( when: (err: string) => void) {
    if (this.hasPromise(this.promise)) {
      return this.next(this.promise.catch(when));
    }
    return this;
  }

  hasPromise(promise : Promise<T> | undefined) : promise is Promise<T> {
    return (<Promise<T>>this.promise) instanceof Promise;
  }

  private next(_promise: Promise<T | void>) : HttpPromise<T> {
    let _next = new HttpPromise<T>(this.httpObject);
    _next.promise = <Promise<T>>_promise;
    return _next;
  }
}