import axios from 'axios'
import Url from './Url.class.js'
import { message } from 'antd';

export default class Http {
  constructor () {
    this.successCallback = null
    this.failCallback = null
    this.errorCallback = null
    this.defaultCallback = null
  }

  static get api () {
    return 'http://192.168.1.33:8080/'
  }

  static send (args) {
    let instance = new Http()
    axios(this.formatOption(args)).then(response => {
      instance.dispense(response.data)
      if (instance.defaultCallback) instance.defaultCallback()
    }).catch(error => {
      console.log(error);
      console.log(error.response);
      if (instance.defaultCallback) instance.defaultCallback(error)
    })
    return instance
  }

  static formatData(data) {
    let datas = new FormData()
    for (const key in data) {
      datas.append(key, data[key])
    }
    return datas
  }

  static formatOption(args) {
    let option = {
      url: Url[args.url],
      method: args.method.toLowerCase(),
      baseURL: this.api,
    }
    if (args.tail && args.tail.length > 0) option.url = `${option.url}/${args.tail.join('/')}`
    switch (option.method) {
      case 'get':
        option.params = args.data
        break
      default:
        option.data = this.formatData(args.data)
        break
    }
    return option
  }

  dispense(response) {
    switch (response.code) {
      case 200:
        message.success(response.description, 1)
        if (this.successCallback) this.successCallback(response.data)
        break
      default:
        message.error(response.description, 1)
        if (this.failCallback) this.failCallback(response)
        break
    }
  }

  success(callback) {
    this.successCallback = callback
    return this
  }

  fail(callback) {
    this.failCallback = callback
    return this
  }

  error(callback) {
    this.errorCallback = callback
    return this
  }

  default (callback) {
    this.defaultCallback = callback
    return this
  }
}