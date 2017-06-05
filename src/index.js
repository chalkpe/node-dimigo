const crc32 = require('crc-32')
const sha256 = require('sha256')

const axios = require('axios')
const changeCase = require('change-case')
const normalizeUrl = require('normalize-url')

const keyReplacers = {
  user_id: 'id',
  class: 'clazz',
  birthdate: 'birthday',
  photofile1: 'facePhoto',
  photofile2: 'userPhoto'
}

const valueReplacers = {
  '^photofile\\d': (api, url) => normalizeUrl(`${api.host}/../user_photo/${url}`)
}

function refactor (api, { data }) {
  return Object.assign({}, ...Object.entries(data).map(([key, value]) => {
    const v = Object.keys(valueReplacers).find(r => key.match(r))

    const newValue = v ? valueReplacers[v](api, value) : value
    const newKey = changeCase.camelCase(keyReplacers[key] || key)

    return { [newKey]: newValue }
  }))
}

class Dimigo {
  constructor ({ host, username, password }) {
    this.host = host
    this.instance = axios.create({
      baseURL: host,
      auth: { username, password }
    })
  }

  static createHash (password) {
    const hash = crc32.str(password) >>> 0 // convert to uint32
    const padded = `0000000000${hash}`.slice(-10) // sprintf("%010s", str)

    return '@' + sha256(password + padded)
  }

  async fetch (url, options = {}) {
    try {
      return refactor(this, await this.instance.get(url, options))
    } catch (err) {
      if (!err || !err.response) throw (err || new Error())

      const { status, data } = err.response
      if (status !== 404) throw err // 404 -> unauthorized

      const error = new Error(data.message || err.message)
      throw (error.statusCode = 401, error) // set statusCode field and return
    }
  }

  async identifyUser (username, password, hash = Dimigo.createHash) {
    return this.fetch('/users/identify', {
      params: { username, password: hash(password) }
    })
  }

  async getStudent (username) {
    return this.fetch(`/user-students/${username}`)
  }

  async getTeacher (username) {
    return this.fetch(`/user-teachers/${username}`)
  }
}

Dimigo.userTypes = {
  T: '교사',
  D: '생활관교사',
  S: '학생', // or 졸업생 (see `user_gcn_history` table)
  P: '학부모',
  O: '손님'
}

module.exports = Dimigo
