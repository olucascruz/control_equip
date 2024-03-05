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
            console.log("name",db._name)
            
            // Execute consultas SQL para criar tabelas
            db.transaction(tx => {
                // Cria a tabela Student
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Student (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
        
                // Cria a tabela Machine
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Machine (id INTEGER PRIMARY KEY AUTOINCREMENT)')
        

                // Cria a tabela Subject
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Subject (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, start_time TEXT, end_time TEXT)')
                })
    }
    }catch(error){console.log("error openDB",error)}
}