import { useState, createContext, useEffect} from "react";
import { getSubjects } from "../storage/subjectRepository";
import { getMachines } from "../storage/machineRepository";
import { getStudents } from "../storage/studentRepository";
import { getLoans } from "../storage/loanRepository";
import { initDB, db } from "../storage/db";

export const dataContext = createContext({})

function DataProvider({children}){
    const [listSubject, setListSubject] = useState([])
    const [listMachine, setListMachine] = useState([])
    const [listStudent, setListStudent] = useState([])
    const [listLoan, setListLoan] = useState([])
    const [database, setDatabase] = useState(null)
    const [subjectSelected, setSubjectSelected] = useState(null)


    useEffect(()=>{
        // Inicializa o banco de dados criando as tabelas
        initDB()

        // Busca as disciplinas no banco de dados depois um tempo
        // para dar tempo das tabelas serem criadas se for a primeira
        // vez que o user abre o app
        setTimeout(()=>{
            getSubjects(db, subjects => {
                //Define o estado de listSubject o resultado da consulta
                setListSubject(subjects)
                console.log("my subjects:", subjects)
                if(subjects.length > 0){

                    setSubjectSelected(subjects[0])
                }
            })

            getMachines(db, machines =>{
                //Define o estado de listMachine o resultado da consulta
                setListMachine(machines)
                console.log("my machine:", machines)
            })

            getStudents(db, students=>{
                setListStudent(students)
                console.log("my student:", students)
            })

            getLoans(db, loans =>{
                setListLoan(loans)
                console.log("my loans:", loans)
                
                
            })
            
            setDatabase(db)
        }, 700)  
        
    },[])

    return(
        <dataContext.Provider value={
        {database,
         listSubject, setListSubject,
         listStudent, setListStudent,
         listMachine, setListMachine,
         listLoan, setListLoan,
         subjectSelected, setSubjectSelected}}>
            {children}
        </dataContext.Provider>
        )
}

export default DataProvider;