import {openDatabase} from "./db"


export function addStudent(name) {
    const db = openDatabase();
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Student (name) VALUES (?)',
            [name],
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
export function getStudents(callback) {
    const db = openDatabase();
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Student',
            [],
            (tx, results) => {
                const students = [];
                const len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    const row = results.rows.item(i);
                    students.push(row);
                }
                callback(students);
            },
            error => {
                console.error('Erro ao obter os estudantes:', error);
            }
        );
    });
}