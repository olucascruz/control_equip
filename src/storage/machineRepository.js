import {getDBConnection} from "./db"


export function addMachine(id) {
    const db = getDBConnection();
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Machine (id) VALUES (?)',
            [id],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log('Máquina adicionada com sucesso!');
                } else {
                    console.log('Falha ao adicionar a máquina.');
                }
            },
            error => {
                console.error('Erro ao adicionar a máquina:', error);
            }
        );
    });
}

export function getMachines(callback) {
    const db = getDBConnection();
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Machine',
            [],
            (tx, results) => {
                console.log('Consulta executada com sucesso');
                const result = results.rows._array;
                callback(result);
            },
            error => {
                console.error('Erro ao obter as máquinas:', error);
            }
        );
    });
}