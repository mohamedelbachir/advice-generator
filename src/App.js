import { useEffect, useState } from "react";
import "./App.css";
/*const tanslate=async ()=>{
  const res = await fetch("https://lingva.ml/auto/en/salut%20c'est%20comment", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  console.log(await res.json());
}*/
async function fetchData(setData, setLoading, setError, URL) {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(URL);
    const json = await res.json();
    window.setTimeout(() => {
      setData(json);
      setLoading(false);
    }, 1800);
  } catch (e) {
    setLoading(false);
    setError(e);
  }
}
function App() {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState(null);
  let [error, setError] = useState(null);
  let URL = "https://api.adviceslip.com/advice";
  useEffect(() => {
    fetchData(setData, setLoading, setError, URL);
  }, [URL]);

  function handleClick(e) {
    e.preventDefault();
    fetchData(setData, setLoading, setError, URL);
  }

  //tanslate()
  return (
    <>
      {error !== null ? (
        <div className="error-ctn">
          <p>Error to reach: {error.message}</p>
          <button className="error-btn" onClick={handleClick}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.75 8C12.75 10.4853 10.7353 12.5 8.24999 12.5C6.41795 12.5 4.84162 11.4052 4.13953 9.83416L2.74882 10.399C3.67446 12.5186 5.78923 14 8.24999 14C11.5637 14 14.25 11.3137 14.25 8C14.25 4.68629 11.5637 2 8.24999 2C6.3169 2 4.59732 2.91418 3.5 4.3338V2.5H2V6.5L2.75 7.25H6.25V5.75H4.35201C5.13008 4.40495 6.58436 3.5 8.24999 3.5C10.7353 3.5 12.75 5.51472 12.75 8Z"
                fill="#202733"
              />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <div class="advice-ctn" action="#">
            {loading ? (
              <div className="load-title"></div>
            ) : (
              <h1 class="advice-identifier">ADVICE #{data?.slip.id}</h1>
            )}
            {loading ? (
              <>
                <div className="load-description"></div>
                <div className="load-description"></div>
                <div className="load-description"></div>
              </>
            ) : (
              <p class="advice">
                <span>&ldquo;</span>
                {data?.slip.advice}
                <span>&rdquo;</span>
              </p>
            )}
            <img
              class="separator"
              src="./images/pattern-divider-desktop.svg"
              alt="separator"
              srcset="./images/pattern-divider-mobile.svg 375w,./images/pattern-divider-desktop.svg 800w"
              sizes="(max-width:375px) 100vw,"
            />
            <div className="load"></div>
            <button
              className={`${loading ? "load" : "btn"} sbtn`}
              disabled={loading}
              onClick={handleClick}
            >
              <img src="./images/icon-dice.svg" alt="dice" />
            </button>
          </div>
          <div class="attribution">
            Challenge by
            <a
              href="https://www.frontendmentor.io?ref=challenge"
              target="_blank"
              rel="noreferrer"
            >
              Frontend Mentor
            </a>
            . Coded by
            <a
              href="https://github.com/mohamedelbachir"
              target="_blank"
              rel="noreferrer"
            >
              Mohamed
            </a>
            .
          </div>
        </>
      )}
    </>
  );
}

export default App;
