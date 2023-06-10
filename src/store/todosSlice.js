import {createSlice, nanoid,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';



export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
            return axios.get('https:dummyjson.com/todos')
            .then(resp => resp.data)
    }
)


export const asyncDeleteTodo = createAsyncThunk(
    'todos/asyncDeleteTodo',
    async (id) => {
            return axios.get('https:dummyjson.com/todos/${id}')
            .then(resp => resp.data )
    }
)



export const asyncCreateTodo = createAsyncThunk('todos/create',async ({ todo, completed, userId }) => {
    try {const response = await axios.post('https://dummyjson.com/todos', {
        todo,
        completed,
        userId,
    });
    return response.data;} catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }}); 


const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        errore:''
    },
    reducers: {
        addTodo: (state, action) => {
            // immer
            const todo = {
                id: nanoid(),
                title: action.payload,
                completed: false
            }
            state.items.push(todo)
        },
        removeTodo: (state, action) => {
            const ind = state.items.findIndex(
                item => item.id === action.payload
            )
            if (ind > -1) {
                state.items.splice(ind, 1)
            }
        },
        toggleCompleted: (state, action) => {
            const ind = state.items.findIndex(
                item => item.id === action.payload
            )
            if (ind > -1) {
                state.items[ind].completed = !state.items[ind].completed
            }
        }
    },
    extraReducers: (builder) => {
            builder.addCase(fetchTodos.pending, state =>{
                state.loading = true
                state.error = ''
            })
            builder.addCase(fetchTodos.fulfilled, state =>{
                state.loading = false
                state.items = action.payload.todos 
            })
            builder.addCase(fetchTodos.pending, (state, action) =>{
                state.loading = false
                state.error = action.error.message
            })
            builder.addCase(asyncDeleteTodo.fulfilled, state =>{
                const ind = state.items.findIndex(
                    item => item.id === action.payload.id
                )
                if (ind > -1) {
                    state.items.splice(ind, 1)
                }
            })
}
})

export const {addTodo, removeTodo} = todosSlice.actions
export default todosSlice.reducer