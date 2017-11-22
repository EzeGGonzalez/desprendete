import * as axios from 'axios'

let options = {}

options.baseURL = process.env.apiUrl || 'http://localhost:8080'

export default axios.create(options)
