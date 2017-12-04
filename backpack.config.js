module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/keystone.js'
    return config
  }
}
