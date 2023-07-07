import { useEffect,useState } from "react";
import "./App.css";
/*const tanslate=async ()=>{
  const res = await fetch("https://lingva.ml/auto/en/salut%20c'est%20comment", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  console.log(await res.json());
}*/
async function fetchData(setData,setLoading,setError,URL){
  setLoading(true);
  setError(null);
  try{
      const res=await fetch(URL)
      const json=await res.json()
      window.setTimeout(()=>{
        setData(json)
        setLoading(false)


      },1800)
    }catch(e){
      setLoading(false)
      setError(e)
  }
}
function App() {
  let [loading,setLoading]=useState(true)
  let [data,setData]=useState(null)
  let [error,setError]=useState(null)
  let URL="https://api.adviceslip.com/advice";
  useEffect(()=>{
    fetchData(setData,setLoading,setError,URL)
  },[URL])

  
  function handleClick(e){
    e.preventDefault()
    fetchData(setData,setLoading,setError,URL)
  }

  //tanslate()
  return (
    <>
      {error !== null? 
        <div className="error-ctn">
          <p>Error to reach: {error.message}</p>
          <button className='error-btn' onClick={handleClick}><img src="./Images/restart.svg" alt="reload"/></button>
        </div>
      :
      <>
      <div class="advice-ctn" action="#">
        {loading?<div className="load-title"></div>:<h1 class="advice-identifier">ADVICE #{data?.slip.id}</h1>}
        {loading?
        <>
          <div className="load-description"></div>
          <div className="load-description"></div>
          <div className="load-description"></div>
        </>
        :<p class="advice">
          <span>&ldquo;</span>{data?.slip.advice}<span>&rdquo;</span>
        </p>}
        <img
          class="separator"
          src="./images/pattern-divider-desktop.svg"
          alt="separator"
          srcset="./images/pattern-divider-mobile.svg 375w,./images/pattern-divider-desktop.svg 800w"
          sizes="(max-width:375px) 100vw,"
        />
        <div className="load"></div>
        <button className={`${loading?'load':'btn'} sbtn`} disabled={loading} onClick={handleClick}>
          <img src="./images/icon-dice.svg" alt="dice"/>
        </button>
      </div>
      <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/mohamedelbachir" target="_blank" rel="noreferrer">Mohamed</a>.
      </div>
      </>
      }
    </>
  );
}

export default App;
