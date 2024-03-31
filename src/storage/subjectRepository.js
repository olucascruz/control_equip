
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


export function deleteSubject(db, subjectId, callback = null) {
    db.transaction(tx => {
        console.log('Iniciando exclusão de item');
        tx.executeSql(
            'DELETE FROM Subject WHERE id = ?',
            [subjectId],
            (tx, results) => {
                console.log('Item excluído com sucesso!', results);
                if (callback) {
                    callback(results);
                }
            },
            (tx, error) => {
                console.error('Erro ao excluir o item:', error);
            }
        );
    });
}

export function updateSubject(db, subjectId, newName, newStartTime, newEndTime, callback = null) {
    db.transaction(tx => {
        console.log('Iniciando atualização de item');
        tx.executeSql(
            'UPDATE Subject SET name = ?, start_time = ?, end_time = ? WHERE id = ?',
            [newName, newStartTime, newEndTime, subjectId],
            (tx, results) => {
                console.log('Item atualizado com sucesso!', results);
                if (callback) {
                    callback(results);
                }
            },
            (tx, error) => {
                console.error('Erro ao atualizar o item:', error);
            }
        );
    });
}
