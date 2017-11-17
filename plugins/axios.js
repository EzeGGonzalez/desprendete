import * as axios from 'axios'

let options = {}

options.baseURL = process.env.API_URL || 'http://localhost:8080'

export default axios.create(options)
