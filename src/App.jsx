import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import Header from './components/Header';

function App() {
  const items = ['Apple', 'Banana', 'Cherry', 'Diamond', 'Elephant', 'Mango', 'Orange', 'Blueberry'];
  const navigate = useNavigate();
  const tabs = [
    {id : 0, label : "Tab 1", content : <div>Apple<br/>This is Tab 1</div>},
    {id : 1, label : "Tab 2", content : <div>Banana<br/>This is Tab 2</div>},
    {id : 2, label : "Tab 3", content : <div>Cherry<br/>This is Tab 3</div>},
  ]
  const images = [
    'https://i.pinimg.com/736x/56/d9/12/56d9120d70209afb1e44541daeef3b89.jpg',
    'https://i.pinimg.com/736x/c1/a9/31/c1a9319a164f86df8b7aac7824f4773c.jpg',
    'https://i.pinimg.com/736x/3b/11/49/3b11499e6dd90bb9290ace25a34ef3b3.jpg',
    'https://i.pinimg.com/736x/a6/c0/74/a6c074db2c8067f83601e48bf2db846f.jpg',
  ]
  return (
    <>
    <Header navigate={navigate}/>
    <Routes>
    <Route path="/" element=<p>여기는 메인...</p>/>
      <Route path="/todo" element={<TodoList/>}/>
      <Route path="/search" element={<Search items={ items }/>}/>
      <Route path="/tabs" element={<Tabs tabs = { tabs }/>}/>
      <Route path="/star" element={<StarRating/>}/>
      <Route path="/data" element={ <DataFetcher/>}/>
      <Route path="/data" element={ <Dropdown items={ items }/>}/>
      <Route path="/img" element={ <Carousel images = { images }/>}/>
    </Routes>
    </>
  )
}

const StarRating = ( {total = 5 }) => {
  const [rate, setRate] = useState(0);
  return (
    <>
      <div>
    {[...Array(total)].map((star, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => setRate(starValue)}
            style={{ cursor: 'pointer', color: starValue <= rate ? 'gold' : 'gray' }}
          >
            ★
          </span>
        );
      })}
      </div>
    </>
  )
}

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const toNext = () => {
    if (current == images.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  }
  const toPrevious = () => {
    if (current == 0) setCurrent(images.length - 1);
    else setCurrent(current - 1);
  }
  return (
    <>
      <button onClick={()=>toPrevious()}>previous</button>
      <button onClick={()=>toNext()}>next</button>
      <div>
        <img src={images[current]} width='300' height='400'/>
      </div>
    </>
  )
}

const Modal = () => {
  return (
    <>
    </>
  )
}

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className='tab-btn'>
        {tabs.map((e, i)=><button key={i} onClick={()=>setActive(e.id)} disabled={ e.id === active ? 'disabled' : '' }>{e.label}</button>)}
      </div>
      <div className='tab-content'>{tabs[active].content}</div>
    </>
  )
}

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <button onClick={() => setIsOpen(!isOpen)}>items</button>
    {isOpen ? 
      <ul>
        {items.map((el, i) => <li key={i}>{el}</li>)}
      </ul> 
      : null}
    </>
  )
}

const Search = ({ items }) => {
  const [query, setQuery] = useState("");
  const filteredItems = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
    <input
      type = "text"
      value = {query}
      onChange = { e => setQuery(e.target.value)}
      placeholder="Search..."
    />
    
    <ul>
      {filteredItems.map((e, idx) => <li key={idx}>{e}</li>)}
    </ul>
    </>
  )
}

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = 'https://jsonmock.hackerrank.com/api/football_teams?league=English%20Premier%20League%20(EPL)';
  useEffect(()=>{
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      setData(data.data);
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
    });
  }, []);
  if (loading) return <p>Loading...</p>
  return (
    <>
    <ul>
      {data.map((e, i) => <li key={i}>{e.name}</li>)}
    </ul>
    </>
  )
}

const TodoList = () => {
  let [todo, setTodo] = useState([]);
  let [text, setText] = useState("");
  const addTodo = () => {
    let tmp = [...todo];
    tmp.push({text, completed: false});
    setTodo(tmp);
    console.log(todo);
    setText("");
  }
  const completeTodo = (i) => {
    let tmp = [...todo];
    tmp[i].completed = !tmp[i].completed;
    setTodo(tmp);
  }
  const removeTodo = (i) => {
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
              <li key={i} style={{textDecoration : e.completed ? 'line-through' : 'none'}}>
                {e.text}
              <button onClick={()=>completeTodo(i)}>complete</button>
              <button onClick={()=>removeTodo(i)}>remove</button>
              </li>
            </>
        )
        })
      }
    </ul>
    </>
  )
}

export default App
