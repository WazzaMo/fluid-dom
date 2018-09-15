import { resolvePtr } from "dns";

/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE'
}

export interface Response {
  status: number;
  type: string;
  body: string | Document | ArrayBuffer | Blob;
  timeout: boolean;
}

export interface Header {
  name: string;
  value: string;
}

function request(
  method: HttpMethod,
  url: string,
  headers ?: Array<Header>,
  user?: string,
  password?:string
) {
  let xhr = new XMLHttpRequest();
  let promise;

  xhr.open(method, url, true, user, password);
  if (!! headers) {
    let header_list = <Array<Header>> headers;
    for(var header of header_list) {
      xhr.setRequestHeader(header.name, header.value);
    }
  }

  promise = new Promise( (resolve, reject) => {
    xhr.onabort = () => {
      reject('Request Aborted');
    };
    xhr.ontimeout = () => {
      reject('Timed out');
    };
    xhr.onerror = () => {
      reject('Error occurred.');
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          let res : Response = {
            status: xhr.status,
            type: xhr.responseType,
            body: xhr.response,
            timeout: !! xhr.timeout
          };
          resolve(res);
        } else {
          reject(`Returned HTTP ${xhr.status}`);
        }
      }
    };
  });
  xhr.send();
  return promise;
}

export const Http = {
  request: request
};