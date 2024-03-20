export function addStudent(db, id, name, callback=null) {

    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Student (id, name) VALUES (?, ?)',
            [id, name],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log('Estudante adicionado com sucesso!');
                    if(typeof callback === "function")callback()
                } else {
                    console.log('Falha ao adicionar o estudante.');
                }
            },
            error => {
                console.error('Erro ao adicionar o estudante:', error);
            }
        );
    }, error => {
        console.error('Erro na transação ao adicionar o estudante:', error);
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

export function deleteStudent(db, studentId, callback=null){
    
    db.transaction(tx=>{
        console.log("init transition")
        tx.executeSql('DELETE FROM Student WHERE id = ?',
        [studentId],
        (tx, results)=>{ 
            if (results.rowsAffected > 0) {
                console.log('Estudante deletado com sucesso!');
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
            console.log('Falha ao deletar o estudante.');
            }
        },
        error=>{console.error("Erro ao deletar estudante", error)}
        
        )    
    
    }, error =>{console.error("Error transition delete student: ",error)},
        ()=>{console.log("successful")})
}


export function getNameStudentById(db, studentId, callback=null){

    db.transaction(tx=>{
        
        tx.executeSql( "SELECT name FROM Student WHERE id = ?",
        [studentId],
        (tx, results)=> {
            console.log('consulta de nome de estudante realizada com sucesso!');
            const result = results.rows._array;
            if(typeof callback == "function"){
               callback(result);
            }

        })
    
    })

}
