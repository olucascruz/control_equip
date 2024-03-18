

export function addMachine(db, id, callback=null) {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Machine (id, is_available) VALUES (?, ?)',
            [id,  1],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log('Máquina adicionada com sucesso!');
                    if(typeof callback == "function"){
                        callback()
                    }
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

export function getMachines(db, callback) {
    db.transaction(tx => {
        console.log("iniciando query machines")
        tx.executeSql(
            'SELECT * FROM Machine',
            [],
            (tx, results) => {
                console.log('Consulta executada com sucesso');
                const result = results.rows._array;
                callback(result);
            },
            error => {
                console.error('Falha ao obter as máquinas:', error);
            },
        );
    }, error => {
        console.error('Erro ao adicionar a máquina:', error);
    }
    
    );
}

export function deleteMachine(db, machineId, callback=null){
    db.transaction(tx=>{
        
        tx.executeSql("DELETE FROM Machine WHERE id = ?",
        [machineId],
        (tx, results)=>{
            if (results.rowsAffected > 0) {
                console.log('Máquina deletada com sucesso!');
                if (typeof callback === "function") {
                    callback();
                }
            } else {
                console.log('Falha ao deletar a máquina.');
            }
        },
        error =>{ console.error("Erro na transição de deletar máquina") }

        )
    })
}

export function setAvailableMachine(db, machineId, isAvailable, callback=null){
    db.transaction(tx=>{
    
        tx.executeSql("UPDATE Machine SET is_available = ? WHERE id = ?",
        [isAvailable, machineId],
        (tx, results)=>{
            console.log("Atualização realizada con sucesso")
            if (typeof callback === "function") {
                callback();
            }
        },
        error=>{console.error("Falha ao atualizar máquina")}
        )
    
    },
    error =>{ console.error("Erro na transição de atualizar máquina") }
    
    )

}