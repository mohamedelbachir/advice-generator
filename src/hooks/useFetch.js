import { useEffect, useState } from 'react'
function useFetch(url) {
    const [loading,setLoading]=useState(true)
    const [data,setData]=useState(null)
    const [error,setError]=useState(null)
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true);
            try{
                const res=await fetch(url)
                const json=await res.json()
                setData(json)
                setLoading(false)
            }catch(e){
                setLoading(false)
                setError(e)
            }
        }
        fetchData()
    },[url])
    return {loading,error,data}
}

export default useFetch