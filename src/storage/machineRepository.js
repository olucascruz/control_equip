import {openDatabase} from "./db"


export function addMachine(name) {
    const db = openDatabase();
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Machine (name) VALUES (?)',
            [name],
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
    const db = openDatabase();
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Machine',
            [],
            (tx, results) => {
                const machines = [];
                const len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    const row = results.rows.item(i);
                    machines.push(row);
                }
                callback(machines);
            },
            error => {
                console.error('Erro ao obter as máquinas:', error);
            }
        );
    });
}