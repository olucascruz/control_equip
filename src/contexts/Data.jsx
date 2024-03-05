import { useState, createContext, useEffect} from "react";
import { getSubjects } from "../storage/subjectRepository";
import { initDB } from "../storage/db";

export const dataContext = createContext({})

function DataProvider({children}){
    const [listSubject, setListSubject] = useState([])
    useEffect(()=>{
        // Inicializa o banco de dados criando as tabelas
        initDB()

        // Busca as disciplinas no banco de dados depois um tempo
        // para dar tempo das tabelas serem criadas se for a primeira
        // vez que o user abre o app
        setTimeout(()=>{
            getSubjects( subjects => {
                //Define o estado de listSubject o resultado da consulta
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