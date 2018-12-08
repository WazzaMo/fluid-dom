[Fluid-dom](../README.md) > ["http-promise"](../modules/_http_promise_.md) > [HttpPromise](../classes/_http_promise_.httppromise.md)

# Class: HttpPromise

## Type parameters
#### T 
## Hierarchy

**HttpPromise**

## Index

### Constructors

* [constructor](_http_promise_.httppromise.md#constructor)

### Properties

* [httpObject](_http_promise_.httppromise.md#httpobject)
* [promise](_http_promise_.httppromise.md#promise)
* [result](_http_promise_.httppromise.md#result)

### Methods

* [afterResult](_http_promise_.httppromise.md#afterresult)
* [catch](_http_promise_.httppromise.md#catch)
* [createPromise](_http_promise_.httppromise.md#createpromise)
* [hasPromise](_http_promise_.httppromise.md#haspromise)
* [http](_http_promise_.httppromise.md#http)
* [isResolved](_http_promise_.httppromise.md#isresolved)
* [next](_http_promise_.httppromise.md#next)
* [then](_http_promise_.httppromise.md#then)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new HttpPromise**(_http: *[Http](_http_.http.md)*): [HttpPromise](_http_promise_.httppromise.md)

*Defined in [http-promise.ts:25](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _http | [Http](_http_.http.md) |

**Returns:** [HttpPromise](_http_promise_.httppromise.md)

___

## Properties

<a id="httpobject"></a>

###  httpObject

**● httpObject**: *[Http](_http_.http.md)*

*Defined in [http-promise.ts:5](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L5)*

___
<a id="promise"></a>

### `<Optional>` promise

**● promise**: *`Promise`<`T`>*

*Defined in [http-promise.ts:7](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L7)*

___
<a id="result"></a>

###  result

**● result**: * `T` &#124; `undefined`
*

*Defined in [http-promise.ts:6](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L6)*

___

## Methods

<a id="afterresult"></a>

###  afterResult

▸ **afterResult**(contextThen: *`function`*): [HttpPromise](_http_promise_.httppromise.md)<`T`>

*Defined in [http-promise.ts:40](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| contextThen | `function` |

**Returns:** [HttpPromise](_http_promise_.httppromise.md)<`T`>

___
<a id="catch"></a>

###  catch

▸ **catch**(when: *`function`*): [HttpPromise](_http_promise_.httppromise.md)<`T`>

*Defined in [http-promise.ts:58](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L58)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| when | `function` |

**Returns:** [HttpPromise](_http_promise_.httppromise.md)<`T`>

___
<a id="createpromise"></a>

###  createPromise

▸ **createPromise**(handler: *`function`*): `void`

*Defined in [http-promise.ts:9](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L9)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | `function` |

**Returns:** `void`

___
<a id="haspromise"></a>

###  hasPromise

▸ **hasPromise**(promise: * `Promise`<`T`> &#124; `undefined`*): `boolean`

*Defined in [http-promise.ts:65](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L65)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| promise |  `Promise`<`T`> &#124; `undefined`|

**Returns:** `boolean`

___
<a id="http"></a>

###  http

▸ **http**(): [Http](_http_.http.md)

*Defined in [http-promise.ts:36](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L36)*

**Returns:** [Http](_http_.http.md)

___
<a id="isresolved"></a>

###  isResolved

▸ **isResolved**(): `boolean`

*Defined in [http-promise.ts:32](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L32)*

**Returns:** `boolean`

___
<a id="next"></a>

### `<Private>` next

▸ **next**(_promise: *`Promise`< `T` &#124; `void`>*): [HttpPromise](_http_promise_.httppromise.md)<`T`>

*Defined in [http-promise.ts:69](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L69)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _promise | `Promise`< `T` &#124; `void`> |

**Returns:** [HttpPromise](_http_promise_.httppromise.md)<`T`>

___
<a id="then"></a>

###  then

▸ **then**(when: *`function`*): `any`

*Defined in [http-promise.ts:51](https://github.com/WazzaMo/fluid-dom/blob/cb271c8/src/http-promise.ts#L51)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| when | `function` |

**Returns:** `any`

___

