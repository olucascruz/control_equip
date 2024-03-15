export function addLoan(db, studentId, subjectId, machineId) {

    db.transaction(tx => {
        const date = new Date()
        const stringData = date.toISOString();
        tx.executeSql(
            'INSERT INTO Loan (student, subject, machine, loan_time) VALUES (?, ?, ?, ?)',
            [studentId, subjectId, machineId, stringData],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log('Empréstimo registrado com sucesso!');
                } else {
                    console.log('Falha ao registrar empréstimo.');
                }
            },
            error => {
                console.error('Erro ao adicionar o estudante:', error);
            }
        );
    });
}


export function devolutionLoan(db, loanId){
    const date = new Date()
    const stringDate = date.toISOString();
    db.transaction(tx=>{
        tx.executeSql("UPDATE Loan SET devolution_time = ? WHERE id = ?",
        [stringDate, loanId])
    })
}