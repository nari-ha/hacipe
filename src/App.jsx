import { useState } from 'react'
import './App.css'

function App() {
  const TodoList = () => {
    let [todo, setTodo] = useState([]);
    let [text, setText] = useState("");
    function addTodo() {
      let tmp = [...todo];
      tmp.push({text, completed: false});
      setTodo(tmp);
      setText("");
    }
    function completeTodo() {
      let tmp = [...todo];
    }
    function removeTodo(i) {
      let tmp = [...todo];
      tmp.splice(i, 1);
      setTodo(tmp);
    }
    return (
      <>
      <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
      <button onClick={()=>{text.length >= 1 ? addTodo() : null}}>버튼</button>
      <ul>
        {
          todo.map((e, i)=> {
            return (
              <>
                <li key={i} style={{textDecoration : e.completed ? 'line-through' : 'none'}}><p>{e}
                <button onClick={()=>completeTodo(i)}>complete</button>
                <button onClick={()=>removeTodo(i)}>remove</button></p>
                </li>
              </>
          )
          })
        }
      </ul>
      </>
    )
  }
  return (
    <>
      <TodoList/>
    </>
  )
}

export default App
