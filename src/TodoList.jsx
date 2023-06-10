import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addTodo, asyncDeleteTodo,fetchTodos } from './store/todosSlice'

const TodoList = () => {
    const [todo, setTodo] = useState('')
    const {items, loading,error} = useSelector(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchTodos())
    },[dispatch])

    if (loading) return <h5>please wait, loading</h5>
    if(error !== '') return <h5>Sorry, an error has occurred</h5>

    return (
        <div><h5>TodoList</h5>
            <input 
                type="text"
                onChange={e => setTodo(e.target.value)}/>
            <button onClick={
                () => dispatch(addTodo(todo))
            }>Добавить</button>
            {items && 
                <ul>
                    {items.map( (item, i) => 
                        <li>
                            <button>
                                {item.completed ? 'x' : 'v'}
                            </button>
                            {item.todo}
                        <button
                            onClick={
                                () => dispatch(asyncDeleteTodo(item.id))
                            }
                        >X</button></li>
                    )}
                </ul>
            }

        </div>
    )
}
export default TodoList