import axios from 'axios'

class Http {
  async get(url, params) {
    let uri = url
    const esc = encodeURIComponent

    if (params) {
      const query = Object.keys(params)
        .map(k => `${esc(k)}=${esc(params[k])}`)
        .join('&')

      uri = `${url}?${query}`
    }

    const response = axios({
      method: 'get',
      url: uri
    })

    return response.catch()
  }

  async post(url, data) {
    let contentType
    let responseType = 'json'

    contentType = 'application/json'

    const headers = contentType

    const response = axios({
      method: 'post',
      url,
      responseType,
      data,
      headers
    })

    return response.catch()
  }
}

export default new Http()
 