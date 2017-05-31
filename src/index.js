const axios = require('axios')
const crc32 = require('crc-32')
const sha256 = require('sha256')
const changeCase = require('change-case')

const replacements = {
  class: 'clazz'
}

function refactor ({ data }, key = k => k) {
  return Object.assign({},
    ...Object.keys(data).map(k => ({ [key(k)]: data[k] })))
}

class Dimigo {
  constructor ({ host, username, password }) {
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
      const key = k => changeCase.camelCase(replacements[k] || k)
      return refactor(await this.instance.get(url, options), key)
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
