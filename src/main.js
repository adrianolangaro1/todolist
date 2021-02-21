import { createApp } from 'vue'
import Todos from './api/todos'
import './assets/css/main.css'

const apiTodos = new Todos()

const app = createApp({
    data() {
        return {
            todos: [],
            apptitle: 'Simple Todo list',
            form: {
                task: '', 
                done: false
            }
        }
    },
    created() {
        this.fetchTodos() 
    },
    methods: {
        async fetchTodos() {
            this.todos = await apiTodos.fetchAll()
        },
        async createTodo() {
            const data = await apiTodos.store(this.form)
            this.todos.push(data)

            this.form.task = ''
            this.form.done = false
        },
        async toggleTodoStatus(todo) {
            const data = await apiTodos.update({
                ...todo,
                done: !todo.done
            })

            const index = this.todos.findIndex((todo) => todo.id === data.id )
            this.todos[index] = data
        },
        async deleteTodo(id) {
            await apiTodos.delete({ id });

            const index = this.todos.findIndex((todo) => todo.id === id )
            this.todos.splice(index, 1)
        }
    }
})

app.mount('#app')