import React,{useEffect,useState,useRef} from 'react';
import './style.css';
import './header.scss'
//import ReactDom from 'react-dom'
import logo from './logo.svg';

/** useState Personnalise*/
function useIncremente(initiale=0,step=1) {
    const [count,setCount]=useState(initiale)
    const increment=function () {
        setCount(c=>c+step)
    }
    return [count,increment]
}
function Compteur() {
   const [count, increment] = useIncremente(0,5)
   useEffect(() => {
       const timer=window.setInterval(()=>{
           increment()
       },1000)
       return function () {
           window.clearInterval(timer)
       }
   }, [])

   useEffect(() => {
      document.title="compteur "+count
   }, [count])

    return ( 
        <button onClick={increment}>Nombre : {count}</button>
    ) 
}

function useToggle(state=false) {
    const [isToggle,setToggle]=useState(state)
    const changeToggle=function () {
        setToggle(v=>!v)
    }
    return [isToggle,changeToggle]
}

function useFectch(url) {
    const [state,setState]=useState({
        items:[],
        loading:true
    })
    useEffect(() => {
        (async function () {
            const reponse=await fetch(url)
            const responseData= await reponse.json()
            if(reponse.ok){
                setState({loading:false,items:responseData})
            }else{
                setState(function(s){
                        return {...s,loading:false}
                    }
                )
            }
        })()// eslint-disable-next-line 
     }, [])
    return[state.loading,state.items]
}

function PostTable() {
    const [loading,items]=useFectch('https://jsonplaceholder.typicode.com/comments?_limit=2')
     if(loading){
        return <p>
            Chargement Table ...
        </p>
    }
    return <table className="data-table">
        <thead>
            <tr>
                <td>nom</td>
                <td>email</td>
                <td>contenu</td>
            </tr>
        </thead>
        <tbody>
            {items.map(t=><tr key={t.id}>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td>{t.body}</td>
                </tr>
            )} 
        </tbody>
    </table>
}

function TodoList() {
    const [todos,setTodos]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(() => {
       (async function () {
           const reponse=await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
           const responseData= await reponse.json()
           if(reponse.ok){
                setTodos(responseData)
           }else{
               alert(JSON.stringify(responseData))
           }
           setLoading(false)
       })()
    }, [])
    if(loading){
        return <p>
            Chargement...
        </p>
    }
    return(<>
            <h3>Liste todos</h3>
            <ul className="list-todos">
                {todos.map(t=><li key={t.id}>{t.title}</li>)} 
            </ul>
    </>
    )
}
function Header() {
    const[compteurVisible,toggleCompteur]=useToggle(true)
    const input= useRef(null)
    function handleClick() {
        console.log(input.current.value)
    }

    return(
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
        <a 
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        >
        Learn React
        </a>
        <TodoList/>
        <PostTable/>
        <input type="text" defaultValue="sample" ref={input}/>
        <button onClick={handleClick}>show value</button>
        Afficher le Compteur : <input type="checkbox" onChange={toggleCompteur} checked={compteurVisible}/>
        {compteurVisible&&<Compteur/>}
    </header>
    )
}
export default Header;