import * as SQLite from 'expo-sqlite'


export function getDBConnection() {
    let db = null
    try{ 
        db = SQLite.openDatabase("myDatabase.db")
    }
    catch(error){
        console.log("error openDatabase:", error)
    }
    return db
}

export function initDB(){
    
    try{
        const db = getDBConnection()
        if(db){
            
            // Execute consultas SQL para criar tabelas
            db.transaction(tx => {

                // Cria a tabela Subject
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Subject (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, start_time TEXT, end_time TEXT)',[], ()=>{console.log("successful create Subject")}, ()=>{console.log("erro")})

                // Cria a tabela Student
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Student (id INTEGER PRIMARY KEY, name TEXT)',[], ()=>{console.log("successful create Student")}, ()=>{console.log("erro")});
        
                // Cria a tabela Machine
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Machine (id INTEGER PRIMARY KEY, is_available INTEGER)',[], ()=>{console.log("successful create Machine")}, ()=>{console.log("erro")})
                
                // Cria a tabela Loan   
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Loan (id INTEGER PRIMARY KEY AUTOINCREMENT, student INTEGER, machine INTEGER, subject INTEGER, loan_time TEXT, devolution_time TEXT, FOREIGN KEY (student) REFERENCES Student(id) ON DELETE NO ACTION, FOREIGN KEY (machine) REFERENCES Machine(id) ON DELETE NO ACTION, FOREIGN KEY (subject) REFERENCES Subject(id) ON DELETE NO ACTION)',[], ()=>{console.log("successful create Loan")}, ()=>{console.log("erro Loan")});
                

                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Student_Subject (student INTEGER, subject INTEGER, PRIMARY KEY (student, subject), FOREIGN KEY (student) REFERENCES Student(id), FOREIGN KEY (subject) REFERENCES Subject(id))',[], ()=>{console.log("successful create Student_Subject")}, ()=>{console.log("erro")});

                    
                }, (error) =>{ console.log("error transition",error)},
                    ()=> { console.log('successful transition') })

    }
    }catch(error){
        console.log("error openDB",error)
        console.error('Arquivo:', error.stack.split('\n')[1]);   
    }
}