
export function addStudentToSubject(db, studentId, subjectId) {

    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO StudentSubject (student, subject) VALUES (?, ?)',
            [studentId, subjectId],
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
export function getStudentsBySubject(db, callback, subjectId) {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT student FROM Student_Subject WHERE subject = ?',
            [subjectId],
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