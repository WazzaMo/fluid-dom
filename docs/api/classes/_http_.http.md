[Fluid-dom](../README.md) > ["http"](../modules/_http_.md) > [Http](../classes/_http_.http.md)

# Class: Http

## Hierarchy

**Http**

## Index

### Constructors

* [constructor](_http_.http.md#constructor)

### Properties

* [body](_http_.http.md#body)
* [hostname](_http_.http.md#hostname)
* [method](_http_.http.md#method)
* [path](_http_.http.md#path)
* [port](_http_.http.md#port)
* [protocol](_http_.http.md#protocol)
* [requestHeaders](_http_.http.md#requestheaders)
* [responseType](_http_.http.md#responsetype)
* [timeoutMS](_http_.http.md#timeoutms)
* [uploadData](_http_.http.md#uploaddata)

### Methods

* [addAnyHeaders](_http_.http.md#addanyheaders)
* [call](_http_.http.md#call)
* [context](_http_.http.md#context)
* [createRequestTo](_http_.http.md#createrequestto)
* [createResponseObject](_http_.http.md#createresponseobject)
* [expectedData](_http_.http.md#expecteddata)
* [header](_http_.http.md#header)
* [host](_http_.http.md#host)
* [setErrorHandlers](_http_.http.md#seterrorhandlers)
* [setHandlers](_http_.http.md#sethandlers)
* [setOnCompleteHandler](_http_.http.md#setoncompletehandler)
* [syncPortAndProtocol](_http_.http.md#syncportandprotocol)
* [timeoutAt](_http_.http.md#timeoutat)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Http**(): [Http](_http_.http.md)

*Defined in [http.ts:25](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L25)*

**Returns:** [Http](_http_.http.md)

___

## Properties

<a id="body"></a>

### `<Optional>` body

**● body**: * `undefined` &#124; `string`
*

*Defined in [http.ts:22](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L22)*

___
<a id="hostname"></a>

###  hostname

**● hostname**: *`string`*

*Defined in [http.ts:19](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L19)*

___
<a id="method"></a>

###  method

**● method**: *[HttpMethod](../enums/_http_method_.httpmethod.md)*

*Defined in [http.ts:21](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L21)*

___
<a id="path"></a>

###  path

**● path**: *`string`*

*Defined in [http.ts:20](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L20)*

___
<a id="port"></a>

### `<Optional>` port

**● port**: * `undefined` &#124; `number`
*

*Defined in [http.ts:18](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L18)*

___
<a id="protocol"></a>

###  protocol

**● protocol**: *[HttpProtocol](../enums/_http_protocol_.httpprotocol.md)*

*Defined in [http.ts:17](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L17)*

___
<a id="requestheaders"></a>

###  requestHeaders

**● requestHeaders**: *`Array`<[HttpHeader](../interfaces/_http_header_.httpheader.md)>*

*Defined in [http.ts:16](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L16)*

___
<a id="responsetype"></a>

###  responseType

**● responseType**: *[HttpResponseType](../enums/_http_response_type_.httpresponsetype.md)*

*Defined in [http.ts:24](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L24)*

___
<a id="timeoutms"></a>

###  timeoutMS

**● timeoutMS**: *`number`*

*Defined in [http.ts:25](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L25)*

___
<a id="uploaddata"></a>

### `<Optional>` uploadData

**● uploadData**: *`any`*

*Defined in [http.ts:23](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L23)*

___

## Methods

<a id="addanyheaders"></a>

### `<Private>` addAnyHeaders

▸ **addAnyHeaders**(xhr: *`XMLHttpRequest`*): `void`

*Defined in [http.ts:169](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L169)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| xhr | `XMLHttpRequest` |

**Returns:** `void`

___
<a id="call"></a>

###  call

▸ **call**(method: *[HttpMethod](../enums/_http_method_.httpmethod.md)*, path: *`string`*, body?: *`any`*): [HttpPromise](_http_promise_.httppromise.md)<[HttpResponse](../interfaces/_http_response_.httpresponse.md)>

*Defined in [http.ts:77](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L77)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | [HttpMethod](../enums/_http_method_.httpmethod.md) |
| path | `string` |
| `Optional` body | `any` |

**Returns:** [HttpPromise](_http_promise_.httppromise.md)<[HttpResponse](../interfaces/_http_response_.httpresponse.md)>

___
<a id="context"></a>

###  context

▸ **context**(task: *`function`*): [Http](_http_.http.md)

*Defined in [http.ts:62](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L62)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| task | `function` |

**Returns:** [Http](_http_.http.md)

___
<a id="createrequestto"></a>

### `<Private>` createRequestTo

▸ **createRequestTo**(url: *`string`*): `XMLHttpRequest`

*Defined in [http.ts:105](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L105)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |

**Returns:** `XMLHttpRequest`

___
<a id="createresponseobject"></a>

### `<Private>` createResponseObject

▸ **createResponseObject**(xhr: *`XMLHttpRequest`*): [HttpResponse](../interfaces/_http_response_.httpresponse.md)

*Defined in [http.ts:124](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L124)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| xhr | `XMLHttpRequest` |

**Returns:** [HttpResponse](../interfaces/_http_response_.httpresponse.md)

___
<a id="expecteddata"></a>

###  expectedData

▸ **expectedData**(type: *[HttpResponseType](../enums/_http_response_type_.httpresponsetype.md)*): `this`

*Defined in [http.ts:52](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L52)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [HttpResponseType](../enums/_http_response_type_.httpresponsetype.md) |

**Returns:** `this`

___
<a id="header"></a>

###  header

▸ **header**(name: *`string`*, value: *`string`*): [Http](_http_.http.md)

*Defined in [http.ts:47](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `string` |

**Returns:** [Http](_http_.http.md)

___
<a id="host"></a>

###  host

▸ **host**(protocol: *[HttpProtocol](../enums/_http_protocol_.httpprotocol.md)*, hostname: *`string`*, port?: * `undefined` &#124; `number`*): `this`

*Defined in [http.ts:40](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| protocol | [HttpProtocol](../enums/_http_protocol_.httpprotocol.md) |
| hostname | `string` |
| `Optional` port |  `undefined` &#124; `number`|

**Returns:** `this`

___
<a id="seterrorhandlers"></a>

### `<Private>` setErrorHandlers

▸ **setErrorHandlers**(xhr: *`XMLHttpRequest`*, reject: *`function`*): `void`

*Defined in [http.ts:112](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L112)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| xhr | `XMLHttpRequest` |
| reject | `function` |

**Returns:** `void`

___
<a id="sethandlers"></a>

### `<Private>` setHandlers

▸ **setHandlers**(xhr: *`XMLHttpRequest`*): [HttpPromise](_http_promise_.httppromise.md)<[HttpResponse](../interfaces/_http_response_.httpresponse.md)>

*Defined in [http.ts:177](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L177)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| xhr | `XMLHttpRequest` |

**Returns:** [HttpPromise](_http_promise_.httppromise.md)<[HttpResponse](../interfaces/_http_response_.httpresponse.md)>

___
<a id="setoncompletehandler"></a>

### `<Private>` setOnCompleteHandler

▸ **setOnCompleteHandler**(xhr: *`XMLHttpRequest`*, resolve: *`function`*, reject: *`function`*): `void`

*Defined in [http.ts:153](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L153)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| xhr | `XMLHttpRequest` |
| resolve | `function` |
| reject | `function` |

**Returns:** `void`

___
<a id="syncportandprotocol"></a>

### `<Private>` syncPortAndProtocol

▸ **syncPortAndProtocol**(): `void`

*Defined in [http.ts:97](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L97)*

**Returns:** `void`

___
<a id="timeoutat"></a>

###  timeoutAt

▸ **timeoutAt**(duration: *`number`*): [Http](_http_.http.md)

*Defined in [http.ts:57](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http.ts#L57)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| duration | `number` |

**Returns:** [Http](_http_.http.md)

___

