class Api {
  baseOptions = (method) => {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByTagName('meta')[1].content
      }
    }
  }

  checkStatus = (resp) => {
    if (resp.status === 200) return resp

    const error = new Error(`${resp.status} ${resp.statusText}`)
    error.response = resp
    throw error
  }

  parseResp = (resp) => resp.json()

  getOptions = () => {
    return this.baseOptions('GET')
  }

  reqOptions = (method, body) => {
    return { ...this.baseOptions(method), body: JSON.stringify(body) }
  }

  baseFetch(url, options) {
    return fetch(`/api/v1/${url}`, options).then(this.checkStatus).then(this.parseResp)
  }

  sortFetch(url, options) {
    return fetch(url, options)
  }

  get(url) {
    return this.baseFetch(url, this.getOptions())
  }

  post(url, params) {
    return this.baseFetch(url, this.reqOptions('POST', params))
  }

  postSort(url, params) {
    return this.sortFetch(url, this.reqOptions('POST', params))
  }

  put(url, params={}) {
    return this.baseFetch(url, this.reqOptions('PUT', params))
  }

  destroy(url) {
    return this.baseFetch(url, this.reqOptions('DELETE'))
  }
}

export default new Api()
