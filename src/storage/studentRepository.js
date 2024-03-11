export function addStudent(db, id, name) {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Student (id, name) VALUES (?, ?)',
            [id, name],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log('Estudante adicionado com sucesso!');
                } else {
                    console.log('Falha ao adicionar o estudante.');
                }
            },
            error => {
                console.error('Erro ao adicionar o estudante:', error);
            }
        );
    });
}

// Função para obter todos os estudantes da tabela Student
export function getStudents(db, callback) {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Student',
            [],
            (tx, results) => {
                console.log('Consulta executada com sucesso');
                const result = results.rows._array;
                callback(result);
            },
            error => {
                console.error('Erro ao obter os estudantes:', error);
            }
        );
    });
}