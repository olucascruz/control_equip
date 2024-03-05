import React, { useState, createContext, useEffect} from "react";
import { getSubjects } from "../storage/subjectRepository";
import { initDB } from "../storage/db";
export const dataContext = createContext({})

function DataProvider({children}){
    const [listSubject, setListSubject] = useState([])
    useEffect(()=>{
        initDB()
        setTimeout(()=>{
            getSubjects( subjects =>{
                setListSubject(subjects)
                console.log("my subjects:", subjects)
            })
        }, 500)  
        
    },[])
    return(
        <dataContext.Provider value={{ listSubject, setListSubject }}>
            {children}
        </dataContext.Provider>
        )
}

export default DataProvider;