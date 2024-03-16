export function addLoan(db, studentId, subjectId, machineId, callback=null) {

    db.transaction(tx => {
        const date = new Date()
        const stringData = date.toISOString();
        tx.executeSql(
            'INSERT INTO Loan (student, subject, machine, loan_time) VALUES (?, ?, ?, ?)',
            [studentId, subjectId, machineId, stringData],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log("Empréstimo registrado com sucesso!");
                    if(typeof callback == "function"){ 
                        callback()
                    }
                } else {
                    console.log("Falha ao registrar empréstimo.");
                }
            },
            error => {
                console.error("Erro ao adicionar o estudante:", error);
            }
        );
    });
}

export function getLoans(db, callback = null){
    db.transaction(tx=>{
        
        tx.executeSql("SELECT * FROM Loan",
        [],
        (tx, results)=>{
            console.log("Consulta de empréstimo realizada com sucesso")
            if(typeof callback == "function"){
                const result = results.rows._array;
                callback(result)
            }
        },
        error=>{console.error("Falha na consulta de empréstimo")
        })
        
    },()=> console.error("error na transição da consulta de empréstimo"),
      ()=>{console.log("successful")})

}

export function devolutionLoan(db, loanId, callback=null){
    const date = new Date()
    const stringDate = date.toISOString();
    db.transaction(tx=>{
        tx.executeSql("UPDATE Loan SET devolution_time = ? WHERE id = ?",
        [stringDate, loanId],
        (tx, results)=>{
            console.log("Empréstimo atualizado: Devolvido")
            if(typeof callback == "function"){
                callback()
            }
        },
        error=>{
            console.log("Falha ao atualizar empréstimo")
        })
    },error=>{
        console.log("Falha ao atualizar empréstimo")
    })
}