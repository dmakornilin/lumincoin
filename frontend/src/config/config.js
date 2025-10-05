
const host = process.env.HOST;

const config ={
    // host: 'http://localhost:3000',
    // api: 'http://localhost:3000/api'
    host: host,
    api: host + '/api',
    costKey: 'expense',
    incomeKey: 'income'

}

export default config;