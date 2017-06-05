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
| `opts` | `Object` | |
| `opts.host` | `String` | the server URL of Dimigo REST API |
| `opts.username` | `String` | the username for HTTP Basic Authorization |
| `opts.password` | `String` | the password for HTTP Basic Authorization |

#### Dimigo.createHash(password)
Calculate the Dimigo hash value of a password.

| Param | Type | Description |
| ----- | ----- | ----- |
| `password` | `String` | the password to be hashed |

##### Return value ⇒ `String`
the Dimigo hash of the password

##### Dimigo hashing algorithm
```js
'@' + sha256(password + sprintf('%010u', crc32(password)))
```

#### api.identifyUser(username, password, [hash])
Authenticate and get data of the user.

| Param | Type | Description |
| ----- | ----- | ----- |
| `username` | `String` | the username of Dimigo account |
| `password` | `String` | the password of Dimigo account |

##### Return value ⇒ `Object`
The user data from Dimigo REST API.

| Key | Type | Description |
| ----- | ----- | ----- |
| `id` | `int` | *Primary key* |
| `username` | `String` | *Unique* |
| `email` | `String` | |
| `name` | `String` | Korean name |
| `nick` | `String` | User-specific name |
| `gender` | `char` | `M` for male, `F` for female |
| `userType` | `char` | |
| `birthday` | `String` | `YYYY-MM-DD` |
| `status` | `int` | `10` for active, `0` for deactivated |
| `photofile1` | `String` | Image URL for face image |
| `photofile2` | `String` | Image URL for user-specific image |
| `createdAt` | `String` | `YYYY-MM-DD HH:mm:ss` |
| `updatedAt` | `String` | `YYYY-MM-DD HH:mm:ss` |
| `passwordHash` | `null` | *Not available* |
| `ssoToken` | `String` | SSO token for `student.dimigo.hs.kr`

[Dimigo]: https://www.dimigo.hs.kr/

[node v]: https://img.shields.io/node/v/dimigo.svg
[npm l]: https://img.shields.io/npm/l/dimigo.svg
[npm v]: https://img.shields.io/npm/v/dimigo.svg
[npm dt]: https://img.shields.io/npm/dt/dimigo.svg
[npm package]: https://www.npmjs.com/package/dimigo
