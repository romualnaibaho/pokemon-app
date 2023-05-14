module.exports = function () {
    this.getEnv = function (param) {
      if (param === 'API_URL') {
        return process.env.VUE_APP_API_URL
      }
      return ''
    }
  }
