/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */


import { HttpHeader } from "./http-header";
import { HttpMethod } from "./http-method";
import { HttpResponseType } from "./http-response-type";
import { HttpProtocol } from "./http-protocol";
import { HttpResponse } from "./http-response";


export class Http {
  requestHeaders: Array<HttpHeader>;
  protocol: HttpProtocol;
  port?: number;
  hostname: string;
  path: string;
  method: HttpMethod;
  body?: string;
  uploadData?: any;
  responseType: HttpResponseType;
  timeoutMS: number;

  constructor() {
    this.protocol = HttpProtocol.HTTP;
    this.port = undefined;
    this.hostname = '';
    this.requestHeaders = [];
    this.path = '';
    this.method = HttpMethod.GET;
    this.body = undefined;
    this.uploadData = undefined;
    this.responseType = HttpResponseType.TEXT;
    this.timeoutMS = 1000;
  }

  host(protocol: HttpProtocol, hostname: string, port?: number) {
    this.hostname = hostname;
    this.port = port;
    this.protocol = protocol;
    return this;
  }

  header(name:string, value: string) : Http {
    this.requestHeaders.push({name: name, value: value});
    return this;
  }

  expectedData(type: HttpResponseType) {
    this.responseType = type;
    return this;
  }

  timeoutAt(duration: number) : Http {
    this.timeoutMS = duration;
    return this;
  }

  context( task: (_context: Http)=> void ) : Http {
    let _context = new Http();
    _context.protocol = this.protocol;
    _context.port = this.port;
    _context.hostname = this.hostname;
    _context.requestHeaders = new Array<HttpHeader>().concat(this.requestHeaders);
    _context.path = this.path;
    _context.method = this.method;
    _context.body = this.body;
    _context.uploadData = this.uploadData;
    _context.responseType = this.responseType;
    task(_context);
    return this;
  }

  call(method: HttpMethod, path: string, body?: string) : Promise<HttpResponse> {
    this.method = method;
    this.path = path;
    this.body = body;

    this.syncPortAndProtocol();
    let portString = (!! this.port) ? `:${this.port}` : ``
    let url = `${this.protocol}://${this.hostname}${portString}${path}`;

    let xhr = this.createRequestTo(url);
    let promise = this.setHandlers(xhr);
    this.addAnyHeaders(xhr);
    xhr.send(this.body);
    return promise;
  }

  private syncPortAndProtocol() : void {
    if ( (this.protocol == HttpProtocol.HTTP && this.port == 80) 
      || (this.protocol == HttpProtocol.HTTPS && this.port == 443)
      || this.protocol == HttpProtocol.FILE ) {
      this.port = undefined;
    }
  }

  private createRequestTo(url: string) : XMLHttpRequest {
    let xhr = new XMLHttpRequest();
    xhr.timeout = this.timeoutMS;
    xhr.open(this.method, url);
    return xhr;
  }

  private setErrorHandlers(xhr: XMLHttpRequest, reject: (err:any)=>void) : void {
    xhr.onabort = () => {
      reject('Request Aborted');
    };
    xhr.ontimeout = () => {
      reject('Timed out');
    };
    xhr.onerror = () => {
      reject('Error occurred.');
    };
  }

  private createResponseObject(xhr: XMLHttpRequest) : HttpResponse {
    let headers = xhr
      .getAllResponseHeaders().split('\r\n')
      .map( header_line => {
        let parts = header_line.split(':');
        if (parts && parts.length == 2) {
          return <HttpHeader>{name: parts[0], value: parts[1]};
        } else {
          return undefined;
        }
      })
      .filter( item => item != undefined);
    let collection : { [name: string]: string} = {};
    for(var hdr in headers) {
      let a_header = headers[hdr];
      if (a_header) {
        collection[a_header.name] = a_header.value;
      }
    }

    let response : HttpResponse = {
      status: xhr.status,
      type: xhr.responseType,
      body: xhr.response,
      headers: collection
    };
    return response;
  }

  private setOnCompleteHandler(
    xhr: XMLHttpRequest,
    resolve: (response:HttpResponse) => void,
    reject: (err: string)=> void
  ) : void {
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(this.createResponseObject(xhr));
        } else {
          reject(`Returned HTTP ${xhr.status}`);
        }
      }
    };
  }

  private addAnyHeaders(xhr: XMLHttpRequest) : void {
    if (this.requestHeaders.length > 0) {
      for(var header of this.requestHeaders) {
        xhr.setRequestHeader(header.name, header.value);
      }
    }
  }

  private setHandlers(xhr: XMLHttpRequest) : Promise<HttpResponse> {
    let promise = new Promise<HttpResponse>( (resolve, reject) => {
      this.setErrorHandlers(xhr, reject);
      this.setOnCompleteHandler(xhr, resolve, reject);
    });
    return promise;
  }
}

