import { ThreatScenario } from '../interfaces/Interfaces'
import axios from 'axios'

export const threatScenarioApiUrl = 'http://localhost:3001/threat-scenario'

axios.defaults.baseURL = threatScenarioApiUrl

const index = (page = 1) =>
    axios.get(`?page=${page}`).then(res => res.data)

const get = (id) =>
    axios.get(`/${id}`).then(res => res.data)

const update = (id, values: ThreatScenario) =>
    axios.put(`/${id}`, values).then(res => res.data)

const create = async (values: ThreatScenario) =>
    axios.post('/', values).then(res => res.data)

const remove = async (id) =>
    axios.delete(`/${id}`).then(res => res.data)

export {
    get,
    index,
    update,
    create,
    remove,
}
