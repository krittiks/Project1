import axios from "axios"


const custAPI = axios.create({
    baseURL: 'https://internshipwebsite1.azurewebsites.net/api/Customer'
})
const salesAPI = axios.create({
    baseURL: 'https://internshipwebsite1.azurewebsites.net/api/Sales'
})

const prodsAPI = axios.create({
    baseURL: 'https://internshipwebsite1.azurewebsites.net/api/Products'
})

const storeAPI=axios.create({
    baseURL: 'https://internshipwebsite1.azurewebsites.net/api/Stores'
})

export {custAPI, prodsAPI, storeAPI, salesAPI}