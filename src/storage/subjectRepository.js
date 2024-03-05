import {getDBConnection} from "./db"

export function addSubject(name, startTime, endTime) {
    // Obtenha uma referência ao banco de dados
    
    const db = getDBConnection();

    // Execute uma transação para adicionar o item
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Subject (name, start_time, end_time) VALUES (?, ?, ?)',
            [name, startTime, endTime],
            (tx, results) => {
                console.log('Item adicionado com sucesso!', results);
            },
            (tx, error) => {
                console.error('Erro ao adicionar o item:', error);
            }
        );
    });
}


export function getSubjects(callback) {
    console.log('Iniciando getSubjects');
    try {
        // Obtenha uma referência ao banco de dados
        const db = getDBConnection();
        console.log('Banco de dados aberto:', db);
        // Execute a consulta para obter as disciplinas

        db.transaction(tx => {
            console.log('Iniciando transação');
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
