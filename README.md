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
    - [new Dimigo(opts)](#new-dimigoopts)
  - *static*
    - [.createHash(password)](#dimigocreatehashpassword) ⇒ `String`
  - *instance*
    - [.identifyUser(username, password, [hash])](#apiidentifyuserusername-password-hash) ⇒ `Object`
    - [.getStudent(username)](#apigetstudentusername) ⇒ `Object`
    - [.getTeacher(username)](#apigetteacherusername) ⇒ `Object`

### Dimigo

#### new Dimigo(opts)
Create a new API wrapper.

| Param | Type | Description |
| ----- | ----- | ----- |
| `opts` | `Object` | |
| `opts.host` | `String` | URL of Dimigo REST API server |
| `opts.username` | `String` | Username for HTTP Basic Authorization |
| `opts.password` | `String` | Password for HTTP Basic Authorization |

#### Dimigo.createHash(password)
Calculate the Dimigo hash value of a password.

| Param | Type | Description |
| ----- | ----- | ----- |
| `password` | `String` | Password to be hashed |

##### Return value ⇒ `String`
the Dimigo hash of the password

##### Dimigo hashing algorithm
```js
'@' + sha256(password + sprintf('%010u', crc32(password)))
```

#### api.identifyUser(username, password, [hash])
Authenticate and get a data of the user.

| Param | Type | Description |
| ----- | ----- | ----- |
| `username` | `String` | Username of Dimigo account |
| `password` | `String` | Password of Dimigo account |
| `hash` | `Function?` | Hash function (default: `Dimigo.createHash`) |

##### Return value ⇒ `Object`
The user data from Dimigo REST API.

| Key | Type | Description |
| ----- | ----- | ----- |
| `id` | `int` | *Primary key* |
| `username` | `String` | *Unique* |
| `email` | `String` | |
| `name` | `String` | Korean name |
| `nick` | `String?` | User-specific name |
| `gender` | `String` | `M`: male, `F`: female, `NULL`: unknown |
| `userType` | `char` | `S`: students, `T`: teachers, `D`: dormitory teachers, `P`: parents, `O`: others |
| `birthday` | `String?` | `YYYY-MM-DD` |
| `status` | `int` | `10` for active, `0` for deactivated |
| `facePhoto` | `String?` | Image URL for face image |
| `userPhoto` | `String?` | Image URL for user-specific image |
| `createdAt` | `String` | `YYYY-MM-DD HH:mm:ss` |
| `updatedAt` | `String` | `YYYY-MM-DD HH:mm:ss` |
| `passwordHash` | `String?` | *Not available* |
| `ssoToken` | `String?` | SSO token for `student.dimigo.hs.kr`

#### api.getStudent(username)
Get a data of enrolled student.

| Param | Type | Description |
| ----- | ----- | ----- |
| `username` | `String` | Username of Dimigo **student** account |

##### Return value ⇒ `Object`
The student data from Dimigo REST API.

| Key | Type | Description |
| ----- | ----- | ----- |
| `id` | `int` | *Primary key* |
| `username` | `String` | *Unique* |
| `name` | `String` | Korean name |
| `gender` | `String` | `M`: male, `F`: female, `NULL`: unknown |
| `grade` | `int` | Current grade (`1` to `3`) |
| `clazz` | `int` | Current class (`1` to `6`) |
| `number` | `int` | Current number in class |
| `serial` | `String` | Serial code (e.g. `2409`) |
| `rfcardUid` | `String` | [RFID][ISO 14443] [UID][ISO 15693] of student ID card |
| `facePhoto` | `String?` | Image URL for face image |
| `userPhoto` | `String?` | Image URL for user-specific image |
| `dormitory` | `String?` | Current dormitory (`학봉관`, `본관` or `null`) |
| `roomNum` | `String?` | Current dormitory room number (~3 digits) |

#### api.getTeacher(username)
Get a data of the teacher.

##### Return value ⇒ `Object`
The teacher data from Dimigo REST API.

| Key | Type | Description |
| ----- | ----- | ----- |
| `id` | `int` | *Primary key* |
| `username` | `String` | *Unique* |
| `name` | `String` | Korean name |
| `gender` | `String` | `M`: male, `F`: female, `NULL`: unknown |
| `position` | `String?` | e.g. `부장교사`, `교사`, `교감`, `교장` |
| `role` | `String?` | e.g. `담임`, `비담임`, `1학년부장`, `IT특성화부장`, `교무부장` |
| `grade` | `int?` | Current grade (`1` to `3`, if role is `담임` or `부담임`) |
| `clazz` | `int?` | Current class (`1` to `6`, if role is `담임` or `부담임`) |

[Dimigo]: https://www.dimigo.hs.kr/

[node v]: https://img.shields.io/node/v/dimigo.svg
[npm l]: https://img.shields.io/npm/l/dimigo.svg
[npm v]: https://img.shields.io/npm/v/dimigo.svg
[npm dt]: https://img.shields.io/npm/dt/dimigo.svg
[npm package]: https://www.npmjs.com/package/dimigo


[ISO 14443]: https://en.wikipedia.org/wiki/ISO/IEC_14443
[ISO 15693]: https://en.wikipedia.org/wiki/ISO/IEC_15693
