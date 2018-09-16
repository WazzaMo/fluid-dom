/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

import { HttpHeader } from './http-header';

export interface HttpResponse {
  status: number;
  type: string;
  body: string | Document | ArrayBuffer | Blob;
  timeout: boolean;
  headers: Array<HttpHeader>;
}
