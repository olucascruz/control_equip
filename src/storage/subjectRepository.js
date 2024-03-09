import {getDBConnection} from "./db"

export function addSubject(db, name, startTime, endTime, callback=null) {
    // Execute uma transação para adicionar o item
    db.transaction(tx => {
        console.log('iniciando adição de item');
        tx.executeSql(
            'INSERT INTO Subject (name, start_time, end_time) VALUES (?, ?, ?)',
            [name, startTime, endTime],
            (tx, results) => {
                console.log('Item adicionado com sucesso!', results);
                if(callback){
                 callback(results)
                }
            },
            (tx, error) => {
                console.error('Erro ao adicionar o item:', error);
            }
        );
    });
}


export function getSubjects(db, callback) {

    try {
        console.log('Banco de dados aberto:', db);
        // Execute a consulta para obter as disciplinas

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Subject',
                [],
                (tx, results) => {
                    console.log('Consulta executada com sucesso');
                    const result = results.rows._array;
                    callback(result)
                },
                (tx, error) => {
                    console.error('Erro ao executar consulta:', error);
                }
            );
        });
        
    } catch (error) {
        console.error('Erro ao abrir o banco de dados:', error);
    }
}
