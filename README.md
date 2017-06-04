# node-dimigo
[![npm v]][npm package] [![npm dt]][npm package] [![node v]][npm package] [![npm l]][npm package]

> [Dimigo] REST API wrapper for Node.js

## Installation
```bash
$ npm install dimigo
```

## API Reference
- Dimigo
  - *constructor*
    - new Dimigo(opts)
  - *static*
    - .createHash(password) ⇒ `String`
  - *instance*
    - .identifyUser(username, password, [hash]) ⇒ `Object`
    - .getStudent(username) ⇒ `Object`
    - .getTeacher(username) ⇒ `Object`

### Dimigo

#### new Dimigo(opts)
Create a new API wrapper.

| Param | Type | Description |
| ----- | ----- | ----- |
| opts | `Object` | |
| opts.host | `String` | the server URL of Dimigo REST API |
| opts.username | `String` | the username for HTTP Basic Authorization |
| opts.password | `String` | the password for HTTP Basic Authorization |

#### Dimigo.createHash(password)
```js
'@' + sha256(password + sprintf('%010u', crc32(password)))
```

[Dimigo]: https://www.dimigo.hs.kr/

[node v]: https://img.shields.io/node/v/dimigo.svg
[npm l]: https://img.shields.io/npm/l/dimigo.svg
[npm v]: https://img.shields.io/npm/v/dimigo.svg
[npm dt]: https://img.shields.io/npm/dt/dimigo.svg
[npm package]: https://www.npmjs.com/package/dimigo
