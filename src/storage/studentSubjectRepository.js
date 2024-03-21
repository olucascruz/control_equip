
export function addStudentToSubject(db, studentId, subjectId, callback) {

    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Student_Subject (student, subject) VALUES (?, ?)',
            [studentId, subjectId],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log('Estudante adicionado a disciplina com sucesso!');
                    if(typeof callback === "function"){
                        callback()
                    }
                } else {
                    console.log('Falha ao adicionar estudante a disciplina.');
                }
            },
            error => {
                console.error('Erro ao adicionar estudante a disciplina:', error);
            }
        );
    });
}

// Função para obter todos os estudantes da tabela Student
export function getStudentsBySubject(db, subjectId, callback=null) {
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

export function getStudentSubject(db, callback) {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Student_Subject',
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



export function deleteStudentSubject(db, studentId, subjectId, callback){
    db.transaction(tx=>{
        tx.executeSql("DELETE FROM Student_Subject WHERE student = ? AND subject = ?",
        [studentId, subjectId],
        (tx, results)=>{
            console.log("Estudante deletado da disciplina com sucesso")
            if(typeof callback === "function"){
                callback()
            }
        },
        error=>{
            console.error("Falha ao deletar o estudante da disciplina")
        
        })
    
    }, error=>{console.error("Error ao deletar estudante da disciplina")})


}