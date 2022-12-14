import { useEffect, useRef, useState } from "react";
import { BsCheckCircle, BsPencilSquare, BsTrash2 } from "react-icons/bs";

const App = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [btn, setBtn] = useState(true)
    const [id, setId] = useState()
    const inputRef = useRef()


    const trackInput = (e) => {
        setInput(e.target.value)
    }

    // Adding Todos
    const addTodo = (e) => {
        e.preventDefault()
        if(input.length >= 1){
            const id = Math.floor(Math.random() * 105000)
            const newTodos = [...todos, {id: id, title: input, done: false}]
            setTodos(newTodos)
            setInput('')
        }
        else{
            document.querySelector('input').style.border='2px solid red'
            document.querySelector('.alert').style.opacity = 1
            setTimeout(() => {
                document.querySelector('.alert').style.opacity = 0
            }, 4000)
        }
        
    }

    //  Subit Edited Value 
    const EditTodo = (e) => {
            e.preventDefault()
            if(input.length >= 1){
                const newTodos = todos.map(todo => {
                    if(todo.id === id){
                        todo.title = input
                    }
                    return todo
                })
                setTodos(newTodos)
                setInput('')
                setBtn(!btn)
            }
            else{
                document.querySelector('input').style.border='2px solid red'
                document.querySelector('.alert').style.opacity = 1
                setTimeout(() => {
                    document.querySelector('.alert').style.opacity = 0
                }, 4000)
            }
    }

    // Onclick Todo Button
    const editTodo = ({id, title}) => {
        setInput(title)
        setBtn(false)
        setId(id)
    }

    // Delete Todo
    const removeTodo = ({id}) => {
        const newTodos = todos.filter(todo => {
            if(todo.id !== id){
                return todo
            }
        })
        setTodos(newTodos)
        setBtn(true)
        setInput('')
    }

    // Complete Todo
    const doneTodo = ({id, done}) => {
        const newTodos = todos.map(todo => {
            if(todo.id === id){
                todo.done = !done
            }
            return todo
        })
        setTodos(newTodos)
    }

    useEffect(() => {
        if(input.length >= 1){
            document.querySelector('input').style.border='2px solid blue'
        }
    }, [input])

    return ( 
        <div className="bg-gray-100 w-screen min-h-screen flex flex-col items-center justify-start">
            <div className="flex flex-col p-2c gap-2c">
                <form action="" onSubmit={btn ? addTodo: EditTodo}>
                    <div className="flex justify-between gap-1c">
                        <input type="text" ref={inputRef} className="h-2.75c px-0.5c outline-0 rounded w-full border-2 border-black hover:border-blue-600 duration-300" value={input} onChange={trackInput}/>
                        {btn && <button className="bg-blue-600 text-white w-7c font-bold p-0.5c hover:bg-black duration-300 rounded text-xs">Add Todo</button>}
                        {!btn && <button className="bg-yellow-300 text-black w-7c font-bold p-0.5c hover:bg-black hover:text-white duration-300 rounded text-xs">Save</button>}
                    </div>
                </form>
                <div className="flex flex-col">
                    {todos.map((todo) => (
                        <div className="flex items-center gap-10c w-fit py-0.5c" key={todo.id}>
                            <div className="flex w-10c ">
                                <p onDoubleClick={() => doneTodo(todo)} className={todo.done?"cursor-pointer capitalize font-bold line-through text-gray-400 duration-300 ":"capitalize font-bold duration-300 cursor-pointer hover:text-blue-600 duration-500 "}>{todo.title}</p>
                            </div>
                            <div className="flex gap-1c">
                                <BsCheckCircle onClick={() => doneTodo(todo)} className='cursor-pointer hover:text-green-500 duration-500 text-lg'/>
                                <BsPencilSquare onClick={() => editTodo(todo)} className='cursor-pointer hover:text-yellow-200 duration-500 text-lg'/>
                                <BsTrash2 onClick={() => removeTodo(todo)} className='cursor-pointer hover:text-redc duration-500 text-lg'/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="alert opacity-0 text-redc duration-300">Please input a value in the text field</p>
        </div>
     );
}
 
export default App;