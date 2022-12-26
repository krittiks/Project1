import React, { useState,useEffect } from 'react'
import { createContext } from 'react'
import { custAPI, prodsAPI, storeAPI } from './axios'

const data = createContext()

const DataCntxt= props => {

  const [cusPosts, setCusPosts]=useState([])
  const [prodPosts,setProdPosts]=useState([])
  const [storePosts, setStorePosts]=useState([])
  const [isErr, setIsErr]=useState('') 
 
  //get all customers
   const getCusData= async()=> {
        try{
            const res=await custAPI.get('/getall')
            res.data.reverse()
            setCusPosts(res.data)
         }
        catch(error)
        {
            setIsErr(error.message)
            console.log(error.message)
        }
      
    }

    //get all products
   const getProdData= async()=> {
    try{
        const res=await prodsAPI.get('/')
        res.data.reverse()
        setProdPosts(res.data)
     }
    catch(error)
    {
        setIsErr(error.message)
        console.log(error.message)
    }
  
}

 //getall stores
 const getStrData= async()=> {
  try{
      const res=await storeAPI.get('/')
      res.data.reverse()
      setStorePosts(res.data)
  }catch(error)
  {
      setIsErr(error.message)
      console.log(error.message)
  }

}

useEffect(()=>{        
  getCusData() 
  getProdData()
  getStrData()
},[])

  return (
    
      <data.Provider value={{cusPosts, prodPosts,storePosts,setCusPosts,
        getCusData,getProdData,getStrData}}>{props.children}</data.Provider>      
    
  )
}

export default DataCntxt
export {data}