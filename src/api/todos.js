import axios from '../utils/axios'

export default class Todo {
    async fetchAll() {
        const { data } = await axios.get('/todos')
        return data
    }

    async store({ task, done }) {
        const { data } = await axios.post('/todos', {task, done})
        return data
    }

    async update({ id, task, done }) {
        const { data } = await axios.put(`/todos/${id}`, {task, done})
        return data
    }

    async delete({ id }) {
        await axios.delete(`/todos/${id}`)
    }
}